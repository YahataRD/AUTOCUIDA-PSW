export function formatKm(value) {
  return `${new Intl.NumberFormat("pt-BR").format(value)} km`;
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

export function formatWear(value) {
  // Truncar a exibição evita mostrar 80% ou 100% antes de atingir o limite.
  return `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(
    Math.floor(value * 10) / 10,
  )}%`;
}

function addCalendarMonths(date, months) {
  const result = new Date(date);
  const originalDay = result.getUTCDate();
  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + months);
  const monthEnd = new Date(result);
  monthEnd.setUTCMonth(monthEnd.getUTCMonth() + 1, 0);
  result.setUTCDate(Math.min(originalDay, monthEnd.getUTCDate()));
  return result;
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
  const nextServiceDate = addCalendarMonths(lastServiceDate, item.intervalMonths);
  // Datas de manutenção representam dias, não horários. Usa o dia local do
  // usuário em uma escala UTC para evitar variações de fuso e horário de verão.
  const today = Date.UTC(
    referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate(),
  );
  const elapsedTime = Math.max(0, today - lastServiceDate.getTime());
  const timeWear =
    item.intervalMonths > 0
      ? (elapsedTime / (nextServiceDate.getTime() - lastServiceDate.getTime())) * 100
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
