import mongoose from "mongoose";
import { isVehicleKm, isVehicleYear, normalizePlate, platePattern } from "./rules.js";

const vehicleSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    immutable: true,
    index: true,
    select: false,
  },
  plate: {
    type: String,
    required: true,
    set: normalizePlate,
    match: [platePattern, "Informe uma placa válida."],
  },
  model: { type: String, required: true, trim: true },
  year: {
    type: Number,
    required: true,
    validate: { validator: (value) => isVehicleYear(value), message: "Ano do veículo inválido." },
  },
  currentKm: {
    type: Number,
    required: true,
    validate: { validator: isVehicleKm, message: "Quilometragem inválida." },
  },
  active: { type: Boolean, required: true, default: true },
}, {
  collection: "vehicles",
  strict: "throw",
  toJSON: {
    // Lista explícita: campos internos não passam para o contrato público.
    transform(doc, ret) {
      return {
        id: String(ret._id),
        plate: ret.plate,
        model: ret.model,
        year: ret.year,
        currentKm: ret.currentKm,
        active: ret.active,
      };
    },
  },
});

// Global, sem filtro por active/ownerId: inativar não libera a placa.
// O índice protege inclusive escritas concorrentes; unique não é um validator.
vehicleSchema.index({ plate: 1 }, { unique: true, name: "unique_vehicle_plate" });

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
