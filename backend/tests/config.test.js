import test from "node:test";
import assert from "node:assert/strict";
import { readConfig } from "../src/config.js";

test("configuração local permite Vite e preview e aceita configuração explícita", () => {
  const defaults = readConfig({});
  assert.equal(defaults.port, 3001);
  assert.equal(defaults.host, "127.0.0.1");
  assert.ok(defaults.origins.includes("http://localhost:4173"));
  assert.deepEqual(readConfig({ PORT: "3002", HOST: "0.0.0.0", CORS_ORIGINS: "https://app.example, https://app.example" }), {
    port: 3002, host: "0.0.0.0", origins: ["https://app.example"],
  });
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
