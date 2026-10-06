import MaintenanceCard from "../components/MaintenanceCard";
import VehicleSummary from "../components/VehicleSummary";
import StateMessage from "../components/StateMessage";
import { calculateMaintenance } from "../utils/maintenance";

export default function DashboardPage({
  vehicle,
  maintenanceItems,
  onRegisterService,
}) {
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

        <div className="grid gap-[0.8rem] md:grid-cols-2">
          {maintenanceItems.length === 0 && (
            <StateMessage title="Nenhum item de manutenção">
              Este veículo ainda não possui itens no plano de manutenção.
            </StateMessage>
          )}
          {maintenanceItems.map((item) => (
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
