import { formatCurrency } from "../utils/costs";

export default function ExpenseChart({ months }) {
  const maximumAmount = Math.max(...months.map((month) => month.amount), 1);

  return (
    <section className="surface p-[1.1rem] md:p-[1.4rem]" aria-labelledby="chart-title">
      <div className="section-heading">
        <h2 className="section-title" id="chart-title">
          Gastos nos últimos 6 meses
        </h2>
      </div>

      <div className="grid h-54 grid-cols-6 items-end gap-[0.45rem] border-b border-line pt-[0.7rem]" role="list" aria-label="Gastos mensais">
        {months.map((month) => {
          const height =
            month.amount === 0 ? 0 : Math.max((month.amount / maximumAmount) * 100, 8);

          return (
            <div
              className="grid h-full min-w-0 grid-rows-[1.8rem_1fr_auto] items-end gap-[0.35rem] text-center"
              key={month.key}
              role="listitem"
              aria-label={`${month.label}: ${formatCurrency(month.amount)}`}
            >
              <span className="chart-value">
                {month.amount > 0 ? formatCurrency(month.amount) : "—"}
              </span>
              <div className="chart-track" aria-hidden="true">
                <div className="chart-bar" style={{ height: `${height}%` }} />
              </div>
              <span className="chart-label">{month.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
