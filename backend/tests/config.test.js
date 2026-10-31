import test from "node:test";
import assert from "node:assert/strict";
import { readConfig, readDatabaseConfig } from "../src/config.js";

test("configuração local permite Vite e preview e aceita configuração explícita", () => {
  const defaults = readConfig({});
  assert.equal(defaults.port, 3001);
  assert.equal(defaults.host, "127.0.0.1");
  assert.ok(defaults.origins.includes("http://localhost:4173"));
  assert.deepEqual(readConfig({ PORT: "3002", HOST: "0.0.0.0", CORS_ORIGINS: "https://app.example, https://app.example" }), {
    port: 3002, host: "0.0.0.0", origins: ["https://app.example"],
  });
});

test("banco exige URI e timeout válidos sem refletir configuração sensível nos erros", () => {
  assert.deepEqual(readDatabaseConfig({ MONGO_URL: "mongodb://127.0.0.1:27017/autocuida" }), {
    mongoUrl: "mongodb://127.0.0.1:27017/autocuida", mongoTimeoutMs: 5000,
  });
  assert.equal(readDatabaseConfig({ MONGO_URL: "mongodb+srv://user:password@cluster.example/app" }).mongoTimeoutMs, 5000);
  for (const MONGO_URL of [undefined, "", "https://user:secret@example.test"]) {
    assert.throws(() => readDatabaseConfig({ MONGO_URL }), (error) => {
      assert.match(error.message, /MONGO_URL/);
      assert.ok(!error.message.includes("secret"));
      return true;
    });
  }
  for (const MONGO_TIMEOUT_MS of ["", "0", "99", "60001", "abc", "500.5"]) {
    assert.throws(() => readDatabaseConfig({ MONGO_URL: "mongodb://127.0.0.1/app", MONGO_TIMEOUT_MS }), /MONGO_TIMEOUT_MS/);
  }
});

test("configuração rejeita portas inválidas e origens com caminhos ou curingas", () => {
  for (const PORT of ["", "0", "65536", "1.2", "3001abc", "-1"]) {
    assert.throws(() => readConfig({ PORT }), /PORT/);
  }
  for (const CORS_ORIGINS of ["", "*", "https://app.example/path", "https://app.example/", "ftp://app.example", "http://usuario:senha@app.example"]) {
    assert.throws(() => readConfig({ CORS_ORIGINS }), /CORS_ORIGINS/);
  }
  assert.throws(() => readConfig({ HOST: " " }), /HOST/);
});
