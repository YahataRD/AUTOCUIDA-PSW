export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function calculateCostSummary(records) {
  const total = records.reduce((sum, record) => sum + record.amount, 0);
  const preventive = records
    .filter((record) => record.maintenanceType === "preventive")
    .reduce((sum, record) => sum + record.amount, 0);
  const corrective = total - preventive;

  return { total, preventive, corrective };
}

export function getLastSixMonths(records, referenceDate = new Date()) {
  const monthFormatter = new Intl.DateTimeFormat("pt-BR", { month: "short" });
  const months = [];

  for (let offset = 5; offset >= 0; offset -= 1) {
    const date = new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth() - offset,
      1,
    );
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const amount = records
      .filter((record) => record.serviceDate.startsWith(key))
      .reduce((sum, record) => sum + record.amount, 0);

    months.push({
      key,
      label: monthFormatter.format(date).replace(".", ""),
      amount,
    });
  }

  return months;
}
