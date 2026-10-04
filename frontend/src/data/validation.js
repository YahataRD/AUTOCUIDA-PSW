export function isDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false;
  const date = new Date(`${value}T00:00:00Z`);
  return (
    Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

export function getToday() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

export function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

export const isKm = (value) => Number.isSafeInteger(value) && value >= 0;
export const isText = (value) =>
  typeof value === "string" && value.trim().length > 0;

export function validateServiceFields(record) {
  requireCondition(
    isDate(record.serviceDate),
    "Informe uma data de serviço válida.",
  );
  requireCondition(
    isKm(record.serviceKm),
    "Informe uma quilometragem inteira válida.",
  );
  requireCondition(
    Number.isFinite(record.amount) && record.amount > 0,
    "Informe um valor maior que zero.",
  );
  requireCondition(
    isText(record.shop),
    "Informe a oficina ou o mecânico responsável.",
  );
  requireCondition(
    ["preventive", "corrective"].includes(record.maintenanceType),
    "Selecione um tipo de manutenção válido.",
  );
}

// Data e quilometragem devem avançar juntas. No mesmo dia, a km desempata.
export function validateChronology(reference, records) {
  const points = [
    reference,
    ...records.map((record) => ({
      date: record.serviceDate,
      km: record.serviceKm,
    })),
  ].sort((a, b) => a.date.localeCompare(b.date) || a.km - b.km);
  requireCondition(
    points.every(
      (point, index) => index === 0 || point.km >= points[index - 1].km,
    ),
    "A quilometragem do serviço é incompatível com as datas do histórico.",
  );
}

export function validateData(data) {
  requireCondition(
    data && typeof data === "object",
    "O arquivo de dados é inválido.",
  );
  for (const key of ["vehicles", "maintenanceItems", "serviceRecords"]) {
    requireCondition(
      Array.isArray(data[key]),
      `A lista ${key} não foi encontrada.`,
    );
    const ids = new Set();
    for (const entry of data[key]) {
      requireCondition(
        entry && isText(entry.id) && !ids.has(entry.id),
        `Há identificadores inválidos ou repetidos em ${key}.`,
      );
      ids.add(entry.id);
    }
  }
  const vehicles = new Map(
    data.vehicles.map((vehicle) => [vehicle.id, vehicle]),
  );
  const items = new Map(data.maintenanceItems.map((item) => [item.id, item]));
  const plates = new Set();
  for (const vehicle of data.vehicles) {
    requireCondition(
      isText(vehicle.model) && isText(vehicle.plate),
      "Há um veículo sem modelo ou placa.",
    );
    const plate = vehicle.plate.replace(/[^a-z0-9]/gi, "").toUpperCase();
    requireCondition(
      plate.length > 0 && !plates.has(plate),
      "Há placas repetidas no arquivo de dados.",
    );
    plates.add(plate);
    requireCondition(
      Number.isInteger(vehicle.year) &&
        vehicle.year > 0 &&
        isKm(vehicle.currentKm) &&
        typeof vehicle.active === "boolean",
      "Há dados inválidos em um veículo.",
    );
  }
  for (const item of data.maintenanceItems) {
    const vehicle = vehicles.get(item.vehicleId);
    requireCondition(
      vehicle && isText(item.name) && typeof item.active === "boolean",
      "Há um item sem veículo ou dados válidos.",
    );
    requireCondition(
      isKm(item.intervalKm) &&
        isKm(item.intervalMonths) &&
        (item.intervalKm > 0 || item.intervalMonths > 0),
      "Cada item deve ter ao menos um intervalo positivo.",
    );
    requireCondition(
      item.initialReference &&
        isDate(item.initialReference.date) &&
        isKm(item.initialReference.km) &&
        item.initialReference.km <= vehicle.currentKm,
      "A referência inicial de um item é inválida.",
    );
  }
  for (const record of data.serviceRecords) {
    const vehicle = vehicles.get(record.vehicleId);
    const item = items.get(record.maintenanceItemId);
    requireCondition(
      vehicle && item && item.vehicleId === vehicle.id,
      "Há um serviço vinculado ao veículo ou item incorreto.",
    );
    requireCondition(
      isText(record.itemName),
      "Há um serviço sem nome do item.",
    );
    validateServiceFields(record);
    requireCondition(
      record.serviceKm <= vehicle.currentKm,
      "Há um serviço com quilometragem maior que o odômetro.",
    );
  }
  for (const item of data.maintenanceItems) {
    validateChronology(
      item.initialReference,
      data.serviceRecords.filter(
        (record) => record.maintenanceItemId === item.id,
      ),
    );
  }
  return data;
}
