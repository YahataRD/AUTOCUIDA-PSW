import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createApi } from "../src/data/api.js";
import { createDemoApi } from "../src/data/demo.js";
import { createVehicleApi } from "../src/data/vehicleApi.js";
import { dataKey, dataQuery, commandMutation } from "../src/data/queries.js";
import {
  QueryClient,
  QueryObserver,
  MutationObserver,
} from "@tanstack/react-query";

const seed = JSON.parse(
  await readFile(new URL("../../mock/seed.json", import.meta.url)),
);

test("consulta três recursos da API e encaminha sinal de cancelamento", async () => {
  const controller = new AbortController();
  const urls = [];
  const api = createApi("http://mock/", async (url, init) => {
    urls.push(url);
    assert.equal(init.signal, controller.signal);
    return { ok: true, json: async () => seed[url.split("/").at(-1)] };
  });
  assert.deepEqual(await api.load({ signal: controller.signal }), seed);
  assert.deepEqual(urls, [
    "http://mock/vehicles",
    "http://mock/maintenanceItems",
    "http://mock/serviceRecords",
  ]);
});

test("API autenticada consulta veículos, itens e serviços com Bearer", async () => {
  const requests = [];
  const fetcher = async (url, init) => {
    requests.push({ url, init });
    const resource = url.split("/").at(-1);
    const payload = resource === "vehicles"
      ? seed.vehicles
      : resource === "maintenanceItems"
        ? seed.maintenanceItems
        : seed.serviceRecords;
    return {
      ok: true,
      status: 200,
      text: async () => JSON.stringify(payload),
    };
  };
  const api = createVehicleApi("http://express", {
    fetcher,
    getToken: () => "token-teste",
  });
  const data = await api.load();
  assert.deepEqual(data, seed);
  assert.equal(requests.length, 3);
  assert.ok(requests.every(({ init }) =>
    init.headers.Authorization === "Bearer token-teste"));
});

test("API autenticada envia itens e serviços nos contratos Express", async () => {
  const requests = [];
  const fetcher = async (url, init) => {
    requests.push({ url, init });
    return {
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ id: "1", active: true }),
    };
  };
  const api = createVehicleApi("http://express", { fetcher, getToken: () => "token" });

  await api.registerMaintenanceItem("vehicle-1", {
    name: "Óleo",
    intervalKm: 10000,
    intervalMonths: 12,
    initialDate: "2026-01-01",
    initialKm: 20000,
  });
  assert.equal(requests.at(-1).url, "http://express/maintenanceItems");
  assert.equal(requests.at(-1).init.method, "POST");
  assert.deepEqual(JSON.parse(requests.at(-1).init.body), {
    vehicleId: "vehicle-1",
    name: "Óleo",
    intervalKm: 10000,
    intervalMonths: 12,
    initialReference: { date: "2026-01-01", km: 20000 },
  });

  await api.registerService("vehicle-1", {
    maintenanceItemId: "item-1",
    maintenanceType: "preventive",
    serviceDate: "2026-10-01",
    serviceKm: 21000,
    amount: 350,
    shop: "Oficina",
  });
  assert.equal(requests.at(-1).url, "http://express/serviceRecords");
  assert.equal(requests.at(-1).init.method, "POST");
  assert.deepEqual(JSON.parse(requests.at(-1).init.body), {
    vehicleId: "vehicle-1",
    maintenanceItemId: "item-1",
    maintenanceType: "preventive",
    serviceDate: "2026-10-01",
    serviceKm: 21000,
    amount: 350,
    shop: "Oficina",
  });
});

test("API autenticada transforma exclusao HTTP 204 em resultado com ID", async () => {
  let requestUrl;
  let requestInit;
  const api = createVehicleApi("http://express", {
    fetcher: async (url, init) => {
      requestUrl = url;
      requestInit = init;
      return { ok: true, status: 204, text: async () => "" };
    },
    getToken: () => "token",
  });

  assert.deepEqual(await api.removeService("service-1"), { id: "service-1" });
  assert.equal(requestUrl, "http://express/serviceRecords/service-1");
  assert.equal(requestInit.method, "DELETE");
  assert.equal(requestInit.headers.Authorization, "Bearer token");
});

test("HTTP, rede, JSON e vínculos inválidos não viram dados de demonstração", async () => {
  for (const fetcher of [
    async () => ({ ok: false, status: 404 }),
    async () => {
      throw new TypeError("offline");
    },
    async () => ({
      ok: true,
      json: async () => {
        throw new SyntaxError("json");
      },
    }),
    async () => ({ ok: true, json: async () => [{ id: "invalid" }] }),
  ])
    await assert.rejects(createApi("http://mock", fetcher).load());
  const controller = new AbortController();
  controller.abort();
  const api = createApi("http://mock", async (_, { signal }) => {
    signal.throwIfAborted();
  });
  await assert.rejects(api.load({ signal: controller.signal }), {
    name: "AbortError",
  });
});

test("TanStack Query atualiza cache/seleção após cadastro e odômetro, sem repetir mutação", async (t) => {
  const client = new QueryClient();
  const api = createDemoApi();
  const observer = new QueryObserver(client, dataQuery(api));
  const unsubscribe = observer.subscribe(() => {});
  t.after(() => {
    unsubscribe();
    client.clear();
  });
  await observer.refetch();
  const mutation = new MutationObserver(client, commandMutation(client, api));
  const vehicle = await mutation.mutate({
    command: "registerVehicle",
    args: [{ plate: "xyz1234", model: "Teste", year: 2022, currentKm: 0 }],
  });
  assert.deepEqual(client.getQueryData(dataKey).vehicles.at(-1), vehicle);
  await mutation.mutate({ command: "updateOdometer", args: [vehicle.id, 100] });
  assert.equal(client.getQueryData(dataKey).vehicles.at(-1).currentKm, 100);
  let attempts = 0;
  api.updateOdometer = async () => {
    attempts++;
    throw new Error("Servidor indisponível");
  };
  await assert.rejects(
    mutation.mutate({ command: "updateOdometer", args: [vehicle.id, 200] }),
  );
  assert.equal(attempts, 1);
  assert.equal(client.getQueryData(dataKey).vehicles.at(-1).currentKm, 100);
});

test("refetch que falha preserva veículo confirmado e sinaliza dados desatualizados", async (t) => {
  const client = new QueryClient();
  const demo = createDemoApi();
  let unavailable = false;
  const api = {
    ...demo,
    load: async () => {
      if (unavailable) throw new Error("offline");
      return demo.load();
    },
    registerVehicle: async (input) => {
      const saved = await demo.registerVehicle(input);
      unavailable = true;
      return saved;
    },
  };
  const observer = new QueryObserver(client, dataQuery(api));
  const unsubscribe = observer.subscribe(() => {});
  t.after(() => {
    unsubscribe();
    client.clear();
  });
  await observer.refetch();
  const mutation = new MutationObserver(client, commandMutation(client, api));
  const saved = await mutation.mutate({
    command: "registerVehicle",
    args: [{ plate: "xyz1234", model: "Teste", year: 2022, currentKm: 0 }],
  });
  assert.deepEqual(client.getQueryData(dataKey).vehicles.at(-1), saved);
  assert.equal(observer.getCurrentResult().isRefetchError, true);
  unavailable = false;
  await observer.refetch();
  assert.equal(observer.getCurrentResult().isError, false);
});

test("demo usa mesma seed e descarta alterações em uma nova sessão", async () => {
  const demo = createDemoApi();
  await demo.updateOdometer("2", 23000);
  assert.equal((await demo.load()).vehicles[1].currentKm, 23000);
  assert.deepEqual(await createDemoApi().load(), seed);
});

test("demo gerencia veículos e itens sem perder o histórico", async () => {
  const api = createDemoApi();
  const vehicle = (await api.load()).vehicles[0];
  const updated = await api.updateVehicle(vehicle.id, {
    plate: vehicle.plate,
    model: "Modelo atualizado",
    year: String(vehicle.year),
    currentKm: String(vehicle.currentKm),
  });
  assert.equal(updated.model, "Modelo atualizado");
  const item = await api.registerMaintenanceItem(vehicle.id, {
    name: "Pneus",
    intervalKm: "40000",
    intervalMonths: "48",
    initialDate: "2026-01-01",
    initialKm: "40000",
  });
  assert.equal((await api.load()).maintenanceItems.at(-1).id, item.id);
  await api.removeMaintenanceItem(item.id);
  await api.deactivateVehicle(vehicle.id);
  const data = await api.load();
  assert.equal(data.vehicles.find((entry) => entry.id === vehicle.id).active, false);
  assert.equal(data.serviceRecords.filter((record) => record.vehicleId === vehicle.id).length, 4);
});

test("editar e excluir serviço recalcula a referência derivada", async () => {
  const api = createDemoApi();
  const before = await api.load();
  const record = before.serviceRecords.find((entry) => entry.maintenanceItemId === "1");
  await api.updateService(record.id, {
    maintenanceItemId: "1",
    maintenanceType: "preventive",
    serviceKm: 32000,
    serviceDate: "2026-03-01",
    amount: 375,
    shop: "Nova oficina",
  });
  let data = await api.load();
  assert.equal(data.serviceRecords.find((entry) => entry.id === record.id).amount, 375);
  await api.removeService(record.id);
  data = await api.load();
  assert.equal(data.serviceRecords.some((entry) => entry.id === record.id), false);
});
