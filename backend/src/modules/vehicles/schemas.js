import { z } from "zod";
import { getVehicleYear, isVehicleKm, isVehicleYear, normalizePlate, platePattern } from "./rules.js";

const kmMessage = "Informe uma quilometragem inteira, igual ou maior que zero.";
const kmSchema = () => z.number({ error: kmMessage }).refine(isVehicleKm, kmMessage);

// O JSON da API recebe números. A conversão de campos de formulário pertence
// ao frontend: string vazia, null e booleanos não podem virar km zero aqui.
export function createVehicleSchema(currentYear = getVehicleYear()) {
  const yearMessage = `Informe um ano entre 1886 e ${currentYear + 1}.`;
  return z.strictObject({
    plate: z.string({ error: "Informe a placa do veículo." })
      .transform(normalizePlate)
      .pipe(z.string().regex(platePattern, "Informe uma placa válida, como ABC-1234 ou ABC1D23.")),
    model: z.string({ error: "Informe o modelo do veículo." })
      .trim().min(1, "Informe o modelo do veículo."),
    year: z.number({ error: yearMessage })
      .refine((value) => isVehicleYear(value, currentYear), yearMessage),
    currentKm: kmSchema(),
  });
}

// PUT aceita a leitura atual, mas nunca sua redução. Esta é uma validação
// prévia: a futura escrita deverá garantir a mesma condição atomicamente.
export function createVehicleUpdateSchema(currentKm, currentYear = getVehicleYear()) {
  return createVehicleSchema(currentYear).extend({
    currentKm: kmSchema().refine((value) => value >= currentKm,
      "O odômetro não pode ser menor que a leitura atual."),
  });
}

// PATCH do odômetro exige aumento; inativação usa um schema independente.
export function createOdometerSchema(currentKm) {
  return z.strictObject({
    currentKm: kmSchema().refine((value) => value > currentKm,
      "Informe uma quilometragem maior que a leitura atual."),
  });
}

export const deactivateVehicleSchema = z.strictObject({ active: z.literal(false) });
