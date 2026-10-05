import { useState } from "react";
import { formatCurrency } from "../utils/costs";
import { formatDate, formatKm } from "../utils/maintenance";
import StateMessage from "./StateMessage";
import ServiceEditForm from "./ServiceEditForm";

export default function ServiceHistory({ records, items = [], onDelete, onUpdate, isSaving }) {
  const [editingId, setEditingId] = useState(null);
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
        {records.length === 0 && (
          <StateMessage title="Nenhum serviço registrado">
            Os serviços deste veículo aparecerão aqui após o primeiro registro.
          </StateMessage>
        )}
        {orderedRecords.map((record) => (
          <article className="history-item" key={record.id}>
            {editingId === record.id && onUpdate ? (
              <ServiceEditForm record={record} items={items} isSaving={isSaving}
                onSave={(input) => onUpdate(record.id, input)}
                onCancel={() => setEditingId(null)} />
            ) : (
              <>
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
                <div>
                  <strong>{formatCurrency(record.amount)}</strong>
                  {onUpdate && (
                    <button className="secondary-button compact-button" type="button" onClick={() => setEditingId(record.id)}>
                      Editar
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="secondary-button compact-button"
                      type="button"
                      onClick={() => {
                        if (window.confirm("Excluir este serviço?")) onDelete(record.id);
                      }}
                    >
                      Excluir
                    </button>
                  )}
                </div>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
