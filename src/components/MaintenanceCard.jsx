import {
  calculateMaintenance,
  formatDate,
  formatKm,
} from "../utils/maintenance";

export default function MaintenanceCard({ item, currentKm, onRegisterService }) {
  const maintenance = calculateMaintenance(item, currentKm);
  const progressWidth = Math.min(maintenance.wear, 100);

  return (
    <article className="surface maintenance-card">
      <div className="maintenance-card-header">
        <div>
          <h3 className="maintenance-title">{item.name}</h3>
          <p className="maintenance-date">
            Último serviço: {formatDate(item.lastServiceDate)}
          </p>
        </div>
        <span className={`status-badge status-${maintenance.status}`}>
          {maintenance.label}
        </span>
      </div>

      <div className="maintenance-metrics">
        <span>
          <span>Troca prevista</span>
          <strong>{formatKm(maintenance.nextServiceKm)}</strong>
          <small className="maintenance-deadline">
            ou {formatDate(maintenance.nextServiceDate)}
          </small>
        </span>
        <strong className={`wear-percentage status-${maintenance.status}`}>
          {maintenance.wear}% de desgaste
        </strong>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-label={`Desgaste de ${item.name}`}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={progressWidth}
      >
        <div
          className={`progress-bar status-${maintenance.status}`}
          style={{ width: `${progressWidth}%` }}
        />
      </div>

      {maintenance.status !== "current" && (
        <button
          className={`card-action status-${maintenance.status}`}
          type="button"
          onClick={() => onRegisterService(item.id)}
        >
          Registrar manutenção
        </button>
      )}
    </article>
  );
}
