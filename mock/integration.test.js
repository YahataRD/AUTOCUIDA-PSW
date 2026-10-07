import test from "node:test";
import assert from "node:assert/strict";
import { copyFile, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { once } from "node:events";
import jsonServer from "json-server";
import { createApi } from "../frontend/src/data/api.js";
import { selectVehicleData } from "../frontend/src/state/autoCuida.js";
import { calculateCostSummary } from "../frontend/src/utils/costs.js";

async function setup(t, middleware) {
  const folder = await mkdtemp(join(tmpdir(), "autocuida-api-"));
  const file = join(folder, "db.json");
  await copyFile(new URL("./seed.json", import.meta.url), file);
  const app = jsonServer.create();
  app.use(jsonServer.defaults({ logger: false, static: folder }));
  app.use(jsonServer.bodyParser);
  if (middleware) app.use(middleware);
  app.use(jsonServer.router(file));
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    await rm(folder, { recursive: true, force: true });
  });
  const url = `http://127.0.0.1:${server.address().port}`;
  return { api: createApi(url), url, file };
}

const input = {
  maintenanceItemId: "5",
  maintenanceType: "preventive",
  serviceDate: "2026-10-02",
  serviceKm: 23000,
  amount: 100,
  shop: "Oficina teste",
};

test("serviço de item removido é editado e persiste sem permitir novos vínculos inativos", async (t) => {
  const writes = [];
  const { api, url, file } = await setup(t, (req, res, next) => {
    if (req.method !== "GET") writes.push(`${req.method} ${req.path}`);
    next();
  });
  const original = (await api.load()).serviceRecords.find((record) => record.maintenanceItemId === "2");
  await api.removeMaintenanceItem("2");
  await api.removeMaintenanceItem("3");
  writes.length = 0;
  await api.updateService(original.id, { ...original, amount: 150 });
  assert.deepEqual(writes, [`PUT /serviceRecords/${original.id}`]);
  const saved = await createApi(url).load();
  assert.deepEqual(JSON.parse(await readFile(file, "utf8")), saved);
  assert.equal(saved.maintenanceItems.find((item) => item.id === "2").active, false);
  assert.equal(saved.serviceRecords.find((record) => record.id === original.id).maintenanceItemId, "2");
  assert.equal(calculateCostSummary(selectVehicleData(saved, "1").serviceRecords).total, 2230);
  writes.length = 0;
  await assert.rejects(api.registerService("1", original), /item ativo/);
  await assert.rejects(api.updateService(original.id, { ...original, maintenanceItemId: "3" }), /item ativo/);
  assert.deepEqual(writes, []);
  assert.deepEqual(await api.load(), saved);
});

test("edição rejeita odômetro menor e referência incompatível antes de qualquer escrita", async (t) => {
  const writes = [];
  const { api, url } = await setup(t, (req, res, next) => {
    if (req.method !== "GET") writes.push(req.method);
    next();
  });
  const before = await api.load();
  await assert.rejects(
    api.updateVehicle("1", { ...before.vehicles[0], currentKm: 0 }),
    (error) => Boolean(error.fields?.currentKm),
  );
  await assert.rejects(api.updateMaintenanceItem("1", {
    ...before.maintenanceItems[0], initialDate: "2026-10-02", initialKm: 10000,
  }), /incompatível/);
  assert.deepEqual(writes, []);
  assert.deepEqual(await createApi(url).load(), before);
  await api.updateVehicle("1", { ...before.vehicles[0], model: "Modelo corrigido" });
  await api.updateMaintenanceItem("1", { ...before.maintenanceItems[0], intervalKm: 12000 });
  const saved = await createApi(url).load();
  assert.equal(saved.vehicles[0].model, "Modelo corrigido");
  assert.equal(saved.maintenanceItems[0].intervalKm, 12000);
  assert.deepEqual(saved.serviceRecords, before.serviceRecords);
});

test("edição de serviço persiste odômetro antes do registro e mantém nova sessão válida", async (t) => {
  const writes = [];
  const { api, url } = await setup(t, (req, res, next) => {
    if (req.method !== "GET") writes.push(`${req.method} ${req.path}`);
    next();
  });
  const before = await api.load();
  const original = before.serviceRecords.find((record) => record.id === "2");
  const edited = { ...original, serviceDate: "2026-10-02", serviceKm: 50000, amount: 400 };
  await api.updateService(original.id, edited);
  assert.deepEqual(writes, ["PATCH /vehicles/1", "PUT /serviceRecords/2"]);
  const view = selectVehicleData(await createApi(url).load(), "1");
  assert.equal(view.vehicle.currentKm, 50000);
  assert.equal(view.maintenanceItems[0].lastServiceKm, 50000);
  assert.equal(calculateCostSummary(view.serviceRecords).total, 2250);
  await api.updateService(original.id, { ...edited, serviceKm: 49000 });
  const saved = await createApi(url).load();
  assert.equal(saved.vehicles[0].currentKm, 50000);
  assert.deepEqual(saved.vehicles[1], before.vehicles[1]);
  assert.equal(saved.serviceRecords.length, before.serviceRecords.length);
});

test("edição não envia PUT quando a atualização prévia do odômetro falha", async (t) => {
  let puts = 0;
  const { api } = await setup(t, (req, res, next) => {
    if (req.method === "PATCH") return res.sendStatus(500);
    if (req.method === "PUT") puts++;
    next();
  });
  const before = await api.load();
  const record = before.serviceRecords.find((entry) => entry.id === "2");
  await assert.rejects(api.updateService(record.id, {
    ...record, serviceDate: "2026-10-02", serviceKm: 50000,
  }), /HTTP 500/);
  assert.equal(puts, 0);
  assert.deepEqual(await api.load(), before);
});

test("edição com PUT recusado informa falha parcial e preserva histórico válido", async (t) => {
  const { api, url } = await setup(t, (req, res, next) => {
    if (req.method === "PUT") return res.sendStatus(500);
    next();
  });
  const before = await api.load();
  const record = before.serviceRecords.find((entry) => entry.id === "2");
  await assert.rejects(api.updateService(record.id, {
    ...record, serviceDate: "2026-10-02", serviceKm: 50000,
  }), /odômetro foi atualizado.*edição.*histórico/);
  const saved = await createApi(url).load();
  assert.equal(saved.vehicles[0].currentKm, 50000);
  assert.deepEqual(saved.serviceRecords, before.serviceRecords);
});

test("cadastro persiste no arquivo, retorna ID string e uma nova sessão consulta o veículo", async (t) => {
  const { api, url, file } = await setup(t);
  const vehicle = await api.registerVehicle({
    plate: "xyz-1234",
    model: "Teste",
    year: 2022,
    currentKm: 0,
  });
  assert.equal(typeof vehicle.id, "string");
  assert.equal(vehicle.plate, "XYZ1234");
  const saved = JSON.parse(await readFile(file, "utf8"));
  assert.deepEqual(saved.vehicles.at(-1), vehicle);
  assert.deepEqual((await createApi(url).load()).vehicles.at(-1), vehicle);
  await assert.rejects(
    api.registerVehicle({ ...vehicle, plate: "xyz1234" }),
    /campos/,
  );
  assert.equal((await api.load()).vehicles.length, 3);
});

test("odômetro consulta leitura atual e rejeita uma leitura antiga de outra sessão", async (t) => {
  const { api, url } = await setup(t);
  const initial = await api.load();
  await createApi(url).updateOdometer("2", 24000);
  await assert.rejects(api.updateOdometer("2", 23000), /maior/);
  const saved = await api.load();
  assert.equal(saved.vehicles[1].currentKm, 24000);
  assert.deepEqual(saved.vehicles[0], initial.vehicles[0]);
});

test("serviço persiste, recalcula referência/custos e retroativo não reduz odômetro", async (t) => {
  const { api, url } = await setup(t);
  await api.registerService("2", input);
  await api.registerService("2", {
    ...input,
    serviceDate: "2026-08-01",
    serviceKm: 21000,
  });
  const saved = await createApi(url).load();
  const view = selectVehicleData(saved, "2");
  assert.equal(view.vehicle.currentKm, 23000);
  assert.equal(view.serviceRecords.length, 2);
  assert.equal(view.maintenanceItems[0].lastServiceKm, 23000);
  assert.equal(calculateCostSummary(view.serviceRecords).total, 200);
  assert.equal(
    calculateCostSummary(selectVehicleData(saved, "1").serviceRecords).total,
    2200,
  );
  await assert.rejects(api.registerService("1", input), /deste veículo/);
});

test("falha ao salvar odômetro impede o POST de serviço", async (t) => {
  const { api } = await setup(t, (req, res, next) => {
    if (req.method === "PATCH") return res.sendStatus(500);
    next();
  });
  await assert.rejects(api.registerService("2", input), /HTTP 500/);
  const view = selectVehicleData(await api.load(), "2");
  assert.equal(view.vehicle.currentKm, 22000);
  assert.equal(view.serviceRecords.length, 0);
});

test("POST recusado após PATCH informa falha parcial e mantém base válida", async (t) => {
  const { api } = await setup(t, (req, res, next) => {
    if (req.method === "POST") return res.sendStatus(500);
    next();
  });
  await assert.rejects(
    api.registerService("2", input),
    /odômetro foi atualizado.*histórico/,
  );
  const view = selectVehicleData(await api.load(), "2");
  assert.equal(view.vehicle.currentKm, 23000);
  assert.equal(view.serviceRecords.length, 0);
});

test("resposta perdida após POST não provoca repetição automática e histórico permite conferir", async (t) => {
  const { url } = await setup(t);
  let writes = 0;
  const api = createApi(url, async (requestUrl, init) => {
    const response = await fetch(requestUrl, init);
    if (init.method === "POST") {
      writes++;
      throw new TypeError("connection lost");
    }
    return response;
  });
  await assert.rejects(api.registerService("2", input), /Confira o histórico/);
  assert.equal(writes, 1);
  assert.equal(
    selectVehicleData(await createApi(url).load(), "2").serviceRecords.length,
    1,
  );
});
