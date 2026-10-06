import test from "node:test";
import assert from "node:assert/strict";
import { MutationObserver, QueryClient } from "@tanstack/react-query";
import { createDemoApi } from "../src/data/demo.js";
import { commandMutation, dataKey } from "../src/data/queries.js";
import { validateData } from "../src/data/validation.js";

test("demo rejeita redução do odômetro pela edição e aceita a leitura atual", async () => {
  const api = createDemoApi();
  const before = await api.load();
  const vehicle = before.vehicles[0];
  for (const currentKm of [0, vehicle.currentKm - 1]) {
    await assert.rejects(
      api.updateVehicle(vehicle.id, { ...vehicle, currentKm }),
      (error) => Boolean(error.fields?.currentKm),
    );
    assert.deepEqual(await api.load(), before);
  }
  await api.updateVehicle(vehicle.id, { ...vehicle, model: "Modelo corrigido" });
  const saved = validateData(await api.load());
  assert.equal(saved.vehicles[0].model, "Modelo corrigido");
  assert.deepEqual(saved.serviceRecords, before.serviceRecords);
});

test("demo rejeita referência incompatível com histórico, inclusive de item inativo", async () => {
  const api = createDemoApi();
  const item = (await api.load()).maintenanceItems[0];
  for (const active of [true, false]) {
    if (!active) await api.removeMaintenanceItem(item.id);
    const before = await api.load();
    await assert.rejects(api.updateMaintenanceItem(item.id, {
      ...item, initialDate: "2026-10-02", initialKm: 10000,
    }), /incompatível/);
    assert.deepEqual(await api.load(), before);
  }
  await api.updateMaintenanceItem(item.id, { ...item, intervalKm: 12000 });
  const saved = validateData(await api.load());
  assert.equal(saved.maintenanceItems[0].active, false);
  assert.equal(saved.maintenanceItems[0].intervalKm, 12000);
  assert.deepEqual(saved.maintenanceItems[0].initialReference, item.initialReference);
});

test("edição de serviço atualiza odômetro no demo e no cache antes de uma reconsulta", async (t) => {
  const api = createDemoApi();
  const client = new QueryClient();
  t.after(() => client.clear());
  const before = await api.load();
  client.setQueryData(dataKey, before);
  // Sem observador ativo: invalidar a query não mascara falhas no cache com refetch.
  const mutation = new MutationObserver(client, commandMutation(client, api));
  const original = before.serviceRecords.find((record) => record.id === "2");
  const input = { ...original, serviceKm: 50000, serviceDate: "2026-10-02" };
  await mutation.mutate({ command: "updateService", args: [original.id, input] });
  for (const data of [await api.load(), client.getQueryData(dataKey)]) {
    validateData(data);
    assert.equal(data.vehicles[0].currentKm, 50000);
    assert.deepEqual(data.vehicles[1], before.vehicles[1]);
    assert.equal(data.serviceRecords.length, before.serviceRecords.length);
    assert.equal(data.serviceRecords.find((record) => record.id === original.id).serviceKm, 50000);
  }
  await mutation.mutate({
    command: "updateService", args: [original.id, { ...input, serviceKm: 49000 }],
  });
  for (const data of [await api.load(), client.getQueryData(dataKey)]) {
    validateData(data);
    assert.equal(data.vehicles[0].currentKm, 50000);
  }
});
