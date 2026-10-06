import { z } from "zod";
import { getToday, isDate, isKm } from "./validation.js";

export function normalizePlate(plate) {
  return String(plate ?? "")
    .replace(/[\s-]/g, "")
    .toUpperCase();
}

// Não usar coerce.number diretamente: um campo vazio não significa zero.
function numericInput(message, check) {
  return z
    .union([z.string(), z.number()], { error: message })
    .refine((value) => String(value).trim() !== "", message)
    .transform(Number)
    .refine(check, message);
}

const kmInput = () =>
  numericInput(
    "Informe uma quilometragem inteira, igual ou maior que zero.",
    isKm,
  );

export function createVehicleSchema(currentYear = new Date().getFullYear()) {
  return z.object({
    plate: z
      .string()
      .transform(normalizePlate)
      .pipe(
        z
          .string()
          .regex(
            /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/,
            "Informe uma placa válida, como ABC-1234 ou ABC1D23.",
          ),
      ),
    model: z.string().trim().min(1, "Informe o modelo do veículo."),
    year: numericInput(
      `Informe um ano entre 1886 e ${currentYear + 1}.`,
      (year) =>
        Number.isInteger(year) && year >= 1886 && year <= currentYear + 1,
    ),
    currentKm: kmInput(),
  });
}

export function createOdometerSchema(currentKm) {
  return z.object({
    currentKm: kmInput().refine(
      (km) => km > currentKm,
      "Informe uma quilometragem maior que a leitura atual.",
    ),
  });
}

export function createServiceSchema(items, today = getToday()) {
  return z.object({
    maintenanceType: z.enum(["preventive", "corrective"], {
      error: "Selecione um tipo de manutenção válido.",
    }),
    maintenanceItemId: z
      .string()
      .refine(
        (id) => items.some((item) => item.id === id),
        "Selecione um item de manutenção deste veículo.",
      ),
    serviceKm: kmInput(),
    serviceDate: z
      .string()
      .refine(isDate, "Informe uma data de serviço válida.")
      .refine(
        (date) => date <= today,
        "A data do serviço não pode estar no futuro.",
      ),
    amount: z
      .string()
      .trim()
      .min(1, "Informe um valor maior que zero.")
      .transform((value) =>
        Number(
          value.includes(",")
            ? value.replace(/\./g, "").replace(",", ".")
            : value,
        ),
      )
      .refine(
        (value) => Number.isFinite(value) && value > 0,
        "Informe um valor maior que zero.",
      ),
    shop: z
      .string()
      .trim()
      .min(1, "Informe a oficina ou o mecânico responsável."),
  });
}

// Nos intervalos opcionais, vazio significa que esse critério está desativado.
function intervalInput(message) {
  return z.preprocess(
    (value) => typeof value === "string" && value.trim() === "" ? 0 : value,
    numericInput(message, isKm),
  );
}

export function createMaintenanceItemSchema(today = getToday()) {
  return z.object({
    name: z.string().trim().min(1, "Informe o nome do item."),
    intervalKm: intervalInput("Informe um intervalo em km válido."),
    intervalMonths: intervalInput(
      "Informe um intervalo em meses válido.",
    ),
    initialDate: z.string().refine(isDate, "Informe uma data válida.")
      .refine((date) => date <= today, "A data de referência não pode estar no futuro."),
    initialKm: kmInput(),
  }).refine(
    (value) => value.intervalKm > 0 || value.intervalMonths > 0,
    { message: "Informe um intervalo em km ou meses.", path: ["intervalKm"] },
  );
}
