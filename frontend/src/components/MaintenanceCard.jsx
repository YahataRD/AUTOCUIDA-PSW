import {
  calculateMaintenance,
  formatDate,
  formatKm,
  formatWear,
} from "../utils/maintenance";

export default function MaintenanceCard({
  item,
  currentKm,
  onRegisterService,
}) {
  const maintenance = calculateMaintenance(item, currentKm);
  const progressWidth = Math.min(maintenance.wear, 100);

  return (
    <article className="surface p-4 md:p-[1.4rem]">
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
          {maintenance.nextServiceKm !== null && (
            <strong>{formatKm(maintenance.nextServiceKm)}</strong>
          )}
          {maintenance.nextServiceDate !== null && (
            <small className="maintenance-deadline">
              {maintenance.nextServiceKm !== null ? "ou " : "Até "}
              {formatDate(maintenance.nextServiceDate)}
            </small>
          )}
        </span>
        <strong className={`wear-percentage status-${maintenance.status}`}>
          {formatWear(maintenance.wear)} de desgaste
        </strong>
      </div>

      <div className="progress-track">
        <progress
          className={`progress-bar status-${maintenance.status}`}
          max={100}
          value={progressWidth}
          aria-label={`Desgaste de ${item.name}`}
          aria-valuetext={`${formatWear(maintenance.wear)} de desgaste`}
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
