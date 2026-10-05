export function formatKm(value) {
  return `${new Intl.NumberFormat("pt-BR").format(value)} km`;
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

export function calculateMaintenance(
  item,
  currentKm,
  referenceDate = new Date(),
) {
  const nextServiceKm =
    item.intervalKm > 0 ? item.lastServiceKm + item.intervalKm : null;
  const traveledSinceService = Math.max(0, currentKm - item.lastServiceKm);
  const kmWear =
    item.intervalKm > 0
      ? (traveledSinceService / item.intervalKm) * 100
      : 0;
  const lastServiceDate = new Date(`${item.lastServiceDate}T00:00:00Z`);
  const nextServiceDate = new Date(lastServiceDate);
  nextServiceDate.setUTCMonth(
    nextServiceDate.getUTCMonth() + item.intervalMonths,
  );
  const millisecondsPerMonth = 1000 * 60 * 60 * 24 * 30.4375;
  const elapsedMonths = Math.max(
    0,
    (referenceDate.getTime() - lastServiceDate.getTime()) /
      millisecondsPerMonth,
  );
  const timeWear =
    item.intervalMonths > 0
      ? (elapsedMonths / item.intervalMonths) * 100
      : 0;
  const wear = Math.max(kmWear, timeWear);
  const calculation = {
    nextServiceKm,
    nextServiceDate:
      item.intervalMonths > 0
        ? nextServiceDate.toISOString().slice(0, 10)
        : null,
    kmWear,
    timeWear,
    wear,
  };

  if (wear >= 100) {
    return {
      ...calculation,
      label: "Vencido",
      status: "overdue",
    };
  }

  if (wear >= 80) {
    return {
      ...calculation,
      label: "Próximo",
      status: "soon",
    };
  }

  return {
    ...calculation,
    label: "Em dia",
    status: "current",
  };
}
