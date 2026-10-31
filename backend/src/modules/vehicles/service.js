import { HttpError } from "../../errors.js";
import { vehicleRepository as repository } from "./repository.js";
import {
  createVehicleSchema, createVehicleUpdateSchema,
  createOdometerSchema, deactivateVehicleSchema,
} from "./schemas.js";

const objectIdPattern = /^[a-f\d]{24}$/i;

export function requireVehicleOwner(ownerId) {
  if (typeof ownerId !== "string" || !objectIdPattern.test(ownerId)) {
    throw new HttpError(401, "UNAUTHENTICATED", "Autenticação necessária.");
  }
}

function validateId(id) {
  if (typeof id !== "string" || !objectIdPattern.test(id)) {
    throw new HttpError(400, "VALIDATION_ERROR", "Identificador de veículo inválido.", {
      id: "Informe um identificador de veículo válido.",
    });
  }
}

function parse(schema, input) {
  const result = schema.safeParse(input);
  if (result.success) return result.data;
  const fields = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] ?? "_form";
    fields[key] ??= issue.code === "unrecognized_keys"
      ? "Remova os campos não permitidos." : issue.message;
  }
  throw new HttpError(400, "VALIDATION_ERROR", "Confira os campos do veículo.", fields);
}

function translateStorageError(error) {
  if (error.code === 11000 && error.keyPattern?.plate) {
    throw new HttpError(409, "DUPLICATE_PLATE", "Já existe um veículo com esta placa.", {
      plate: "Já existe um veículo com esta placa.",
    });
  }
  // Não refletir erros internos do driver (incluem valores/consultas) ao cliente.
  throw error;
}

async function owned(ownerId, id) {
  requireVehicleOwner(ownerId);
  validateId(id);
  const vehicle = await repository.findOwned(ownerId, id);
  if (vehicle) return vehicle;
  // Apenas existência, sem carregar ou devolver os campos de outro usuário.
  if (await repository.exists(id)) {
    throw new HttpError(403, "FORBIDDEN", "Você não tem acesso a este veículo.");
  }
  throw new HttpError(404, "VEHICLE_NOT_FOUND", "Veículo não encontrado.");
}

function requireActive(vehicle) {
  if (!vehicle.active) throw new HttpError(400, "VEHICLE_INACTIVE", "O veículo está inativo.");
}

async function mutationFailed(ownerId, id) {
  requireActive(await owned(ownerId, id));
  throw new HttpError(409, "CONCURRENT_UPDATE", "O veículo mudou durante a operação. Atualize os dados e tente novamente.");
}

export const vehicleService = {
  async list(ownerId) {
    requireVehicleOwner(ownerId);
    return repository.list(ownerId);
  },
  get: owned,
  async create(ownerId, input) {
    requireVehicleOwner(ownerId);
    const fields = parse(createVehicleSchema(), input);
    try { return await repository.create(ownerId, fields); }
    catch (error) { return translateStorageError(error); }
  },
  async update(ownerId, id, input) {
    const current = await owned(ownerId, id);
    requireActive(current);
    const fields = parse(createVehicleUpdateSchema(current.currentKm), input);
    let result;
    try { result = await repository.update(ownerId, id, fields, current.__v); }
    catch (error) { return translateStorageError(error); }
    return result ?? mutationFailed(ownerId, id);
  },
  async updateOdometer(ownerId, id, input) {
    const current = await owned(ownerId, id);
    requireActive(current);
    const fields = parse(createOdometerSchema(current.currentKm), input);
    const result = await repository.updateOdometer(ownerId, id, fields.currentKm);
    return result ?? mutationFailed(ownerId, id);
  },
  async deactivate(ownerId, id, input) {
    const current = await owned(ownerId, id);
    parse(deactivateVehicleSchema, input);
    if (!current.active) return current;
    const result = await repository.deactivate(ownerId, id);
    return result ?? owned(ownerId, id);
  },
};
