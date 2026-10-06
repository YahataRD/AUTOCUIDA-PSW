import { useState } from "react";
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
  const [createdVehicleId, setCreatedVehicleId] = useState(null);
  const route = useHashNavigation(store.data);
  const { vehicle, maintenanceItems, serviceRecords } = store.data
    ? selectVehicleData(store.data, route.vehicleId)
    : { vehicle: null, maintenanceItems: [], serviceRecords: [] };

  function renderActivePage() {
    if (store.status === "loading") {
      return (
        <main className="grid gap-[1.35rem] px-5 md:px-10" aria-busy="true">
          <StateMessage title="Carregando veículos">
            Aguarde enquanto os dados são carregados.
          </StateMessage>
        </main>
      );
    }
    if (store.status === "error") {
      return (
        <main className="grid gap-[1.35rem] px-5 md:px-10">
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
    if (!vehicle && route.page !== "garage") {
      return (
        <main className="grid gap-[1.35rem] px-5 md:px-10">
          <StateMessage
            title="Nenhum veículo ativo"
            onAction={() => route.navigate("garage")}
            actionLabel="Ir para cadastro"
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
            key={vehicle?.id ?? "empty"}
            vehicle={vehicle}
            isSaving={store.isSaving}
            justRegistered={Boolean(vehicle && vehicle.id === createdVehicleId)}
            onRegisterVehicle={async (input) => {
              const created = await store.registerVehicle(input);
              setCreatedVehicleId(created.id);
              route.navigate("garage", { vehicleId: created.id });
            }}
            onUpdateOdometer={(km) => store.updateOdometer(vehicle.id, km)}
            onUpdateVehicle={store.updateVehicle}
            onDeactivateVehicle={async (id) => {
              await store.deactivateVehicle(id);
              route.navigate("garage");
            }}
            maintenanceItems={maintenanceItems}
            onCreateMaintenanceItem={store.registerMaintenanceItem}
            onUpdateMaintenanceItem={store.updateMaintenanceItem}
            onRemoveMaintenanceItem={store.removeMaintenanceItem}
            onBackToDashboard={() => route.navigate("dashboard")}
          />
        );
      case "service":
        return (
          <ServicePage
            key={`${vehicle.id}:${route.itemId ?? ""}`}
            vehicle={vehicle}
            isSaving={store.isSaving}
            maintenanceItems={maintenanceItems}
            selectedMaintenanceItemId={route.itemId}
            onRegisterService={(service) =>
              store.registerService(vehicle.id, service)
            }
            onNavigate={route.navigate}
          />
        );
      case "costs":
        return (
          <CostsPage
            key={vehicle.id}
            serviceRecords={serviceRecords}
            maintenanceItems={maintenanceItems}
            isSaving={store.isSaving}
            onDeleteService={(id) => store.removeService(id)}
            onUpdateService={store.updateService}
          />
        );
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
    <div className="mx-auto min-h-screen w-full max-w-6xl pb-[6.25rem] lg:pb-7">
      <AppHeader page={route.page} currentKm={vehicle?.currentKm} />
      {store.isDemo && (
        <p className="surface p-6" role="status">
          Demonstração: alterações ficam apenas nesta sessão e são descartadas
          ao recarregar.
        </p>
      )}
      {store.refreshError && (
        <StateMessage
          title="Não foi possível atualizar os dados"
          error
          onAction={store.retry}
          actionLabel="Tentar novamente"
        >
          Os dados exibidos podem estar desatualizados. {store.error}
        </StateMessage>
      )}
      {store.isSaving && (
        <p className="p-6" role="status">
          Salvando alterações…
        </p>
      )}
      {vehicle && (
        <VehicleSelector
          disabled={store.isSaving}
          vehicles={store.data.vehicles}
          vehicleId={vehicle.id}
          onSelect={(vehicleId) => route.navigate(route.page, { vehicleId })}
        />
      )}
      {renderActivePage()}
      <BottomNavigation
        activePage={route.page}
        onNavigate={route.navigate}
        disabled={store.isSaving}
      />
    </div>
  );
}
