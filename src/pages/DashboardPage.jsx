import MaintenanceCard from "../components/MaintenanceCard";
import VehicleSummary from "../components/VehicleSummary";
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
    <main className="page-content">
      <VehicleSummary vehicle={vehicle} criticalAlerts={criticalAlerts} />

      <section aria-labelledby="maintenance-heading">
        <div className="section-heading">
          <h2 className="section-title" id="maintenance-heading">
            Monitoramento de desgaste
          </h2>
          <span className="alert-counter">
            {pendingAlerts} {pendingAlerts === 1 ? "alerta" : "alertas"}
          </span>
        </div>

        <div className="maintenance-list">
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
