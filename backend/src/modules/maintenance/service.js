import { Types } from "mongoose";
import { HttpError } from "../../errors.js";
import { parseWith } from "../../middleware/validate.js";
import { maintenanceRepository as repository } from "./repository.js";
import {
  idInput, itemInput, listInput, newItemInput, newRecordInput, recordInput, removeItemInput,
} from "./schemas.js";

const items = "maintenanceItems";
const records = "serviceRecords";

function serialize(entry, vehicle) {
  const identity = { id: String(entry._id), vehicleId: String(vehicle._id) };
  if (entry.maintenanceItemId) {
    const { itemName, maintenanceType, serviceDate, serviceKm, amount, shop } = entry;
    return {
      ...identity, maintenanceItemId: String(entry.maintenanceItemId),
      itemName, maintenanceType, serviceDate, serviceKm, amount, shop,
    };
  }
  const { name, intervalKm, intervalMonths, active, initialReference: { date, km } } = entry;
  return { ...identity, name, intervalKm, intervalMonths, active, initialReference: { date, km } };
}

function notFound(resource) {
  const [code, message] = resource === items
    ? ["MAINTENANCE_ITEM_NOT_FOUND", "Item de manutenção não encontrado."]
    : ["SERVICE_RECORD_NOT_FOUND", "Serviço não encontrado."];
  throw new HttpError(404, code, message);
}

function invalidField(field, message) {
  throw new HttpError(400, "VALIDATION_ERROR", message, { [field]: message });
}

async function getVehicle(ownerId, id) {
  const vehicle = await repository.findOwned(ownerId, { _id: id });
  if (!vehicle) throw new HttpError(404, "VEHICLE_NOT_FOUND", "Veículo não encontrado.");
  return vehicle;
}

async function getEntry(ownerId, resource, inputId) {
  const { id } = parseWith(idInput, { id: inputId });
  const vehicle = await repository.findOwned(ownerId, { [`${resource}._id`]: new Types.ObjectId(id) });
  const entry = vehicle?.[resource].find((candidate) => String(candidate._id) === id);
  if (!entry) notFound(resource);
  return { vehicle, entry };
}

function requireActive(vehicle) {
  if (!vehicle.active) throw new HttpError(400, "VEHICLE_INACTIVE", "O veículo está inativo.");
}

async function save(ownerId, vehicle, changes) {
  if (!await repository.save(ownerId, vehicle, changes)) {
    throw new HttpError(409, "CONCURRENT_UPDATE", "Os dados do veículo mudaram. Atualize e tente novamente.");
  }
}

function replace(entries, current, replacement) {
  return entries.map((entry) => entry._id.equals(current._id) ? replacement : entry);
}

function isOutOfOrder({ date, km }, records) {
  return records.some(({ serviceDate, serviceKm }) =>
    (serviceDate < date && serviceKm > km) || (serviceDate > date && serviceKm < km));
}

function validateReference(vehicle, reference, itemId) {
  if (reference.km > vehicle.currentKm) {
    invalidField("initialReference.km", "A referência não pode superar o odômetro.");
  }
  const history = vehicle.serviceRecords?.filter((record) => record.maintenanceItemId.equals(itemId)) ?? [];
  if (isOutOfOrder(reference, history)) {
    invalidField("initialReference.km", "A referência não é compatível com o histórico do item.");
  }
}

function buildRecord(vehicle, fields, current) {
  const itemId = new Types.ObjectId(fields.maintenanceItemId);
  const item = vehicle.maintenanceItems?.find((candidate) => candidate._id.equals(itemId));
  const sameItem = current?.maintenanceItemId.equals(itemId);
  if (!item || (!item.active && !sameItem)) {
    invalidField("maintenanceItemId", "Selecione um item ativo deste veículo.");
  }
  const history = (vehicle.serviceRecords ?? []).filter((record) => !record._id.equals(current?._id));
  history.push({
    serviceDate: item.initialReference.date,
    serviceKm: item.initialReference.km,
  });
  if (isOutOfOrder({ date: fields.serviceDate, km: fields.serviceKm }, history)) {
    invalidField("serviceKm", "A quilometragem do serviço não é compatível com as datas do histórico.");
  }
  return {
    ...fields,
    _id: current?._id ?? new Types.ObjectId(),
    maintenanceItemId: itemId,
    itemName: sameItem ? current.itemName : item.name,
  };
}

export async function list(ownerId, resource, query) {
  const { vehicleId } = parseWith(listInput, query);
  const vehicles = await repository.list(ownerId, resource, vehicleId);
  return vehicles.flatMap((vehicle) => (vehicle[resource] ?? []).map((entry) => serialize(entry, vehicle)));
}

export async function get(ownerId, resource, id) {
  const { vehicle, entry } = await getEntry(ownerId, resource, id);
  return serialize(entry, vehicle);
}

export async function createItem(ownerId, body) {
  const { vehicleId, ...fields } = parseWith(newItemInput, body);
  const vehicle = await getVehicle(ownerId, vehicleId);
  requireActive(vehicle);
  const entry = { ...fields, _id: new Types.ObjectId(), active: true };
  validateReference(vehicle, entry.initialReference, entry._id);
  await save(ownerId, vehicle, { maintenanceItems: [...(vehicle.maintenanceItems ?? []), entry] });
  return serialize(entry, vehicle);
}

export async function updateItem(ownerId, id, body) {
  const { vehicle, entry } = await getEntry(ownerId, items, id);
  requireActive(vehicle);
  const fields = parseWith(itemInput, body);
  validateReference(vehicle, fields.initialReference, entry._id);
  const updated = { ...entry, ...fields };
  await save(ownerId, vehicle, { maintenanceItems: replace(vehicle.maintenanceItems, entry, updated) });
  return serialize(updated, vehicle);
}

export async function removeItem(ownerId, id, body) {
  const { vehicle, entry } = await getEntry(ownerId, items, id);
  parseWith(removeItemInput, body);
  if (!entry.active) return serialize(entry, vehicle);
  requireActive(vehicle);
  const updated = { ...entry, active: false };
  await save(ownerId, vehicle, { maintenanceItems: replace(vehicle.maintenanceItems, entry, updated) });
  return serialize(updated, vehicle);
}

export async function createRecord(ownerId, body) {
  const { vehicleId, ...fields } = parseWith(newRecordInput, body);
  const vehicle = await getVehicle(ownerId, vehicleId);
  requireActive(vehicle);
  const entry = buildRecord(vehicle, fields);
  await save(ownerId, vehicle, {
    serviceRecords: [...(vehicle.serviceRecords ?? []), entry],
    currentKm: Math.max(vehicle.currentKm, entry.serviceKm),
  });
  return serialize(entry, vehicle);
}

export async function updateRecord(ownerId, id, body) {
  const { vehicle, entry } = await getEntry(ownerId, records, id);
  requireActive(vehicle);
  const updated = buildRecord(vehicle, parseWith(recordInput, body), entry);
  await save(ownerId, vehicle, {
    serviceRecords: replace(vehicle.serviceRecords, entry, updated),
    currentKm: Math.max(vehicle.currentKm, updated.serviceKm),
  });
  return serialize(updated, vehicle);
}

export async function removeRecord(ownerId, id) {
  const { vehicle, entry } = await getEntry(ownerId, records, id);
  requireActive(vehicle);
  await save(ownerId, vehicle, {
    serviceRecords: vehicle.serviceRecords.filter((record) => !record._id.equals(entry._id)),
  });
}
