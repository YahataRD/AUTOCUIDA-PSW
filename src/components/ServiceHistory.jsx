import { formatCurrency } from "../utils/costs";
import { formatDate, formatKm } from "../utils/maintenance";

export default function ServiceHistory({ records }) {
  const orderedRecords = [...records].sort((first, second) =>
    second.serviceDate.localeCompare(first.serviceDate),
  );

  return (
    <section aria-labelledby="history-title">
      <div className="section-heading">
        <h2 className="section-title" id="history-title">
          Histórico de serviços
        </h2>
        <span className="history-count">{records.length} executados</span>
      </div>

      <div className="surface history-list">
        {orderedRecords.map((record) => (
          <article className="history-item" key={record.id}>
            <div>
              <div className="history-title-row">
                <h3>{record.itemName}</h3>
                <span className={`type-label type-${record.maintenanceType}`}>
                  {record.maintenanceType === "preventive"
                    ? "Preventiva"
                    : "Corretiva"}
                </span>
              </div>
              <p>
                {formatDate(record.serviceDate)} · {record.shop}
              </p>
              <small>{formatKm(record.serviceKm)}</small>
            </div>
            <strong>{formatCurrency(record.amount)}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
