import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { startServer } from "../src/runtime.js";

test("API principal protege veículos com JWT real e isola dois usuários", { timeout: 240000 }, async (t) => {
  const mongo = await MongoMemoryServer.create();
  let runtime;
  t.after(async () => {
    try {
      await runtime?.close();
    } finally {
      await mongo.stop();
    }
  });
  const authConfig = { jwtSecret: "t".repeat(48), jwtExpiresInSeconds: 3600, bcryptRounds: 4 };
  runtime = await startServer({
    host: "127.0.0.1",
    port: 0,
    origins: [],
    mongoUrl: mongo.getUri("autocuida_jwt_integration_test"),
    mongoTimeoutMs: 5000,
    authConfig,
  });
  const api = request(runtime.server);
  const vehicle = { plate: "ABC1D23", model: "Onix", year: 2022, currentKm: 10000 };

  async function registerAndLogin(name, email) {
    const password = "senha-de-teste-123";
    const registered = await api.post("/usuarios").send({ name, email, password }).expect(201);
    assert.deepEqual(Object.keys(registered.body).sort(), ["email", "id", "name"]);
    const login = await api.post("/login").send({ email, password }).expect(200);
    assert.deepEqual(login.body.user, registered.body);
    return login.body;
  }

  await api.get("/ready").expect(200);
  const invalidLogin = await api.post("/login").send({}).expect(400);
  assert.equal(invalidLogin.body.error.code, "VALIDATION_ERROR");
  assert.ok(invalidLogin.body.error.fields.email);

  const ana = await registerAndLogin("Ana Souza", "ana@autocuida.invalid");
  const bia = await registerAndLogin("Bia Souza", "bia@autocuida.invalid");
  const duplicate = await api.post("/usuarios").send({
    name: "Outro usuário", email: ana.user.email, password: "outra-senha-123",
  }).expect(409);
  assert.equal(duplicate.body.error.code, "EMAIL_IN_USE");
  const invalidCredentials = await api.post("/login").send({
    email: ana.user.email, password: "senha-incorreta",
  }).expect(401);
  assert.equal(invalidCredentials.body.error.code, "INVALID_CREDENTIALS");

  const expired = jwt.sign({}, authConfig.jwtSecret, {
    algorithm: "HS256", subject: ana.user.id, expiresIn: -60,
  });
  for (const [token, code] of [
    [null, "UNAUTHENTICATED"],
    ["token-invalido", "UNAUTHENTICATED"],
    [expired, "TOKEN_EXPIRED"],
  ]) {
    const list = api.get("/vehicles");
    if (token) list.auth(token, { type: "bearer" });
    assert.equal((await list.expect(401)).body.error.code, code);
  }
  await api.post("/vehicles").send(vehicle).expect(401);

  const asAna = (req) => req.auth(ana.token, { type: "bearer" });
  const asBia = (req) => req.auth(bia.token, { type: "bearer" });
  const forgedOwner = await asAna(api.post("/vehicles"))
    .send({ ...vehicle, ownerId: bia.user.id }).expect(400);
  assert.equal(forgedOwner.body.error.code, "VALIDATION_ERROR");

  const first = (await asAna(api.post("/vehicles")).send(vehicle).expect(201)).body;
  const second = (await asBia(api.post("/vehicles"))
    .send({ ...vehicle, plate: "BCD2E34" }).expect(201)).body;
  assert.deepEqual(first, { ...vehicle, id: first.id, active: true });
  const path = `/vehicles/${first.id}`;
  await api.get(path).expect(401);
  await api.put(path).send(vehicle).expect(401);
  await api.patch(path).send({ active: false }).expect(401);
  assert.deepEqual((await asAna(api.get("/vehicles")).expect(200)).body, [first]);
  assert.deepEqual((await asBia(api.get("/vehicles")).expect(200)).body, [second]);

  for (const req of [
    api.get(path),
    api.put(path).send({ ...vehicle, model: "Alterado" }),
    api.patch(path).send({ currentKm: 15000 }),
    api.patch(path).send({ active: false }),
  ]) {
    assert.equal((await asBia(req).expect(403)).body.error.code, "FORBIDDEN");
  }
  assert.deepEqual((await asAna(api.get(path)).expect(200)).body, first);
  const edited = await asAna(api.put(path)).send({ ...vehicle, model: "Onix LT" }).expect(200);
  assert.equal(edited.body.model, "Onix LT");
  const odometer = await asAna(api.patch(path)).send({ currentKm: 12000 }).expect(200);
  assert.equal(odometer.body.currentKm, 12000);
  const deactivated = await asAna(api.patch(path)).send({ active: false }).expect(200);
  assert.deepEqual(deactivated.body, { ...first, model: "Onix LT", currentKm: 12000, active: false });
  assert.deepEqual((await asBia(api.get("/vehicles")).expect(200)).body, [second]);
});
