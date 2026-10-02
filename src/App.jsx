import AppHeader from "./components/AppHeader";
import BottomNavigation from "./components/BottomNavigation";
import StateMessage from "./components/StateMessage";
import VehicleSelector from "./components/VehicleSelector";
import useAutoCuida from "./hooks/useAutoCuida";
import useHashNavigation from "./hooks/useHashNavigation";
import { selectVehicleData } from "./state/autoCuida";
import CostsPage from "./pages/CostsPage";
import DashboardPage from "./pages/DashboardPage";
import GaragePage from "./pages/GaragePage";
import ServicePage from "./pages/ServicePage";

export default function App() {
  const store = useAutoCuida();
  const route = useHashNavigation(store.data);
  const { vehicle, maintenanceItems, serviceRecords } = store.data
    ? selectVehicleData(store.data, route.vehicleId)
    : { vehicle: null, maintenanceItems: [], serviceRecords: [] };

  function renderActivePage() {
    if (store.status === "loading") {
      return (
        <main className="page-content" aria-busy="true">
          <StateMessage title="Carregando veículos">
            Aguarde enquanto os dados de demonstração são carregados.
          </StateMessage>
        </main>
      );
    }
    if (store.status === "error") {
      return (
        <main className="page-content">
          <StateMessage
            title="Dados indisponíveis"
            error
            onAction={store.retry}
            actionLabel="Tentar novamente"
          >
            {store.error}
          </StateMessage>
        </main>
      );
    }
    if (!vehicle) {
      return (
        <main className="page-content">
          <StateMessage
            title="Nenhum veículo ativo"
            onAction={store.retry}
            actionLabel="Recarregar dados"
          >
            Não há veículos ativos disponíveis para consultar.
          </StateMessage>
        </main>
      );
    }
    switch (route.page) {
      case "garage":
        return (
          <GaragePage
            key={vehicle.id}
            vehicle={vehicle}
            onUpdateOdometer={(km) => store.updateOdometer(vehicle.id, km)}
            onBackToDashboard={() => route.navigate("dashboard")}
          />
        );
      case "service":
        return (
          <ServicePage
            key={`${vehicle.id}:${route.itemId ?? ""}`}
            vehicle={vehicle}
            maintenanceItems={maintenanceItems}
            selectedMaintenanceItemId={route.itemId}
            onRegisterService={(service) =>
              store.registerService(vehicle.id, service)
            }
            onNavigate={route.navigate}
          />
        );
      case "costs":
        return <CostsPage serviceRecords={serviceRecords} />;
      default:
        return (
          <DashboardPage
            vehicle={vehicle}
            maintenanceItems={maintenanceItems}
            onRegisterService={(itemId) =>
              route.navigate("service", { itemId })
            }
          />
        );
    }
  }

  return (
    <div className="app-shell">
      <AppHeader page={route.page} currentKm={vehicle?.currentKm} />
      {vehicle && (
        <VehicleSelector
          vehicles={store.data.vehicles}
          vehicleId={vehicle.id}
          onSelect={(vehicleId) => route.navigate(route.page, { vehicleId })}
        />
      )}
      {renderActivePage()}
      <BottomNavigation activePage={route.page} onNavigate={route.navigate} />
    </div>
  );
}
