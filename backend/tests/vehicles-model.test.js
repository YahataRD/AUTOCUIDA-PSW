import test from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectDatabase, disconnectDatabase } from "../src/database.js";
import { Vehicle } from "../src/modules/vehicles/model.js";

test("modelo de veículo no MongoDB real isolado", { timeout: 240000 }, async (t) => {
  // Não ler MONGO_URL; não criar documentos ou índices no Atlas compartilhado.
  const mongo = await MongoMemoryServer.create();
  t.after(async () => { await disconnectDatabase(); await mongo.stop(); });
  await connectDatabase({ mongoUrl: mongo.getUri("autocuida_vehicles_test"), mongoTimeoutMs: 5000 });
  // Aguardar índices antes de testar unicidade, sem depender do timing do Mongo.
  await Vehicle.init();
  const ownerId = new mongoose.Types.ObjectId();
  const fields = { ownerId, plate: "ABC1234", model: " Onix ", year: 2022, currentKm: 0 };

  await t.test("persiste normalizado e publica somente os campos do contrato", async () => {
    const saved = await Vehicle.create({ ...fields, plate: " abc-1234 " });
    const loaded = await Vehicle.findById(saved.id);
    assert.deepEqual(loaded.toJSON(), {
      id: saved.id, plate: "ABC1234", model: "Onix", year: 2022, currentKm: 0, active: true,
    });
    assert.equal(typeof loaded.toJSON().id, "string");
    assert.equal(loaded.ownerId, undefined);
    const stored = await Vehicle.findById(saved.id).select("+ownerId");
    assert.equal(String(stored.ownerId), String(ownerId));
    // Nem selecionar explicitamente o dono o inclui no JSON público.
    assert.equal(stored.toJSON().ownerId, undefined);
  });

  await t.test("placa normalizada é única mesmo entre donos distintos e gravações simultâneas", async () => {
    const results = await Promise.allSettled([
      Vehicle.create({ ...fields, plate: "DEF-4G56" }),
      Vehicle.create({ ...fields, ownerId: new mongoose.Types.ObjectId(), plate: " def4g56 " }),
    ]);
    assert.equal(results.filter((result) => result.status === "fulfilled").length, 1);
    assert.equal(results.find((result) => result.status === "rejected").reason.code, 11000);
    assert.equal(await Vehicle.countDocuments({ plate: "DEF4G56" }), 1);
  });

  await t.test("inativar não remove documento nem libera placa para outro cadastro", async () => {
    const vehicle = await Vehicle.findOne({ plate: "ABC1234" });
    vehicle.active = false;
    await vehicle.save();
    await assert.rejects(Vehicle.create({ ...fields, plate: "abc-1234" }), (error) => error.code === 11000);
    assert.equal((await Vehicle.findById(vehicle.id)).active, false);
  });

  await t.test("modelo rejeita campos inválidos/ausentes sem gravar documentos", async () => {
    const before = await Vehicle.countDocuments();
    for (const invalid of [
      { ownerId: undefined }, { ownerId: "não-é-objectid" }, { plate: "inválida" },
      { model: " " }, { year: 1885 }, { year: 2022.5 },
      { year: 9999 }, { currentKm: -1 }, { currentKm: 0.5 },
      { currentKm: Number.MAX_SAFE_INTEGER + 1 }, { currentKm: undefined },
    ]) {
      await assert.rejects(Vehicle.create({ ...fields, plate: "HIJ7890", ...invalid }),
        (error) => error.name === "ValidationError");
    }
    assert.throws(() => new Vehicle({ ...fields, arbitraryField: "x" }), /strict mode/);
    assert.equal(await Vehicle.countDocuments(), before);
  });

  await t.test("proprietário permanece imutável ao salvar um documento existente", async () => {
    const vehicle = await Vehicle.findOne({ plate: "DEF4G56" }).select("+ownerId");
    const originalOwner = String(vehicle.ownerId);
    vehicle.ownerId = new mongoose.Types.ObjectId();
    await assert.rejects(vehicle.save(), (error) => error.errors?.ownerId?.name === "StrictModeError");
    const persisted = await Vehicle.findById(vehicle.id).select("+ownerId");
    assert.equal(String(persisted.ownerId), originalOwner);
  });
});
