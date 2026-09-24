export function formatKm(value) {
  return `${new Intl.NumberFormat("pt-BR").format(value)} km`;
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

export function calculateMaintenance(item, currentKm, referenceDate = new Date()) {
  const nextServiceKm = item.lastServiceKm + item.intervalKm;
  const traveledSinceService = Math.max(0, currentKm - item.lastServiceKm);
  const kmWear = Math.round((traveledSinceService / item.intervalKm) * 100);
  const lastServiceDate = new Date(`${item.lastServiceDate}T00:00:00Z`);
  const nextServiceDate = new Date(lastServiceDate);
  nextServiceDate.setUTCMonth(
    nextServiceDate.getUTCMonth() + item.intervalMonths,
  );
  const millisecondsPerMonth = 1000 * 60 * 60 * 24 * 30.4375;
  const elapsedMonths = Math.max(
    0,
    (referenceDate.getTime() - lastServiceDate.getTime()) / millisecondsPerMonth,
  );
  const timeWear = Math.round((elapsedMonths / item.intervalMonths) * 100);
  const wear = Math.max(kmWear, timeWear);
  const calculation = {
    nextServiceKm,
    nextServiceDate: nextServiceDate.toISOString().slice(0, 10),
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
