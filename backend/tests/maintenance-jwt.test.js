import test from "node:test";
import assert from "node:assert/strict";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { startServer } from "../src/runtime.js";

test("itens e serviços usam JWT, isolam as contas e preservam o histórico", { timeout: 240000 }, async (t) => {
  const mongo = await MongoMemoryServer.create();
  let runtime;
  t.after(async () => {
    try {
      await runtime?.close();
    } finally {
      await mongo.stop();
    }
  });
  runtime = await startServer({
    host: "127.0.0.1",
    port: 0,
    origins: [],
    mongoUrl: mongo.getUri("autocuida_maintenance_jwt_test"),
    mongoTimeoutMs: 5000,
    authConfig: { jwtSecret: "m".repeat(48), jwtExpiresInSeconds: 3600, bcryptRounds: 4 },
  });
  const api = request(runtime.server);
  const items = "/maintenanceItems";
  const services = "/serviceRecords";

  async function login(name, email) {
    const password = "senha-de-teste-123";
    await api.post("/usuarios").send({ name, email, password }).expect(201);
    const { body } = await api.post("/login").send({ email, password }).expect(200);
    return (req) => req.auth(body.token, { type: "bearer" });
  }

  const ana = await login("Ana Souza", "ana@autocuida.invalid");
  const bia = await login("Bia Souza", "bia@autocuida.invalid");
  const vehicle = { plate: "ABC1D23", model: "Onix", year: 2022, currentKm: 10000 };
  const { body: anaCar } = await ana(api.post("/vehicles")).send(vehicle).expect(201);
  const { body: biaCar } = await bia(api.post("/vehicles"))
    .send({ ...vehicle, plate: "BCD2E34" }).expect(201);
  const { body: anaOtherCar } = await ana(api.post("/vehicles"))
    .send({ ...vehicle, plate: "EFG3H45" }).expect(201);

  const itemInput = {
    name: "Óleo",
    intervalKm: 7000,
    intervalMonths: 6,
    initialReference: { date: "2025-11-01", km: 10000 },
  };
  const firstItem = { ...itemInput, vehicleId: anaCar.id };
  await api.get(items).expect(401);
  await api.get(services).auth("token-invalido", { type: "bearer" }).expect(401);
  await api.post(items).send(firstItem).expect(401);
  await api.post(services).send({}).expect(401);
  await bia(api.post(items)).send(firstItem).expect(404);
  await ana(api.post(items)).send({ ...firstItem, intervalKm: 0, intervalMonths: 0 }).expect(400);
  await ana(api.post(items)).send({ ...firstItem, intervalKm: "7000" }).expect(400);
  await ana(api.post(items)).send({ ...firstItem, ownerId: biaCar.id }).expect(400);
  await ana(api.post(items))
    .send({ ...firstItem, initialReference: { date: "2025-11-01", km: 10001 } }).expect(400);

  const { body: anaItem } = await ana(api.post(items)).send(firstItem).expect(201);
  const { body: biaItem } = await bia(api.post(items))
    .send({ ...itemInput, name: "Filtros", vehicleId: biaCar.id }).expect(201);
  assert.deepEqual(anaItem, { ...firstItem, id: anaItem.id, active: true });
  const anaItemPath = `${items}/${anaItem.id}`;
  await api.put(anaItemPath).send(itemInput).expect(401);
  await api.patch(anaItemPath).send({ active: false }).expect(401);
  await bia(api.get(anaItemPath)).expect(404);
  await bia(api.put(anaItemPath)).send(itemInput).expect(404);
  await bia(api.patch(anaItemPath)).send({ active: false }).expect(404);
  assert.deepEqual((await ana(api.get(items)).expect(200)).body, [anaItem]);
  assert.deepEqual((await bia(api.get(items)).expect(200)).body, [biaItem]);
  assert.deepEqual((await bia(api.get(items)).query({ vehicleId: anaCar.id }).expect(200)).body, []);

  const recordInput = {
    maintenanceItemId: anaItem.id,
    maintenanceType: "preventive",
    serviceDate: "2025-11-10",
    serviceKm: 12000,
    amount: 130.50,
    shop: "Oficina local",
  };
  const firstRecord = { ...recordInput, vehicleId: anaCar.id };
  await bia(api.post(services)).send(firstRecord).expect(404);
  await ana(api.post(services)).send({ ...firstRecord, maintenanceItemId: biaItem.id }).expect(400);
  await ana(api.post(services)).send({ ...firstRecord, vehicleId: anaOtherCar.id }).expect(400);
  await ana(api.post(services)).send({ ...firstRecord, serviceDate: "2025-02-29" }).expect(400);
  await ana(api.post(services)).send({ ...firstRecord, amount: 0 }).expect(400);
  await ana(api.post(services)).send({ ...firstRecord, itemName: "Nome indevido" }).expect(400);
  const { body: anaRecord } = await ana(api.post(services)).send(firstRecord).expect(201);
  const { body: biaRecord } = await bia(api.post(services))
    .send({ ...firstRecord, maintenanceItemId: biaItem.id, vehicleId: biaCar.id }).expect(201);
  assert.deepEqual(anaRecord, { ...firstRecord, id: anaRecord.id, itemName: anaItem.name });
  const anaRecordPath = `${services}/${anaRecord.id}`;
  await api.delete(anaRecordPath).expect(401);
  await bia(api.get(anaRecordPath)).expect(404);
  await bia(api.put(anaRecordPath)).send(recordInput).expect(404);
  await bia(api.delete(anaRecordPath)).expect(404);
  assert.deepEqual((await ana(api.get(services)).query({ vehicleId: anaCar.id }).expect(200)).body, [anaRecord]);
  assert.deepEqual((await bia(api.get(services)).expect(200)).body, [biaRecord]);
  assert.equal((await ana(api.get(`/vehicles/${anaCar.id}`)).expect(200)).body.currentKm, 12000);

  await ana(api.post(services)).send({
    ...firstRecord, serviceDate: "2025-11-05", serviceKm: 14000,
  }).expect(400);
  const { body: olderRecord } = await ana(api.post(services)).send({
    ...firstRecord, serviceDate: "2025-11-05", serviceKm: 11000,
  }).expect(201);
  await ana(api.put(anaItemPath)).send({
    ...itemInput, initialReference: { date: "2025-11-06", km: 10000 },
  }).expect(400);
  const renamed = await ana(api.put(anaItemPath)).send({ ...itemInput, name: "Óleo 5W30" }).expect(200);
  assert.equal(renamed.body.name, "Óleo 5W30");
  const removed = await ana(api.patch(anaItemPath)).send({ active: false }).expect(200);
  assert.equal(removed.body.active, false);
  await ana(api.post(services)).send(firstRecord).expect(400);
  const updated = await ana(api.put(anaRecordPath)).send({ ...recordInput, serviceKm: 13000 }).expect(200);
  assert.equal(updated.body.itemName, "Óleo");
  assert.equal(updated.body.serviceKm, 13000);
  await ana(api.delete(anaRecordPath)).expect(204);
  await ana(api.get(anaRecordPath)).expect(404);
  assert.deepEqual((await ana(api.get(services)).expect(200)).body, [olderRecord]);
  const updatedCar = (await ana(api.get(`/vehicles/${anaCar.id}`)).expect(200)).body;
  assert.deepEqual(updatedCar, { ...anaCar, currentKm: 13000 });

  const biaNewRecord = { ...firstRecord, maintenanceItemId: biaItem.id, vehicleId: biaCar.id };
  const conflicting = await Promise.all([
    bia(api.post(services)).send({ ...biaNewRecord, serviceDate: "2025-11-11", serviceKm: 15000 }),
    bia(api.post(services)).send({ ...biaNewRecord, serviceDate: "2025-11-12", serviceKm: 14000 }),
  ]);
  const saved = conflicting.find(({ status }) => status === 201);
  assert.ok(saved);
  assert.equal(conflicting.filter(({ status }) => status === 400 || status === 409).length, 1);
  assert.deepEqual((await bia(api.get(services)).expect(200)).body, [biaRecord, saved.body]);
  assert.equal((await bia(api.get(`/vehicles/${biaCar.id}`)).expect(200)).body.currentKm, saved.body.serviceKm);

  await bia(api.patch(`/vehicles/${biaCar.id}`)).send({ active: false }).expect(200);
  await bia(api.post(items)).send({ ...itemInput, vehicleId: biaCar.id }).expect(400);
  await bia(api.post(services)).send(biaNewRecord).expect(400);
  assert.deepEqual((await bia(api.get(services)).expect(200)).body, [biaRecord, saved.body]);
});
