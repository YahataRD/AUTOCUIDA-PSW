import { isKm, requireCondition } from "../data/validation.js";

export function normalizePlate(plate) {
  return String(plate ?? "")
    .replace(/[\s-]/g, "")
    .toUpperCase();
}

export function createVehicle(data, input, { id, currentYear }) {
  const plate = normalizePlate(input.plate);
  const model = String(input.model ?? "").trim();
  const year = Number(input.year);
  const currentKm = Number(input.currentKm);
  const errors = {};
  if (!/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(plate)) {
    errors.plate = "Informe uma placa válida, como ABC-1234 ou ABC1D23.";
  } else if (
    data.vehicles.some((vehicle) => normalizePlate(vehicle.plate) === plate)
  ) {
    errors.plate = "Já existe um veículo com esta placa.";
  }
  if (!model) errors.model = "Informe o modelo do veículo.";
  if (
    !String(input.year ?? "").trim() ||
    !Number.isInteger(year) ||
    year < 1886 ||
    year > currentYear + 1
  ) {
    errors.year = `Informe um ano entre 1886 e ${currentYear + 1}.`;
  }
  if (!String(input.currentKm ?? "").trim() || !isKm(currentKm)) {
    errors.currentKm =
      "Informe uma quilometragem inteira, igual ou maior que zero.";
  }
  if (Object.keys(errors).length) {
    const error = new Error("Confira os campos do veículo.");
    error.fields = errors;
    throw error;
  }
  requireCondition(
    typeof id === "string" &&
      id.trim() &&
      !data.vehicles.some((vehicle) => vehicle.id === id),
    "Identificador de veículo inválido.",
  );
  return { id, plate, model, year, currentKm, active: true };
}
