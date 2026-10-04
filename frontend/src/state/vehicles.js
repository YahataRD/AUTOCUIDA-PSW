import { requireCondition } from "../data/validation.js";
import { createVehicleSchema, normalizePlate } from "../data/formSchemas.js";
export { normalizePlate } from "../data/formSchemas.js";

export function createVehicle(data, input, { id, currentYear }) {
  const result = createVehicleSchema(currentYear).safeParse(input);
  const errors = result.success
    ? {}
    : Object.fromEntries(
        result.error.issues.map((issue) => [issue.path[0], issue.message]),
      );
  const plate = normalizePlate(input.plate);
  if (
    !errors.plate &&
    data.vehicles.some((vehicle) => normalizePlate(vehicle.plate) === plate)
  ) {
    errors.plate = "Já existe um veículo com esta placa.";
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
  return { id, ...result.data, active: true };
}
