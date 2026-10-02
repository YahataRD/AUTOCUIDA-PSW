import {
  isKm,
  isText,
  requireCondition,
  validateChronology,
  validateServiceFields,
} from "../data/validation.js";

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

export function autoCuidaReducer(data, action) {
  switch (action.type) {
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
    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
}
