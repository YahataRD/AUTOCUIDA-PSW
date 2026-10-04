import test from "node:test";
import assert from "node:assert/strict";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createVehicleSchema,
  createOdometerSchema,
  createServiceSchema,
} from "../src/data/formSchemas.js";

const service = {
  maintenanceType: "preventive",
  maintenanceItemId: "5",
  serviceKm: "23000",
  serviceDate: "2026-10-02",
  amount: "1.234,56",
  shop: " Oficina teste ",
};
const schema = createServiceSchema([{ id: "5" }], "2026-10-04");

test("resolver converte formulário de serviço em dados numéricos e texto normalizado", async () => {
  const result = await zodResolver(schema)(
    service,
    {},
    { fields: {}, shouldUseNativeValidation: false },
  );
  assert.deepEqual(result.errors, {});
  assert.equal(result.values.amount, 1234.56);
  assert.equal(result.values.serviceKm, 23000);
  assert.equal(result.values.shop, "Oficina teste");
  assert.equal(schema.parse({ ...service, amount: "350.50" }).amount, 350.5);
});

test("resolver associa erros aos campos; vazio não vira zero e datas reais são exigidas", async () => {
  const result = await zodResolver(schema)(
    {
      ...service,
      serviceKm: "",
      serviceDate: "2026-02-30",
      amount: "",
      shop: " ",
    },
    {},
    { fields: {}, shouldUseNativeValidation: false },
  );
  assert.deepEqual(Object.keys(result.errors).sort(), [
    "amount",
    "serviceDate",
    "serviceKm",
    "shop",
  ]);
  assert.deepEqual(result.values, {});
});

test("serviço rejeita futuro, item de outro veículo e números inválidos sem bloquear retroativo", () => {
  for (const patch of [
    { serviceDate: "2026-10-05" },
    { maintenanceItemId: "outro" },
    { maintenanceType: "outro" },
    { serviceKm: "1.5" },
    { serviceKm: "-1" },
    { serviceKm: String(Number.MAX_SAFE_INTEGER + 1) },
    { amount: "0" },
    { amount: "-1" },
    { amount: "Infinity" },
    { amount: "abc" },
  ])
    assert.equal(schema.safeParse({ ...service, ...patch }).success, false);
  assert.equal(
    schema.parse({ ...service, serviceDate: "2026-08-01", serviceKm: "21000" })
      .serviceKm,
    21000,
  );
});

test("odômetro exige inteiro maior que leitura atual e acompanha alteração da leitura", () => {
  for (const value of [
    "",
    " ",
    "22000",
    "21999",
    "22000.5",
    "Infinity",
    "abc",
  ]) {
    assert.equal(
      createOdometerSchema(22000).safeParse({ currentKm: value }).success,
      false,
    );
  }
  assert.deepEqual(createOdometerSchema(22000).parse({ currentKm: "23000" }), {
    currentKm: 23000,
  });
  assert.equal(
    createOdometerSchema(24000).safeParse({ currentKm: "23000" }).success,
    false,
  );
});

test("cadastro aceita km zero explícita e usa o mesmo schema da camada de dados", () => {
  const input = {
    plate: " abc-1234 ",
    model: " Onix ",
    year: "2022",
    currentKm: "0",
  };
  assert.deepEqual(createVehicleSchema(2026).parse(input), {
    plate: "ABC1234",
    model: "Onix",
    year: 2022,
    currentKm: 0,
  });
  for (const value of ["", " ", null, undefined, false]) {
    assert.equal(
      createVehicleSchema(2026).safeParse({ ...input, currentKm: value })
        .success,
      false,
    );
  }
});
