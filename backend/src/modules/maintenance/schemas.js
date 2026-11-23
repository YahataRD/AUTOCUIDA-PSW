import { z } from "zod";
import { isVehicleKm } from "../vehicles/rules.js";

const saoPauloDate = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit",
});
const date = z.iso.date({ error: "Informe uma data válida no formato AAAA-MM-DD." })
  .refine((value) => value <= saoPauloDate.format(new Date()), "A data não pode estar no futuro.");
const km = z.number().refine(isVehicleKm, "Informe um número inteiro não negativo.");
const requiredText = (message) => z.string({ error: message }).trim().min(1, message);

export const objectId = z.string().regex(/^[0-9a-f]{24}$/i, "Informe um identificador válido.").toLowerCase();
export const idInput = z.strictObject({ id: objectId });
export const listInput = z.strictObject({ vehicleId: objectId.optional() });

export const itemInput = z.strictObject({
  name: requiredText("Informe o nome do item."),
  intervalKm: km,
  intervalMonths: km,
  initialReference: z.strictObject({ date, km }),
}).refine((item) => item.intervalKm > 0 || item.intervalMonths > 0, {
  path: ["intervalKm"], error: "Informe um intervalo em km ou meses.",
});

export const removeItemInput = z.strictObject({ active: z.literal(false) });

export const recordInput = z.strictObject({
  maintenanceItemId: objectId,
  maintenanceType: z.enum(["preventive", "corrective"]),
  serviceDate: date,
  serviceKm: km,
  amount: z.number().positive("Informe um valor maior que zero."),
  shop: requiredText("Informe a oficina ou o mecânico responsável."),
});

export const newItemInput = itemInput.safeExtend({ vehicleId: objectId });
export const newRecordInput = recordInput.extend({ vehicleId: objectId });
