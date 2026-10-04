import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateData } from "../src/data/validation.js";
import {
  autoCuidaReducer,
  createServiceRecord,
  getMaintenanceReference,
  selectVehicleData,
} from "../src/state/autoCuida.js";
import {
  buildHash,
  parseRoute,
  resolveRoute,
} from "../src/navigation/routes.js";
import { calculateCostSummary } from "../src/utils/costs.js";
import { calculateMaintenance } from "../src/utils/maintenance.js";

const fixture = JSON.parse(
  await readFile(
    new URL("../../mock/seed.json", import.meta.url),
    "utf8",
  ),
);
const fresh = () => structuredClone(fixture);
const input = {
  maintenanceItemId: "5",
  maintenanceType: "preventive",
  serviceDate: "2026-10-02",
  serviceKm: 23000,
  amount: 100,
  shop: " Oficina de teste ",
};
const options = { id: "new-service", today: "2026-10-02" };
const register = (data, vehicleId, service, settings = options) =>
  autoCuidaReducer(data, {
    type: "serviceRegistered",
    today: settings.today,
    record: createServiceRecord(data, vehicleId, service, settings),
  });

test("JSON inicial válido, com dados vazios e IDs estáveis", () => {
  assert.equal(validateData(fixture), fixture);
  assert.deepEqual(
    validateData({ vehicles: [], maintenanceItems: [], serviceRecords: [] }),
    { vehicles: [], maintenanceItems: [], serviceRecords: [] },
  );
  assert.equal(selectVehicleData(fixture, "2").serviceRecords.length, 0);
});

test("seletores isolam itens, custos e histórico por veículo", () => {
  const first = selectVehicleData(fixture, "1");
  const second = selectVehicleData(fixture, "2");
  assert.equal(first.maintenanceItems.length, 4);
  assert.equal(second.maintenanceItems.length, 1);
  assert.equal(calculateCostSummary(first.serviceRecords).total, 2200);
  assert.equal(calculateCostSummary(second.serviceRecords).total, 0);
  assert.deepEqual(selectVehicleData(fixture, "missing"), {
    vehicle: null,
    maintenanceItems: [],
    serviceRecords: [],
  });
});

test("odômetro e registro atualizam apenas o veículo escolhido sem mutar a origem", () => {
  const original = fresh();
  const before = structuredClone(original);
  const updated = autoCuidaReducer(original, {
    type: "odometerUpdated",
    vehicleId: "2",
    currentKm: 22500,
  });
  const result = register(updated, "2", input);
  assert.deepEqual(original, before);
  assert.deepEqual(
    selectVehicleData(result, "1"),
    selectVehicleData(original, "1"),
  );
  assert.equal(result.vehicles[1].currentKm, 23000);
  assert.equal(result.serviceRecords[0].shop, "Oficina de teste");
  assert.equal(result.serviceRecords[0].vehicleId, "2");
  assert.equal(result.serviceRecords[0].itemName, "Óleo do Motor");
  assert.equal(
    calculateCostSummary(selectVehicleData(result, "2").serviceRecords).total,
    100,
  );
  assert.deepEqual(result.maintenanceItems, before.maintenanceItems);
  assert.equal(
    selectVehicleData(result, "2").maintenanceItems[0].lastServiceKm,
    23000,
  );
});

test("odômetro rejeita valores iguais, menores, fracionários e inválidos", () => {
  for (const currentKm of [
    22000,
    21999,
    -1,
    22000.5,
    NaN,
    Infinity,
    "23000",
    Number.MAX_SAFE_INTEGER + 1,
  ]) {
    assert.throws(() =>
      autoCuidaReducer(fixture, {
        type: "odometerUpdated",
        vehicleId: "2",
        currentKm,
      }),
    );
  }
  assert.throws(() =>
    autoCuidaReducer(fixture, {
      type: "odometerUpdated",
      vehicleId: "missing",
      currentKm: 23000,
    }),
  );
});

test("registro rejeita item de outro veículo, inativo ou inexistente", () => {
  assert.throws(
    () => createServiceRecord(fixture, "1", input, options),
    /deste veículo/,
  );
  assert.throws(() =>
    createServiceRecord(
      fixture,
      "2",
      { ...input, maintenanceItemId: "missing" },
      options,
    ),
  );
  const data = fresh();
  data.maintenanceItems[4].active = false;
  assert.throws(() => createServiceRecord(data, "2", input, options));
});

test("veículos inativos preservam registros e não recebem atualizações", () => {
  const data = fresh();
  data.vehicles[0].active = false;
  assert.equal(validateData(data), data);
  assert.equal(data.serviceRecords.length, 4);
  assert.equal(selectVehicleData(data, "1").vehicle, null);
  assert.throws(() =>
    autoCuidaReducer(data, {
      type: "odometerUpdated",
      vehicleId: "1",
      currentKm: 50000,
    }),
  );
  assert.throws(() =>
    createServiceRecord(
      data,
      "1",
      { ...input, maintenanceItemId: "1" },
      options,
    ),
  );
});

test("retirar item do plano preserva os custos e o histórico", () => {
  const data = fresh();
  data.maintenanceItems[0].active = false;
  const selection = selectVehicleData(validateData(data), "1");
  assert.equal(selection.maintenanceItems.length, 3);
  assert.equal(selection.serviceRecords.length, 4);
  assert.equal(calculateCostSummary(selection.serviceRecords).total, 2200);
});

test("retroativo coerente preserva a referência recente e o odômetro", () => {
  const recent = register(fixture, "2", input);
  const retro = register(
    recent,
    "2",
    { ...input, serviceDate: "2026-08-01", serviceKm: 21000 },
    { ...options, id: "retro" },
  );
  assert.equal(retro.vehicles[1].currentKm, 23000);
  assert.equal(
    selectVehicleData(retro, "2").maintenanceItems[0].lastServiceDate,
    "2026-10-02",
  );
  assert.equal(
    calculateCostSummary(selectVehicleData(retro, "2").serviceRecords).total,
    200,
  );
  assert.throws(
    () =>
      register(
        recent,
        "2",
        { ...input, serviceDate: "2026-08-01", serviceKm: 24000 },
        { ...options, id: "invalid-retro" },
      ),
    /incompatível/,
  );
});

test("derivação recupera referência anterior/inicial se o histórico mudar", () => {
  const item = fixture.maintenanceItems[4];
  const records = [
    { ...input, vehicleId: "2", id: "recent" },
    {
      ...input,
      vehicleId: "2",
      id: "old",
      serviceDate: "2026-08-01",
      serviceKm: 21000,
    },
  ];
  assert.deepEqual(getMaintenanceReference(item, records), {
    date: "2026-10-02",
    km: 23000,
  });
  assert.deepEqual(getMaintenanceReference(item, records.slice(1)), {
    date: "2026-08-01",
    km: 21000,
  });
  assert.deepEqual(getMaintenanceReference(item, []), item.initialReference);
  assert.deepEqual(
    getMaintenanceReference(item, [{ ...records[0], vehicleId: "1" }]),
    item.initialReference,
  );
});

test("mesmo dia usa a maior km, independentemente da ordem de inserção", () => {
  const first = register(fixture, "2", input);
  const next = register(
    first,
    "2",
    { ...input, serviceKm: 22500 },
    { ...options, id: "same-day" },
  );
  assert.equal(
    selectVehicleData(next, "2").maintenanceItems[0].lastServiceKm,
    23000,
  );
});

test("registro só aceita campos válidos e ignora identidade fornecida pelo formulário", () => {
  for (const patch of [
    { amount: 0 },
    { amount: NaN },
    { amount: Infinity },
    { shop: " " },
    { serviceDate: "2026-02-30" },
    { serviceDate: "2026-10-03" },
    { serviceDate: "" },
    { serviceKm: "23000" },
    { serviceKm: -1 },
    { serviceKm: 23000.5 },
    { maintenanceType: "other" },
  ])
    assert.throws(() =>
      createServiceRecord(fixture, "2", { ...input, ...patch }, options),
    );
  assert.throws(() =>
    createServiceRecord(fixture, "2", input, { ...options, id: "1" }),
  );
  const record = createServiceRecord(
    fixture,
    "2",
    { ...input, vehicleId: "1", itemName: "Outro", id: "1" },
    options,
  );
  assert.equal(record.vehicleId, "2");
  assert.equal(record.id, options.id);
  assert.equal(record.itemName, "Óleo do Motor");
});

test("carga rejeita listas, IDs, campos e vínculos inválidos", () => {
  const changes = [
    (data) => {
      delete data.vehicles;
    },
    (data) => {
      data.vehicles.push({ ...data.vehicles[0] });
    },
    (data) => {
      data.vehicles[1].plate = "bra2e24";
    },
    (data) => {
      data.vehicles[1].currentKm = -1;
    },
    (data) => {
      data.maintenanceItems[0].vehicleId = "missing";
    },
    (data) => {
      data.maintenanceItems[0].initialReference.date = "2026-02-30";
    },
    (data) => {
      data.maintenanceItems[0].intervalKm = 0;
      data.maintenanceItems[0].intervalMonths = 0;
    },
    (data) => {
      data.serviceRecords[0].vehicleId = "2";
    },
    (data) => {
      data.serviceRecords[0].amount = -1;
    },
    (data) => {
      data.serviceRecords[0].serviceKm = 999999;
    },
  ];
  for (const change of changes) {
    const data = fresh();
    change(data);
    assert.throws(() => validateData(data));
  }
});

test("intervalo desabilitado não gera NaN ou infinito", () => {
  const item = selectVehicleData(fixture, "2").maintenanceItems[0];
  const today = new Date("2026-10-02T00:00:00Z");
  const kmOnly = calculateMaintenance(
    { ...item, intervalMonths: 0 },
    22000,
    today,
  );
  const monthsOnly = calculateMaintenance(
    { ...item, intervalKm: 0 },
    22000,
    today,
  );
  assert.equal(kmOnly.wear, 20);
  assert.equal(kmOnly.nextServiceDate, null);
  assert.equal(monthsOnly.nextServiceKm, null);
  assert.ok(Number.isFinite(monthsOnly.wear));
});

test("rotas preservam página/veículo/item e codificam parâmetros", () => {
  for (const page of ["dashboard", "garage", "service", "costs"]) {
    const route = {
      page,
      vehicleId: "2",
      itemId: page === "service" ? "5" : null,
    };
    assert.deepEqual(parseRoute(buildHash(route)), route);
  }
  const route = { page: "service", vehicleId: "a&b", itemId: "a?b" };
  assert.deepEqual(parseRoute(buildHash(route)), route);
});

test("URL desconhecida, IDs ausentes/inativos e item de outro veículo têm retorno seguro", () => {
  assert.equal(parseRoute("#/inexistente").page, "dashboard");
  assert.equal(resolveRoute(parseRoute(""), fixture).vehicleId, "1");
  assert.equal(
    resolveRoute(parseRoute("#/custos?veiculo=missing"), fixture).vehicleId,
    "1",
  );
  assert.deepEqual(
    resolveRoute(parseRoute("#/servico?veiculo=2&item=1"), fixture),
    { page: "service", vehicleId: "2", itemId: null },
  );
  const data = fresh();
  data.vehicles[0].active = false;
  assert.equal(
    resolveRoute(parseRoute("#/custos?veiculo=1"), data).vehicleId,
    "2",
  );
  data.vehicles[1].active = false;
  assert.deepEqual(
    resolveRoute(parseRoute("#/servico?veiculo=1&item=1"), data),
    { page: "service", vehicleId: null, itemId: null },
  );
});
