import { createVehicle } from "./vehicles.js";
import {
  isKm,
  isText,
  requireCondition,
  validateChronology,
  validateServiceFields,
} from "../data/validation.js";
import { createMaintenanceItemSchema } from "../data/formSchemas.js";

export function selectVehicleData(data, vehicleId) {
  const vehicle =
    data.vehicles.find((entry) => entry.id === vehicleId && entry.active) ??
    null;
  if (!vehicle)
    return { vehicle: null, maintenanceItems: [], serviceRecords: [] };
  const serviceRecords = data.serviceRecords.filter(
    (record) => record.vehicleId === vehicle.id,
  );
  const maintenanceItems = data.maintenanceItems
    .filter((item) => item.vehicleId === vehicle.id && item.active)
    .map((item) => {
      const reference = getMaintenanceReference(item, serviceRecords);
      return {
        ...item,
        lastServiceDate: reference.date,
        lastServiceKm: reference.km,
      };
    });
  return { vehicle, maintenanceItems, serviceRecords };
}

// A referência inicial nunca é sobrescrita: editar/excluir registros futuramente
// exige apenas mudar o histórico; a consulta deriva novamente a referência.
export function getMaintenanceReference(item, records) {
  return records
    .filter(
      (record) =>
        record.vehicleId === item.vehicleId &&
        record.maintenanceItemId === item.id,
    )
    .reduce((latest, record) => {
      if (
        record.serviceDate > latest.date ||
        (record.serviceDate === latest.date && record.serviceKm > latest.km)
      ) {
        return { date: record.serviceDate, km: record.serviceKm };
      }
      return latest;
    }, item.initialReference);
}

export function validateOdometer(data, vehicleId, currentKm) {
  const vehicle = data.vehicles.find(
    (entry) => entry.id === vehicleId && entry.active,
  );
  requireCondition(vehicle, "Selecione um veículo ativo.");
  requireCondition(
    isKm(currentKm) && currentKm > vehicle.currentKm,
    "Informe uma quilometragem inteira maior que a leitura atual.",
  );
}

export function createServiceRecord(data, vehicleId, input, { id, today }) {
  const vehicle = data.vehicles.find(
    (entry) => entry.id === vehicleId && entry.active,
  );
  const item = data.maintenanceItems.find(
    (entry) =>
      entry.id === input.maintenanceItemId &&
      entry.vehicleId === vehicleId &&
      entry.active,
  );
  requireCondition(vehicle && item, "Selecione um item ativo deste veículo.");
  requireCondition(
    isText(id) && !data.serviceRecords.some((record) => record.id === id),
    "O identificador do serviço já foi utilizado.",
  );
  validateServiceFields(input);
  requireCondition(
    input.serviceDate <= today,
    "A data do serviço não pode estar no futuro.",
  );
  const record = {
    id,
    vehicleId,
    maintenanceItemId: item.id,
    itemName: item.name,
    maintenanceType: input.maintenanceType,
    serviceKm: input.serviceKm,
    serviceDate: input.serviceDate,
    amount: input.amount,
    shop: input.shop.trim(),
  };
  validateChronology(item.initialReference, [
    ...data.serviceRecords.filter((entry) => entry.vehicleId === vehicleId),
    record,
  ]);
  return record;
}

export function createMaintenanceItem(data, vehicleId, input, { id }) {
  const vehicle = data.vehicles.find((entry) => entry.id === vehicleId && entry.active);
  requireCondition(vehicle, "Selecione um veículo ativo.");
  const parsed = createMaintenanceItemSchema().safeParse({
    ...input,
    initialDate: input.initialDate ?? input.initialReference?.date,
    initialKm: input.initialKm ?? input.initialReference?.km,
  });
  requireCondition(
    parsed.success,
    parsed.success ? "Item inválido." : parsed.error.issues[0]?.message || "Item inválido.",
  );
  requireCondition(parsed.data.initialKm <= vehicle.currentKm, "A referência não pode superar o odômetro.");
  return {
    id, vehicleId, name: parsed.data.name, intervalKm: parsed.data.intervalKm,
    intervalMonths: parsed.data.intervalMonths, active: true,
    initialReference: { date: parsed.data.initialDate, km: parsed.data.initialKm },
  };
}

export function updateMaintenanceItem(data, itemId, input) {
  const current = data.maintenanceItems.find((item) => item.id === itemId);
  requireCondition(current, "Item de manutenção não encontrado.");
  const item = createMaintenanceItem(data, current.vehicleId, input, { id: itemId });
  validateChronology(
    item.initialReference,
    data.serviceRecords.filter((record) => record.maintenanceItemId === itemId),
  );
  return { ...item, active: current.active };
}

export function updateServiceRecord(data, serviceId, input, { today }) {
  const current = data.serviceRecords.find((record) => record.id === serviceId);
  requireCondition(current, "Serviço não encontrado.");
  const records = data.serviceRecords.filter((record) => record.id !== serviceId);
  const next = createServiceRecord(
    { ...data, serviceRecords: records },
    current.vehicleId,
    input,
    { id: serviceId, today },
  );
  validateChronology(
    data.maintenanceItems.find((item) => item.id === next.maintenanceItemId).initialReference,
    [...records.filter((record) => record.maintenanceItemId === next.maintenanceItemId), next],
  );
  return next;
}

export function autoCuidaReducer(data, action) {
  switch (action.type) {
    case "vehicleRegistered": {
      const vehicle = createVehicle(data, action.vehicle, {
        id: action.vehicle.id,
        currentYear: action.currentYear,
      });
      return { ...data, vehicles: [...data.vehicles, vehicle] };
    }
    case "odometerUpdated":
      validateOdometer(data, action.vehicleId, action.currentKm);
      return {
        ...data,
        vehicles: data.vehicles.map((vehicle) =>
          vehicle.id === action.vehicleId
            ? { ...vehicle, currentKm: action.currentKm }
            : vehicle,
        ),
      };
    case "serviceRegistered": {
      const record = createServiceRecord(
        data,
        action.record.vehicleId,
        action.record,
        { id: action.record.id, today: action.today },
      );
      return {
        ...data,
        vehicles: data.vehicles.map((vehicle) =>
          vehicle.id === record.vehicleId
            ? {
                ...vehicle,
                currentKm: Math.max(vehicle.currentKm, record.serviceKm),
              }
            : vehicle,
        ),
        serviceRecords: [record, ...data.serviceRecords],
      };
    }
    case "vehicleUpdated":
      return { ...data, vehicles: data.vehicles.map((vehicle) => vehicle.id === action.vehicleId ? action.vehicle : vehicle) };
    case "vehicleDeactivated":
      return { ...data, vehicles: data.vehicles.map((vehicle) => vehicle.id === action.vehicleId ? { ...vehicle, active: false } : vehicle) };
    case "maintenanceItemRegistered":
      return { ...data, maintenanceItems: [...data.maintenanceItems, action.item] };
    case "maintenanceItemUpdated":
      return { ...data, maintenanceItems: data.maintenanceItems.map((item) => item.id === action.item.id ? action.item : item) };
    case "maintenanceItemRemoved":
      return { ...data, maintenanceItems: data.maintenanceItems.map((item) => item.id === action.itemId ? { ...item, active: false } : item) };
    case "serviceUpdated":
      return {
        ...data,
        vehicles: data.vehicles.map((vehicle) =>
          vehicle.id === action.record.vehicleId
            ? { ...vehicle, currentKm: Math.max(vehicle.currentKm, action.record.serviceKm) }
            : vehicle,
        ),
        serviceRecords: data.serviceRecords.map((record) =>
          record.id === action.record.id ? action.record : record,
        ),
      };
    case "serviceRemoved":
      return { ...data, serviceRecords: data.serviceRecords.filter((record) => record.id !== action.serviceId) };
    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
}
