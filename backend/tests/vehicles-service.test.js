import test from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectDatabase, disconnectDatabase } from "../src/database.js";
import { Vehicle } from "../src/modules/vehicles/model.js";
import { vehicleRepository } from "../src/modules/vehicles/repository.js";
import { vehicleService as service } from "../src/modules/vehicles/service.js";

test("serviços e concorrência de veículos em MongoDB isolado", { timeout: 240000 }, async (t) => {
  const mongo = await MongoMemoryServer.create();
  t.after(async () => { await disconnectDatabase(); await mongo.stop(); });
  await connectDatabase({ mongoUrl: mongo.getUri("autocuida_vehicle_services_test"), mongoTimeoutMs: 5000 });
  await vehicleRepository.initialize();
  const owner = String(new mongoose.Types.ObjectId());
  const otherOwner = String(new mongoose.Types.ObjectId());
  const fields = { plate: "ABC1234", model: "Onix", year: 2022, currentKm: 100 };
  const vehicle = await service.create(owner, fields);

  await t.test("consultas isolam usuários; id ausente/inválido e dono inválido têm erros distintos", async () => {
    assert.equal((await service.list(owner)).length, 1);
    assert.deepEqual(await service.list(otherOwner), []);
    await assert.rejects(service.get(otherOwner, vehicle.id), { status: 403, code: "FORBIDDEN" });
    await assert.rejects(service.get(owner, String(new mongoose.Types.ObjectId())), { status: 404 });
    await assert.rejects(service.get(owner, "não-é-id"), { status: 400 });
    await assert.rejects(service.list(undefined), { status: 401 });
    await assert.rejects(service.create(owner, { ...fields, ownerId: otherOwner }), { status: 400 });
    await assert.rejects(service.create(owner, { ...fields, currentKm: "0" }), { status: 400 });
  });

  await t.test("edição retorna dados confirmados e duplica placa com erro genérico de campo", async () => {
    const second = await service.create(owner, { ...fields, plate: "DEF4G56" });
    const updated = await service.update(owner, vehicle.id, { ...fields, model: " Novo modelo " });
    assert.equal(updated.model, "Novo modelo");
    assert.equal((await service.get(owner, vehicle.id)).model, "Novo modelo");
    await assert.rejects(service.update(owner, second.id, { ...fields, plate: "abc-1234" }), (error) => {
      assert.equal(error.status, 409);
      assert.equal(error.code, "DUPLICATE_PLATE");
      assert.ok(error.fields.plate);
      assert.ok(!error.message.includes(owner));
      return true;
    });
  });

  await t.test("nenhuma mutação aceita veículo de outro proprietário", async () => {
    for (const attempt of [
      () => service.update(otherOwner, vehicle.id, fields),
      () => service.updateOdometer(otherOwner, vehicle.id, { currentKm: 200 }),
      () => service.deactivate(otherOwner, vehicle.id, { active: false }),
    ]) await assert.rejects(attempt(), { status: 403 });
    assert.equal((await service.get(owner, vehicle.id)).currentKm, 100);
  });

  await t.test("atualização concorrente do odômetro termina na maior leitura", async () => {
    const attempts = await Promise.allSettled([200, 300, 250].map((currentKm) =>
      service.updateOdometer(owner, vehicle.id, { currentKm })));
    assert.ok(attempts.some((result) => result.status === "fulfilled"));
    for (const result of attempts) {
      if (result.status === "rejected") assert.ok([400, 409].includes(result.reason.status));
    }
    assert.equal((await service.get(owner, vehicle.id)).currentKm, 300);
  });

  await t.test("edição baseada em versão antiga não desfaz mudança ou aumento concorrente", async () => {
    const stale = await service.get(owner, vehicle.id);
    await service.updateOdometer(owner, vehicle.id, { currentKm: 400 });
    assert.equal(await vehicleRepository.update(owner, vehicle.id, { ...fields, currentKm: 300 }, stale.__v), null);
    // Mesmo km nova não autoriza sobrescrever outros campos de uma versão antiga.
    assert.equal(await vehicleRepository.update(owner, vehicle.id, { ...fields, currentKm: 500 }, stale.__v), null);
    assert.equal((await service.get(owner, vehicle.id)).currentKm, 400);
  });

  await t.test("inativação idempotente preserva documento e bloqueia edições/odômetro pendentes", async () => {
    const stale = await service.get(owner, vehicle.id);
    const removed = await service.deactivate(owner, vehicle.id, { active: false });
    assert.equal(removed.active, false);
    assert.equal((await service.deactivate(owner, vehicle.id, { active: false })).active, false);
    assert.equal(await vehicleRepository.update(owner, vehicle.id, { ...fields, currentKm: 500 }, stale.__v), null);
    assert.equal(await vehicleRepository.updateOdometer(owner, vehicle.id, 500), null);
    await assert.rejects(service.update(owner, vehicle.id, { ...fields, currentKm: 500 }), { code: "VEHICLE_INACTIVE" });
    await assert.rejects(service.updateOdometer(owner, vehicle.id, { currentKm: 500 }), { code: "VEHICLE_INACTIVE" });
    await assert.rejects(service.create(otherOwner, { ...fields, plate: "abc-1234" }), { status: 409 });
    assert.equal((await service.list(owner)).filter((entry) => entry.id === vehicle.id).length, 1);
    assert.equal(await Vehicle.countDocuments({ _id: vehicle.id }), 1);
  });
});
