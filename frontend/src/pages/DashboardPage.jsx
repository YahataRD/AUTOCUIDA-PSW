import { useState } from "react";
import MaintenanceCard from "../components/MaintenanceCard";
import VehicleSummary from "../components/VehicleSummary";
import StateMessage from "../components/StateMessage";
import { calculateMaintenance } from "../utils/maintenance";

export default function DashboardPage({
  vehicle,
  maintenanceItems,
  onRegisterService,
}) {
  const [status, setStatus] = useState("all");
  const maintenanceWithStatus = maintenanceItems.map((item) => ({
    ...item,
    calculation: calculateMaintenance(item, vehicle.currentKm),
  }));
  const criticalAlerts = maintenanceWithStatus.filter(
    (item) => item.calculation.status === "overdue",
  ).length;
  const pendingAlerts = maintenanceWithStatus.filter(
    (item) => item.calculation.status !== "current",
  ).length;
  const visibleItems = maintenanceWithStatus.filter((item) =>
    status === "all" || item.calculation.status === status,
  );

  return (
    <main className="grid gap-[1.35rem] px-5 md:px-10">
      <VehicleSummary
        vehicle={vehicle}
        criticalAlerts={criticalAlerts}
        hasItems={maintenanceItems.length > 0}
      />

      <section aria-labelledby="maintenance-heading">
        <div className="section-heading">
          <h2 className="section-title" id="maintenance-heading">
            Monitoramento de desgaste
          </h2>
          <span className="alert-counter">
            {pendingAlerts} {pendingAlerts === 1 ? "alerta" : "alertas"}
          </span>
        </div>

        {maintenanceItems.length > 0 && (
          <div className="mb-4 grid gap-2 md:max-w-xs">
            <label className="form-label" htmlFor="maintenance-status">Filtrar por situação</label>
            <select id="maintenance-status" className="form-control" value={status}
              onChange={(event) => setStatus(event.target.value)}>
              <option value="all">Todos</option>
              <option value="current">Em dia</option>
              <option value="soon">Próximo</option>
              <option value="overdue">Vencido</option>
            </select>
            <p className="form-help mb-0" role="status">
              {visibleItems.length} de {maintenanceItems.length} itens exibidos
            </p>
          </div>
        )}
        <div className="grid gap-[0.8rem] md:grid-cols-2">
          {maintenanceItems.length === 0 && (
            <StateMessage title="Nenhum item de manutenção">
              Este veículo ainda não possui itens no plano de manutenção.
            </StateMessage>
          )}
          {maintenanceItems.length > 0 && visibleItems.length === 0 && (
            <StateMessage title="Nenhum item nesta situação"
              onAction={() => setStatus("all")} actionLabel="Mostrar todos">
              Escolha outra situação para consultar os itens do veículo.
            </StateMessage>
          )}
          {visibleItems.map((item) => (
            <MaintenanceCard
              key={item.id}
              item={item}
              currentKm={vehicle.currentKm}
              onRegisterService={onRegisterService}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
