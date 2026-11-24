import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { readFile } from "node:fs/promises";
import { User } from "../src/modules/auth/user.model.js";
import { Vehicle } from "../src/modules/vehicles/model.js";
import { connectDatabase, disconnectDatabase } from "../src/database.js";

const mongoUrl = process.env.MONGO_URL?.trim();
const email = process.env.SEED_USER_EMAIL?.trim().toLowerCase();
const password = process.env.SEED_USER_PASSWORD;
const mongoTimeoutMs = Number(process.env.MONGO_TIMEOUT_MS ?? "10000");

if (!mongoUrl) throw new Error("Configure MONGO_URL.");
if (!email || !password) {
  throw new Error("Configure SEED_USER_EMAIL e SEED_USER_PASSWORD.");
}
if (password.length < 8) throw new Error("SEED_USER_PASSWORD deve ter ao menos 8 caracteres.");

await connectDatabase({ mongoUrl, mongoTimeoutMs });
try {
  await User.createIndexes();
  await Vehicle.createIndexes();

  const passwordHash = await bcrypt.hash(password, 12);
  let user = await User.findOne({ email }).select("+passwordHash");
  if (user) {
    user.name = "Usuário Demo";
    user.passwordHash = passwordHash;
    await user.save();
  } else {
    user = await User.create({
      name: "Usuário Demo",
      email,
      passwordHash,
    });
  }

  const seedUrl = new URL("../../mock/seed.json", import.meta.url);
  const seed = JSON.parse(await readFile(seedUrl, "utf8"));
  await Vehicle.deleteMany({ ownerId: user._id });

  const vehicleIds = new Map();
  const itemIds = new Map();
  for (const source of seed.vehicles) {
    vehicleIds.set(source.id, new mongoose.Types.ObjectId());
  }
  for (const source of seed.maintenanceItems) {
    itemIds.set(source.id, new mongoose.Types.ObjectId());
  }

  const documents = seed.vehicles.map((source) => {
    const vehicleId = vehicleIds.get(source.id);
    const maintenanceItems = seed.maintenanceItems
      .filter((item) => item.vehicleId === source.id)
      .map((item) => ({
        _id: itemIds.get(item.id),
        name: item.name,
        intervalKm: item.intervalKm,
        intervalMonths: item.intervalMonths,
        active: item.active,
        initialReference: item.initialReference,
      }));
    const serviceRecords = seed.serviceRecords
      .filter((record) => record.vehicleId === source.id)
      .map((record) => ({
        _id: new mongoose.Types.ObjectId(),
        maintenanceItemId: itemIds.get(record.maintenanceItemId),
        itemName: record.itemName,
        maintenanceType: record.maintenanceType,
        serviceDate: record.serviceDate,
        serviceKm: record.serviceKm,
        amount: record.amount,
        shop: record.shop,
      }));
    return {
      _id: vehicleId,
      ownerId: user._id,
      plate: source.plate,
      model: source.model,
      year: source.year,
      currentKm: source.currentKm,
      active: source.active,
      maintenanceItems,
      serviceRecords,
    };
  });

  if (documents.length) await Vehicle.insertMany(documents);
  console.log(`Carga inicial criada para ${email}: ${documents.length} veículo(s).`);
} finally {
  await disconnectDatabase();
}
