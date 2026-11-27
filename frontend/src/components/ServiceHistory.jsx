import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "../utils/costs";
import { formatDate, formatKm } from "../utils/maintenance";
import StateMessage from "./StateMessage";
import ServiceEditForm from "./ServiceEditForm";
import useActionFeedback from "../hooks/useActionFeedback";

export default function ServiceHistory({ records, items = [], onDelete, onUpdate, isSaving }) {
  const [editingId, setEditingId] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const dialog = useRef(null);
  const cancelButton = useRef(null);
  const historyTitle = useRef(null);
  const deletion = useActionFeedback();
  const busy = isSaving || deletion.pending;

  useEffect(() => {
    if (!recordToDelete) return;
    dialog.current.showModal();
    cancelButton.current.focus();
  }, [recordToDelete]);

  async function confirmDeletion() {
    if (busy || !recordToDelete || !dialog.current.open) return;
    dialog.current.close();
    // O botão de origem será desativado durante a exclusão e pode sair da lista.
    historyTitle.current.focus();
    await deletion.run(
      () => onDelete(recordToDelete.id),
      "Serviço excluído. Os custos e alertas foram recalculados.",
    );
  }
  const orderedRecords = [...records].sort((first, second) =>
    second.serviceDate.localeCompare(first.serviceDate),
  );

  return (
    <section aria-labelledby="history-title">
      <div className="section-heading">
        <h2 className="section-title" id="history-title" ref={historyTitle} tabIndex={-1}>
          Histórico de serviços
        </h2>
        <span className="history-count">{records.length} executados</span>
      </div>

      {deletion.error && <p className="field-error" role="alert">{deletion.error}</p>}
      {deletion.feedback && <p className="form-feedback" role="status">{deletion.feedback}</p>}
      <div className="surface overflow-hidden" aria-busy={busy}>
        {records.length === 0 && (
          <StateMessage title="Nenhum serviço registrado">
            Os serviços deste veículo aparecerão aqui após o primeiro registro.
          </StateMessage>
        )}
        {orderedRecords.map((record) => (
          <article className="history-item" key={record.id}>
            {editingId === record.id && onUpdate ? (
              <ServiceEditForm record={record} items={items} isSaving={busy}
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
                    <button className="secondary-button compact-button" type="button" disabled={busy} onClick={() => setEditingId(record.id)}>
                      Editar
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="secondary-button compact-button"
                      type="button"
                      disabled={busy}
                      onClick={() => setRecordToDelete(record)}
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
      <dialog
        ref={dialog}
        className="surface fixed inset-0 m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-md overflow-auto p-5 text-foreground backdrop:bg-black/65 sm:p-6"
        aria-labelledby="delete-service-title"
        aria-describedby="delete-service-description"
        onClose={() => setRecordToDelete(null)}
      >
        <h2 className="form-title" id="delete-service-title">Excluir serviço?</h2>
        <p className="mt-2 text-muted" id="delete-service-description">
          {recordToDelete && `O serviço de ${recordToDelete.itemName} de ${formatDate(recordToDelete.serviceDate)} será removido do histórico.`}
        </p>
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button
            ref={cancelButton}
            type="button"
            className="secondary-button"
            onClick={() => dialog.current.close()}
          >
            Cancelar
          </button>
          <button type="button" className="primary-button" disabled={busy} onClick={confirmDeletion}>
            Confirmar exclusão
          </button>
        </div>
      </dialog>
    </section>
  );
}
