import { formatCurrency } from "../utils/costs";

export default function ExpenseChart({ months }) {
  const maximumAmount = Math.max(...months.map((month) => month.amount), 1);

  return (
    <section className="surface chart-card" aria-labelledby="chart-title">
      <div className="section-heading">
        <h2 className="section-title" id="chart-title">
          Gastos nos últimos 6 meses
        </h2>
      </div>

      <div className="cost-chart" role="list" aria-label="Gastos mensais">
        {months.map((month) => {
          const height =
            month.amount === 0 ? 0 : Math.max((month.amount / maximumAmount) * 100, 8);

          return (
            <div
              className="chart-column"
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
