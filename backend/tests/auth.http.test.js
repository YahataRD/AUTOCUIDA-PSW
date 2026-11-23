// Testes de integração: chamadas HTTP reais contra Express + MongoDB.
// Exigem MONGO_TEST_URL apontando para um banco ISOLADO de testes (nunca o
// compartilhado). Os testes só removem os usuários que eles mesmos criaram.
import assert from "node:assert/strict";
import { after, before, describe, test } from "node:test";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import request from "supertest";
import { createAuthModule } from "../src/modules/auth/index.js";
import { User } from "../src/modules/auth/user.model.js";
import { errorHandler } from "../src/middleware/errors.js";

const mongoUrl = process.env.MONGO_TEST_URL;
const config = { jwtSecret: "t".repeat(32), jwtExpiresInSeconds: 3600, bcryptRounds: 4 };
const run = Date.now().toString(36);
const email = (name) => `${name}.${run}@teste.autocuida.invalid`;

function buildApp() {
  const auth = createAuthModule(config);
  const app = express();
  app.use(express.json());
  app.use(auth.router);
  app.get("/protegida", auth.authenticate, (req, res) => res.json(req.user));
  app.use(errorHandler);
  return app;
}

describe("autenticação (HTTP + MongoDB)", { skip: !mongoUrl && "defina MONGO_TEST_URL" }, () => {
  const app = buildApp();
  const createdEmails = [];
  const ana = { name: "Ana Souza", email: email("ana"), password: "senha-segura-1" };
  let token;
  let userId;

  before(async () => {
    await mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 5000 });
    await User.createIndexes(); // garante o índice único de e-mail
  });

  after(async () => {
    await User.deleteMany({ email: { $in: createdEmails } });
    await mongoose.disconnect();
  });

  test("cadastra usuário sem expor senha nem hash", async () => {
    createdEmails.push(ana.email);
    const res = await request(app).post("/usuarios").send({ ...ana, email: ana.email.toUpperCase() });
    assert.equal(res.status, 201);
    assert.deepEqual(Object.keys(res.body).sort(), ["email", "id", "name"]);
    assert.equal(res.body.email, ana.email);
    userId = res.body.id;
    const stored = await User.findById(userId).select("+passwordHash");
    assert.match(stored.passwordHash, /^\$2[aby]\$/);
    assert.notEqual(stored.passwordHash, ana.password);
  });

  test("e-mail repetido (mesmo em maiúsculas) devolve 409", async () => {
    const res = await request(app).post("/usuarios").send({ ...ana, email: ana.email.toUpperCase() });
    assert.equal(res.status, 409);
    assert.equal(res.body.error.code, "EMAIL_IN_USE");
    assert.ok(res.body.error.fields.email);
  });

  test("cadastros simultâneos com o mesmo e-mail criam um único usuário", async () => {
    const same = { name: "Bia", email: email("bia"), password: "senha-segura-2" };
    createdEmails.push(same.email);
    const results = await Promise.all(
      Array.from({ length: 4 }, () => request(app).post("/usuarios").send(same)),
    );
    assert.equal(results.filter((r) => r.status === 201).length, 1);
    assert.equal(results.filter((r) => r.status === 409).length, 3);
    assert.equal(await User.countDocuments({ email: same.email }), 1);
  });

  test("dados inválidos devolvem 400 com campos", async () => {
    const res = await request(app).post("/usuarios").send({ name: "", email: "x", password: "123" });
    assert.equal(res.status, 400);
    assert.equal(res.body.error.code, "VALIDATION_ERROR");
    assert.deepEqual(Object.keys(res.body.error.fields).sort(), ["email", "name", "password"]);
  });

  test("login correto devolve token e usuário", async () => {
    const res = await request(app).post("/login").send({ email: ana.email, password: ana.password });
    assert.equal(res.status, 200);
    assert.equal(res.body.user.id, userId);
    assert.equal(jwt.verify(res.body.token, config.jwtSecret).sub, userId);
    token = res.body.token;
  });

  test("senha errada e e-mail inexistente recebem a mesma resposta 401", async () => {
    const wrong = await request(app).post("/login").send({ email: ana.email, password: "outra-senha-1" });
    const unknown = await request(app).post("/login").send({ email: email("ninguem"), password: "outra-senha-1" });
    assert.equal(wrong.status, 401);
    assert.equal(unknown.status, 401);
    assert.deepEqual(wrong.body, unknown.body);
  });

  test("login ignora tentativa de injeção por objeto no e-mail", async () => {
    const res = await request(app).post("/login").send({ email: { $ne: "" }, password: "qualquer" });
    assert.equal(res.status, 400);
  });

  test("rota protegida aceita token válido e expõe só a identidade", async () => {
    const res = await request(app).get("/protegida").set("Authorization", `Bearer ${token}`);
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { id: userId, name: ana.name, email: ana.email });
  });

  test("token ausente, malformado ou de outro segredo devolve 401", async () => {
    const forged = jwt.sign({}, "x".repeat(32), { subject: userId, expiresIn: 60 });
    for (const header of [undefined, "Bearer", "Bearer lixo", `Bearer ${forged}`, `Basic ${token}`]) {
      const req = request(app).get("/protegida");
      const res = await (header ? req.set("Authorization", header) : req);
      assert.equal(res.status, 401, String(header));
      assert.equal(res.body.error.code, "UNAUTHENTICATED");
    }
  });

  test("token expirado devolve 401 TOKEN_EXPIRED", async () => {
    const expired = jwt.sign({}, config.jwtSecret, { subject: userId, expiresIn: -10 });
    const res = await request(app).get("/protegida").set("Authorization", `Bearer ${expired}`);
    assert.equal(res.status, 401);
    assert.equal(res.body.error.code, "TOKEN_EXPIRED");
  });

  test("token válido de usuário removido devolve 401", async () => {
    const ghost = jwt.sign({}, config.jwtSecret, { subject: new mongoose.Types.ObjectId().toString(), expiresIn: 60 });
    const res = await request(app).get("/protegida").set("Authorization", `Bearer ${ghost}`);
    assert.equal(res.status, 401);
  });
});
