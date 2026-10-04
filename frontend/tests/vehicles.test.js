import test from "node:test";
import assert from "node:assert/strict";
import { createVehicle } from "../src/state/vehicles.js";
import { autoCuidaReducer, selectVehicleData } from "../src/state/autoCuida.js";
import { resolveRoute } from "../src/navigation/routes.js";

const empty = { vehicles: [], maintenanceItems: [], serviceRecords: [] };
const input = {
  plate: " abc-1234 ",
  model: " Onix 1.0 ",
  year: "2022",
  currentKm: "0",
};
const options = { id: "new", currentYear: 2026 };

test("cadastro normaliza os campos e permite placa antiga e Mercosul", () => {
  assert.deepEqual(createVehicle(empty, input, options), {
    id: "new",
    plate: "ABC1234",
    model: "Onix 1.0",
    year: 2022,
    currentKm: 0,
    active: true,
  });
  assert.equal(
    createVehicle(empty, { ...input, plate: "abc1d23" }, options).plate,
    "ABC1D23",
  );
});

test("placa duplicada é rejeitada mesmo com separadores, caixa diferente ou veículo inativo", () => {
  for (const active of [true, false]) {
    const data = {
      ...empty,
      vehicles: [{ ...createVehicle(empty, input, options), active }],
    };
    assert.throws(
      () =>
        createVehicle(
          data,
          { ...input, plate: "aBc 1234" },
          { ...options, id: "other" },
        ),
      (error) => Boolean(error.fields.plate),
    );
  }
});

test("campos vazios e valores inválidos não criam veículo", () => {
  for (const [field, values] of Object.entries({
    plate: ["", "ABC", "ABC!1234", "1234567"],
    model: ["", "  "],
    year: ["", " ", 1885, 2028, 2022.5, "abc"],
    currentKm: [
      "",
      " ",
      -1,
      1.5,
      Infinity,
      NaN,
      "abc",
      Number.MAX_SAFE_INTEGER + 1,
    ],
  }))
    for (const value of values) {
      assert.throws(
        () => createVehicle(empty, { ...input, [field]: value }, options),
        (error) => Boolean(error.fields[field]),
      );
    }
  assert.equal(
    createVehicle(empty, { ...input, year: 2027 }, options).year,
    2027,
  );
});

test("cadastro preserva dados existentes e o novo veículo começa sem itens/serviços", () => {
  const existing = createVehicle(empty, input, { ...options, id: "old" });
  const data = {
    vehicles: [existing],
    maintenanceItems: [],
    serviceRecords: [],
  };
  const before = structuredClone(data);
  const vehicle = createVehicle(data, { ...input, plate: "XYZ9A87" }, options);
  const result = autoCuidaReducer(data, {
    type: "vehicleRegistered",
    vehicle,
    currentYear: 2026,
  });
  assert.deepEqual(data, before);
  assert.deepEqual(result.vehicles[0], existing);
  assert.deepEqual(selectVehicleData(result, "new"), {
    vehicle,
    maintenanceItems: [],
    serviceRecords: [],
  });
  assert.equal(
    resolveRoute({ page: "garage", vehicleId: "new", itemId: null }, result)
      .vehicleId,
    "new",
  );
  assert.throws(() =>
    autoCuidaReducer(result, {
      type: "vehicleRegistered",
      vehicle,
      currentYear: 2026,
    }),
  );
});

test("primeiro veículo pode ser cadastrado sem dados anteriores", () => {
  const vehicle = createVehicle(empty, input, options);
  const result = autoCuidaReducer(empty, {
    type: "vehicleRegistered",
    vehicle,
    currentYear: 2026,
  });
  assert.equal(
    resolveRoute(
      { page: "garage", vehicleId: vehicle.id, itemId: null },
      result,
    ).vehicleId,
    vehicle.id,
  );
  assert.throws(() => createVehicle(empty, input, { ...options, id: "" }));
});
