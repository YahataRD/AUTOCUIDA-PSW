export const platePattern = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

export function normalizePlate(value) {
  return typeof value === "string"
    ? value.replace(/[\s-]/g, "").toUpperCase()
    : value;
}

export function getVehicleYear(date = new Date()) {
  return Number(new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo", year: "numeric",
  }).format(date));
}

export function isVehicleYear(value, currentYear = getVehicleYear()) {
  return Number.isInteger(value) && value >= 1886 && value <= currentYear + 1;
}

export function isVehicleKm(value) {
  return Number.isSafeInteger(value) && value >= 0;
}
