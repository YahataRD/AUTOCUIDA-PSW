import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:net";
import { once } from "node:events";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { startServer } from "../src/runtime.js";
import { isDatabaseReady, disconnectDatabase } from "../src/database.js";

test("Mongo real: inicia, comprova escrita/reconexão, readiness e fechamento", { timeout: 240000 }, async (t) => {
  // Nunca utiliza MONGO_URL do ambiente nem bancos pessoais/compartilhados.
  const mongo = await MongoMemoryServer.create();
  t.after(async () => { await disconnectDatabase(); await mongo.stop(); });
  const config = {
    port: 0, host: "127.0.0.1", origins: [],
    mongoUrl: mongo.getUri("autocuida_connection_test"), mongoTimeoutMs: 1000,
  };
  let runtime = await startServer(config);
  t.after(() => runtime.close());
  const base = () => `http://127.0.0.1:${runtime.server.address().port}`;
  assert.equal((await fetch(`${base()}/ready`)).status, 200);
  await mongoose.connection.collection("connection_probes").insertOne({ marker: "persisted" });
  await runtime.close();
  assert.equal(mongoose.connection.readyState, 0);
  assert.equal(runtime.server.listening, false);
  const occupied = createServer().listen(0, "127.0.0.1");
  await once(occupied, "listening");
  try {
    await assert.rejects(startServer({ ...config, port: occupied.address().port }), /ocupada/);
    assert.equal(mongoose.connection.readyState, 0);
  } finally {
    await new Promise((resolve) => occupied.close(resolve));
  }
  runtime = await startServer(config);
  assert.ok(await mongoose.connection.collection("connection_probes").findOne({ marker: "persisted" }));

  await disconnectDatabase();
  assert.equal(await isDatabaseReady(), false);
  const ready = await fetch(`${base()}/ready`);
  assert.equal(ready.status, 503);
  assert.equal((await ready.json()).error.code, "DATABASE_UNAVAILABLE");
  assert.equal((await fetch(`${base()}/health`)).status, 200);
  await Promise.all([runtime.close(), runtime.close()]);
});

test("falha de conexão não abre HTTP nem expõe URI e credenciais", { timeout: 10000 }, async () => {
  const portProbe = createServer().listen(0, "127.0.0.1");
  await once(portProbe, "listening");
  const unusedPort = portProbe.address().port;
  await new Promise((resolve) => portProbe.close(resolve));
  await assert.rejects(startServer({
    port: 0, host: "127.0.0.1", origins: [],
    mongoUrl: `mongodb://privateuser:secret@127.0.0.1:${unusedPort}/unreachable`, mongoTimeoutMs: 100,
  }), (error) => {
    assert.match(error.message, /Não foi possível conectar/);
    assert.ok(!/secret|privateuser|mongodb:\/\//.test(error.message));
    return true;
  });
  assert.equal(mongoose.connection.readyState, 0);
});
