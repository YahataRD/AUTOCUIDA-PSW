import { formatCurrency } from "../utils/costs";

export default function CostSummary({ total, monthlyAverage, serviceCount }) {
  return (
    <section className="grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3" aria-label="Resumo dos custos">
      <article className="surface summary-card last:col-span-full md:last:col-span-1">
        <span>Gasto total</span>
        <strong>{formatCurrency(total)}</strong>
      </article>
      <article className="surface summary-card last:col-span-full md:last:col-span-1">
        <span>Média mensal</span>
        <strong className="summary-highlight">
          {formatCurrency(monthlyAverage)}
        </strong>
      </article>
      <article className="surface summary-card last:col-span-full md:last:col-span-1">
        <span>Serviços registrados</span>
        <strong>{serviceCount}</strong>
      </article>
    </section>
  );
}
