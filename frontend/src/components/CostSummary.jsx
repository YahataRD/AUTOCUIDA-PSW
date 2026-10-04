import { formatCurrency } from "../utils/costs";

export default function CostSummary({ total, monthlyAverage, serviceCount }) {
  return (
    <section className="cost-summary-grid" aria-label="Resumo dos custos">
      <article className="surface summary-card">
        <span>Gasto total</span>
        <strong>{formatCurrency(total)}</strong>
      </article>
      <article className="surface summary-card">
        <span>Média mensal</span>
        <strong className="summary-highlight">
          {formatCurrency(monthlyAverage)}
        </strong>
      </article>
      <article className="surface summary-card">
        <span>Serviços registrados</span>
        <strong>{serviceCount}</strong>
      </article>
    </section>
  );
}
