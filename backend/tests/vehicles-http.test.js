import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectDatabase, disconnectDatabase } from "../src/database.js";
import { HttpError } from "../src/errors.js";
import { createVehicleRouter } from "../src/modules/vehicles/router.js";
import { vehicleRepository } from "../src/modules/vehicles/repository.js";
import { notFound, errorHandler } from "../src/middleware/errors.js";

test("router exige autenticação explícita e identidade preenchida", async (t) => {
  assert.throws(() => createVehicleRouter(), /autenticação/);
  assert.throws(() => createVehicleRouter({ authenticate: true }), /autenticação/);
  const app = express();
  app.use("/vehicles", createVehicleRouter({ authenticate: (req, res, next) => next() }));
  app.use(errorHandler);
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }));
  const response = await fetch(`http://127.0.0.1:${server.address().port}/vehicles`);
  assert.equal(response.status, 401);
  assert.equal((await response.json()).error.code, "UNAUTHENTICATED");
});

test("rotas de veículos com identidade de teste e MongoDB real isolado", { timeout: 240000 }, async (t) => {
  const mongo = await MongoMemoryServer.create();
  t.after(async () => { await disconnectDatabase(); await mongo.stop(); });
  await connectDatabase({ mongoUrl: mongo.getUri("autocuida_vehicle_http_test"), mongoTimeoutMs: 5000 });
  await vehicleRepository.initialize();
  const owners = { "test-a": String(new mongoose.Types.ObjectId()), "test-b": String(new mongoose.Types.ObjectId()) };
  // Fixture exclusivamente de teste; não é autenticação JWT nem é exportada.
  function authenticate(req, res, next) {
    const id = owners[req.headers.authorization?.replace(/^Bearer /, "")];
    if (!id) throw new HttpError(401, "UNAUTHENTICATED", "Autenticação necessária.");
    req.user = { id };
    next();
  }
  const app = express();
  app.use(express.json());
  app.use("/vehicles", createVehicleRouter({ authenticate }));
  app.get("/unexpected-error", () => {
    const error = new Error("detalhe-interno");
    error.status = 400;
    throw error;
  });
  app.use(notFound);
  app.use(errorHandler);
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }));
  async function request(path = "/vehicles", { token = "test-a", method = "GET", body } = {}) {
    const response = await fetch(`http://127.0.0.1:${server.address().port}${path}`, {
      method,
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), "Content-Type": "application/json" },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    return { status: response.status, body: await response.json() };
  }
  const fields = { plate: " abc-1234 ", model: " Onix ", year: 2022, currentKm: 100 };
  let id;

  await t.test("sem identidade válida nenhuma operação é executada", async () => {
    for (const token of [null, "forged"]) {
      for (const method of ["GET", "POST", "PUT", "PATCH"]) {
        const path = ["PUT", "PATCH"].includes(method) ? "/vehicles/507f1f77bcf86cd799439011" : "/vehicles";
        assert.equal((await request(path, { token, method, body: method === "GET" ? undefined : fields })).status, 401);
      }
    }
    assert.deepEqual((await request()).body, []);
  });

  await t.test("cadastro publica objeto normalizado sem identidade interna e bloqueia duplicidade", async () => {
    const created = await request("/vehicles", { method: "POST", body: fields });
    assert.equal(created.status, 201);
    id = created.body.id;
    assert.match(id, /^[a-f\d]{24}$/);
    assert.deepEqual(created.body, { id, plate: "ABC1234", model: "Onix", year: 2022, currentKm: 100, active: true });
    const duplicate = await request("/vehicles", { token: "test-b", method: "POST", body: fields });
    assert.equal(duplicate.status, 409);
    assert.equal(duplicate.body.error.code, "DUPLICATE_PLATE");
    assert.ok(duplicate.body.error.fields.plate);
    assert.ok(!JSON.stringify(duplicate.body).includes(owners["test-a"]));
  });

  await t.test("consulta própria funciona; listas e mutações alheias são isoladas", async () => {
    assert.equal((await request()).body.length, 1);
    assert.deepEqual((await request("/vehicles", { token: "test-b" })).body, []);
    assert.equal((await request(`/vehicles/${id}`)).status, 200);
    for (const method of ["GET", "PUT", "PATCH"]) {
      assert.equal((await request(`/vehicles/${id}`, {
        token: "test-b", method, body: method === "GET" ? undefined : fields,
      })).status, 403);
    }
    assert.equal((await request(`/vehicles/${String(new mongoose.Types.ObjectId())}`)).status, 404);
    assert.equal((await request("/vehicles/invalid")).status, 400);
  });

  await t.test("erros de campos e identidade indevida são 400, sem gravação parcial", async () => {
    for (const body of [{ ...fields, ownerId: owners["test-b"] }, { ...fields, currentKm: -1 }, { ...fields, active: false }]) {
      const result = await request(`/vehicles/${id}`, { method: "PUT", body });
      assert.equal(result.status, 400);
      assert.ok(result.body.error.fields);
    }
    const saved = await request(`/vehicles/${id}`);
    assert.equal(saved.body.active, true);
    assert.equal(saved.body.currentKm, 100);
  });

  await t.test("PUT e PATCH retornam o estado confirmado e odômetro não regride", async () => {
    assert.equal((await request(`/vehicles/${id}`, { method: "PUT", body: { ...fields, model: "Onix LT" } })).body.model, "Onix LT");
    assert.equal((await request(`/vehicles/${id}`, { method: "PATCH", body: { currentKm: 200 } })).body.currentKm, 200);
    assert.equal((await request(`/vehicles/${id}`, { method: "PUT", body: fields })).status, 400);
    assert.equal((await request(`/vehicles/${id}`, { method: "PATCH", body: { currentKm: 200 } })).status, 400);
    await Promise.all([300, 500, 400].map((currentKm) => request(`/vehicles/${id}`, { method: "PATCH", body: { currentKm } })));
    assert.equal((await request(`/vehicles/${id}`)).body.currentKm, 500);
  });

  await t.test("inativação preserva consulta e impede reativação, patch misto e alterações posteriores", async () => {
    assert.equal((await request(`/vehicles/${id}`, { method: "PATCH", body: { active: false, currentKm: 600 } })).status, 400);
    assert.equal((await request(`/vehicles/${id}`, { method: "PATCH", body: { active: false } })).body.active, false);
    assert.equal((await request(`/vehicles/${id}`, { method: "PATCH", body: { active: false } })).status, 200);
    assert.equal((await request(`/vehicles/${id}`, { method: "PATCH", body: { active: true } })).status, 400);
    assert.equal((await request(`/vehicles/${id}`, { method: "PATCH", body: { currentKm: 600 } })).status, 400);
    assert.equal((await request(`/vehicles/${id}`, { method: "PUT", body: { ...fields, currentKm: 600 } })).status, 400);
    assert.equal((await request()).body[0].active, false);
  });

  await t.test("middleware não publica mensagens de erros desconhecidos, mesmo com status forjado", async () => {
    const result = await request("/unexpected-error");
    assert.equal(result.status, 500);
    assert.equal(result.body.error.code, "INTERNAL_ERROR");
    assert.ok(!JSON.stringify(result.body).includes("detalhe-interno"));
  });
});
