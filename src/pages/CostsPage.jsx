import CostSummary from "../components/CostSummary";
import ExpenseChart from "../components/ExpenseChart";
import ServiceHistory from "../components/ServiceHistory";
import {
  calculateCostSummary,
  formatCurrency,
  getLastSixMonths,
} from "../utils/costs";

export default function CostsPage({ serviceRecords }) {
  const summary = calculateCostSummary(serviceRecords);
  const monthlyExpenses = getLastSixMonths(serviceRecords);
  const lastSixMonthsTotal = monthlyExpenses.reduce(
    (sum, month) => sum + month.amount,
    0,
  );

  return (
    <main className="page-content">
      <CostSummary
        total={summary.total}
        monthlyAverage={lastSixMonthsTotal / 6}
        serviceCount={serviceRecords.length}
      />

      <ExpenseChart months={monthlyExpenses} />

      <section className="surface cost-breakdown" aria-labelledby="breakdown-title">
        <h2 className="section-title" id="breakdown-title">
          Distribuição por tipo
        </h2>
        <div className="breakdown-row">
          <span><i className="breakdown-dot preventive-dot" />Preventivas</span>
          <strong>{formatCurrency(summary.preventive)}</strong>
        </div>
        <div className="breakdown-row">
          <span><i className="breakdown-dot corrective-dot" />Corretivas</span>
          <strong>{formatCurrency(summary.corrective)}</strong>
        </div>
      </section>

      <ServiceHistory records={serviceRecords} />
    </main>
  );
}
