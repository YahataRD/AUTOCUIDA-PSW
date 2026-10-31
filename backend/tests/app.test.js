import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { createApp } from "../src/app.js";
import { errorHandler } from "../src/middleware/errors.js";

async function serve(t) {
  const server = createApp({ origins: ["http://localhost:5173"] }).listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
    server.closeAllConnections();
  }));
  return `http://127.0.0.1:${server.address().port}`;
}

test("health responde JSON sem depender de banco e rota desconhecida retorna erro JSON", async (t) => {
  const base = await serve(t);
  const health = await fetch(`${base}/health`);
  assert.equal(health.status, 200);
  assert.match(health.headers.get("content-type"), /application\/json/);
  assert.deepEqual(await health.json(), { status: "ok", service: "autocuida-api" });
  const missing = await fetch(`${base}/vehicles`);
  assert.equal(missing.status, 404);
  assert.equal((await missing.json()).error.code, "NOT_FOUND");
});

test("CORS permite origem configurada e preflight Bearer/PATCH, sem liberar outra origem", async (t) => {
  const base = await serve(t);
  const allowed = await fetch(`${base}/health`, { headers: { Origin: "http://localhost:5173" } });
  assert.equal(allowed.headers.get("access-control-allow-origin"), "http://localhost:5173");
  const denied = await fetch(`${base}/health`, { headers: { Origin: "https://outro.example" } });
  assert.equal(denied.headers.get("access-control-allow-origin"), null);
  const preflight = await fetch(`${base}/vehicles/1`, {
    method: "OPTIONS",
    headers: {
      Origin: "http://localhost:5173",
      "Access-Control-Request-Method": "PATCH",
      "Access-Control-Request-Headers": "authorization,content-type",
    },
  });
  assert.equal(preflight.status, 204);
  assert.match(preflight.headers.get("access-control-allow-methods"), /PATCH/);
  assert.match(preflight.headers.get("access-control-allow-headers"), /authorization/);
});

test("JSON malformado e corpo excessivo recebem erros controlados", async (t) => {
  const base = await serve(t);
  for (const [body, status, code] of [
    ["{", 400, "INVALID_JSON"],
    [JSON.stringify({ text: "x".repeat(103000) }), 413, "PAYLOAD_TOO_LARGE"],
  ]) {
    const response = await fetch(`${base}/vehicles`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body,
    });
    assert.equal(response.status, status);
    assert.equal((await response.json()).error.code, code);
  }
});

test("erro inesperado não expõe detalhes internos e respeita resposta iniciada", () => {
  let status;
  let payload;
  const res = {
    headersSent: false,
    status(value) { status = value; return this; },
    json(value) { payload = value; },
  };
  const error = new Error("segredo-interno");
  errorHandler(error, {}, res, assert.fail);
  assert.equal(status, 500);
  assert.equal(payload.error.code, "INTERNAL_ERROR");
  assert.ok(!JSON.stringify(payload).includes("segredo-interno"));
  errorHandler(error, {}, { headersSent: true }, (received) => assert.equal(received, error));
});
