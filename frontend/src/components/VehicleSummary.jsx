export default function VehicleSummary({
  vehicle,
  criticalAlerts,
  hasItems = true,
}) {
  const hasCriticalAlerts = criticalAlerts > 0;

  return (
    <section className="surface vehicle-card" aria-label="Resumo do veículo">
      <div>
        <h2 className="vehicle-model">{vehicle.model}</h2>
        <span className="vehicle-plate">{vehicle.plate}</span>
      </div>

      <p className="vehicle-status">
        <span>Status</span>
        <strong className={hasCriticalAlerts ? "" : "status-ok"}>
          {!hasItems
            ? "Sem itens no plano"
            : hasCriticalAlerts
              ? `${criticalAlerts} ${criticalAlerts === 1 ? "alerta crítico" : "alertas críticos"}`
              : "Tudo em dia"}
        </strong>
      </p>
    </section>
  );
}
