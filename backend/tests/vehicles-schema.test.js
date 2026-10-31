import test from "node:test";
import assert from "node:assert/strict";
import {
  createVehicleSchema, createVehicleUpdateSchema,
  createOdometerSchema, deactivateVehicleSchema,
} from "../src/modules/vehicles/schemas.js";
import { getVehicleYear } from "../src/modules/vehicles/rules.js";

const input = { plate: " abc-1234 ", model: " Onix 1.0 ", year: 2022, currentKm: 0 };

test("cadastro normaliza placa antiga/Mercosul e aceita as bordas de ano e km", () => {
  const schema = createVehicleSchema(2026);
  assert.deepEqual(schema.parse(input), {
    plate: "ABC1234", model: "Onix 1.0", year: 2022, currentKm: 0,
  });
  assert.equal(schema.parse({ ...input, plate: " bra-2e24 " }).plate, "BRA2E24");
  for (const year of [1886, 2027]) assert.equal(schema.parse({ ...input, year }).year, year);
});

test("JSON numérico inválido não é convertido silenciosamente em ano ou quilometragem", () => {
  const schema = createVehicleSchema(2026);
  for (const currentKm of ["", "0", null, true, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.equal(schema.safeParse({ ...input, currentKm }).success, false, `km: ${currentKm}`);
  }
  for (const year of ["2022", null, true, 1885, 2028, 2022.5]) {
    assert.equal(schema.safeParse({ ...input, year }).success, false, `ano: ${year}`);
  }
  for (const plate of ["", "ABC123", "123ABCD", "ABC@1234"]) {
    assert.equal(schema.safeParse({ ...input, plate }).success, false);
  }
  assert.equal(schema.safeParse({ ...input, model: "  " }).success, false);
  assert.equal(schema.safeParse({ ...input, currentKm: undefined }).success, false);
});

test("entrada de cadastro/edição não aceita identidade, proprietário, ativação ou operadores Mongo", () => {
  for (const schema of [createVehicleSchema(2026), createVehicleUpdateSchema(0, 2026)]) {
    for (const extra of [
      { ownerId: "507f1f77bcf86cd799439011" }, { donoId: "outro" }, { id: "1" },
      { _id: "507f1f77bcf86cd799439011" }, { active: false }, { $set: { currentKm: 0 } },
    ]) assert.equal(schema.safeParse({ ...input, ...extra }).success, false);
    assert.equal(schema.safeParse({ ...input, plate: { $ne: null } }).success, false);
  }
});

test("edição permite manter/aumentar km; atualização específica exige aumento", () => {
  const update = createVehicleUpdateSchema(100, 2026);
  assert.equal(update.safeParse({ ...input, currentKm: 99 }).success, false);
  assert.equal(update.parse({ ...input, currentKm: 100 }).currentKm, 100);
  assert.equal(update.parse({ ...input, currentKm: 101 }).currentKm, 101);
  const odometer = createOdometerSchema(100);
  assert.equal(odometer.safeParse({ currentKm: 100 }).success, false);
  assert.equal(odometer.safeParse({ currentKm: 99 }).success, false);
  assert.equal(odometer.parse({ currentKm: 101 }).currentKm, 101);
  assert.equal(odometer.safeParse({ currentKm: 101, active: false }).success, false);
});

test("inativação aceita apenas active false e não permite reativação ou patch misto", () => {
  assert.deepEqual(deactivateVehicleSchema.parse({ active: false }), { active: false });
  for (const body of [{}, { active: true }, { active: "false" }, { active: false, currentKm: 10 }]) {
    assert.equal(deactivateVehicleSchema.safeParse(body).success, false);
  }
});

test("limite de ano segue o calendário de São Paulo na virada de ano", () => {
  assert.equal(getVehicleYear(new Date("2027-01-01T02:59:59Z")), 2026);
  assert.equal(getVehicleYear(new Date("2027-01-01T03:00:00Z")), 2027);
});
