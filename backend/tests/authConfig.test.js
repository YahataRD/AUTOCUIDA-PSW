import assert from "node:assert/strict";
import test from "node:test";
import { readAuthConfig } from "../src/config/authConfig.js";

const secret = "s".repeat(32);

test("usa padrões seguros quando só o segredo é informado", () => {
  assert.deepEqual(readAuthConfig({ JWT_SECRET: secret }), {
    jwtSecret: secret,
    jwtExpiresInSeconds: 7200,
    bcryptRounds: 12,
  });
});

test("converte a validade do token para segundos", () => {
  for (const [text, seconds] of [["30m", 1800], ["2h", 7200], ["1d", 86400], ["45s", 45]]) {
    assert.equal(readAuthConfig({ JWT_SECRET: secret, JWT_EXPIRES_IN: text }).jwtExpiresInSeconds, seconds);
  }
});

test("recusa segredo ausente ou curto", () => {
  assert.throws(() => readAuthConfig({}), /JWT_SECRET/);
  assert.throws(() => readAuthConfig({ JWT_SECRET: "curto" }), /JWT_SECRET/);
  assert.throws(() => readAuthConfig({ JWT_SECRET: "   " }), /JWT_SECRET/);
});

test("recusa validade inválida ou longa demais", () => {
  for (const value of ["", "abc", "0h", "8d", "-1h", "1.5h", "2 h"]) {
    assert.throws(
      () => readAuthConfig({ JWT_SECRET: secret, JWT_EXPIRES_IN: value }),
      /JWT_EXPIRES_IN/,
      value,
    );
  }
});

test("recusa custo do bcrypt fora de 10 a 14", () => {
  for (const value of ["9", "15", "abc", "12.5"]) {
    assert.throws(() => readAuthConfig({ JWT_SECRET: secret, BCRYPT_ROUNDS: value }), /BCRYPT_ROUNDS/, value);
  }
});
