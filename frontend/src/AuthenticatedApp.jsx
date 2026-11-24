import { useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppHeader from "./components/AppHeader";
import StateMessage from "./components/StateMessage";
import VehicleSelector from "./components/VehicleSelector";
import { createAuthClient } from "./data/authClient.js";
import { resetSessionData } from "./data/queries.js";
import { createVehicleApi } from "./data/vehicleApi.js";
import useAutoCuida from "./hooks/useAutoCuida";
import AuthPage from "./pages/AuthPage";
import GaragePage from "./pages/GaragePage";
import BottomNavigation from "./components/BottomNavigation";
import useHashNavigation from "./hooks/useHashNavigation";
import { selectVehicleData } from "./state/autoCuida";
import DashboardPage from "./pages/DashboardPage";
import ServicePage from "./pages/ServicePage";
import CostsPage from "./pages/CostsPage";

const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:3001";
const authApi = createAuthClient(baseUrl);

export default function AuthenticatedApp() {
  const current = useRef(null);
  const [session, setSession] = useState(null);
  const [notice, setNotice] = useState("");

  function endSession(ending, message) {
    // Uma resposta atrasada ou expirada só pode encerrar a própria sessão.
    if (current.current !== ending) return;
    current.current = null;
    setNotice(message);
    setSession(null);
    void resetSessionData(ending.client);
  }

  async function login(credentials) {
    const { token, user } = await authApi.login(credentials);
    const next = { user, client: new QueryClient() };
    next.api = createVehicleApi(baseUrl, {
      getToken: () => current.current === next ? token : null,
      onUnauthorized: () => endSession(next, "Sua sessão terminou. Entre novamente."),
    });
    current.current = next;
    setNotice("");
    setSession(next);
  }

  if (!session) {
    return <AuthPage onLogin={login} onRegister={authApi.register} notice={notice} />;
  }

  return (
    <QueryClientProvider client={session.client}>
      <AuthenticatedGarage
        session={session}
        onLogout={() => endSession(session, "Você saiu da sua conta.")}
      />
    </QueryClientProvider>
  );
}

function AuthenticatedGarage({ session, onLogout }) {
  const store = useAutoCuida(session.api, session.user.id);
  const [createdId, setCreatedId] = useState(null);
  const route = useHashNavigation(store.data);
  const activeVehicles = store.data?.vehicles.filter((entry) => entry.active) ?? [];
  const selected = store.data
    ? selectVehicleData(store.data, route.vehicleId)
    : { vehicle: null, maintenanceItems: [], serviceRecords: [] };
  const { vehicle, maintenanceItems, serviceRecords } = selected;

  function renderPage() {
    if (store.status === "loading") {
      return (
        <main className="grid gap-[1.35rem] px-5 md:px-10" aria-busy="true">
          <StateMessage title="Carregando dados">Aguarde enquanto buscamos seus veículos e serviços.</StateMessage>
        </main>
      );
    }
    if (store.status === "error") {
      return (
        <main className="grid gap-[1.35rem] px-5 md:px-10">
          <StateMessage title="Dados indisponíveis" error onAction={store.retry} actionLabel="Tentar novamente">
            {store.error}
          </StateMessage>
        </main>
      );
    }
    if (!vehicle && route.page !== "garage") {
      return (
        <main className="grid gap-[1.35rem] px-5 md:px-10">
          <StateMessage title="Nenhum veículo ativo" onAction={() => route.navigate("garage")} actionLabel="Ir para cadastro">
            Não há veículos ativos disponíveis nesta conta.
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
            justRegistered={Boolean(vehicle && vehicle.id === createdId)}
            onRegisterVehicle={async (input) => {
              const created = await store.registerVehicle(input);
              setCreatedId(created.id);
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
            onRegisterService={(service) => store.registerService(vehicle.id, service)}
            onNavigate={route.navigate}
          />
        );
      case "costs":
        return (
          <CostsPage
            key={vehicle.id}
            serviceRecords={serviceRecords}
            maintenanceItems={store.data.maintenanceItems.filter((item) => item.vehicleId === vehicle.id)}
            isSaving={store.isSaving}
            onDeleteService={store.removeService}
            onUpdateService={store.updateService}
          />
        );
      default:
        return (
          <DashboardPage
            key={vehicle.id}
            vehicle={vehicle}
            maintenanceItems={maintenanceItems}
            onRegisterService={(itemId) => route.navigate("service", { itemId })}
          />
        );
    }
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl pb-[6.25rem] lg:pb-7">
      <AppHeader page={route.page}>
        <div className="flex max-w-full flex-wrap items-center gap-3">
          <p className="min-w-0 break-words">{session.user.name}</p>
          <button type="button" className="secondary-button" onClick={onLogout}>
            Sair
          </button>
        </div>
      </AppHeader>
      {(store.status === "error" || store.refreshError) && (
        <div className="px-5 pb-4 md:px-10">
          <StateMessage title="Não foi possível carregar os veículos" error
            onAction={store.retry} actionLabel="Tentar novamente">
            {store.error}
          </StateMessage>
        </div>
      )}
      {vehicle && (
        <VehicleSelector vehicles={activeVehicles} vehicleId={vehicle.id}
          disabled={store.isSaving} onSelect={(vehicleId) => route.navigate(route.page, { vehicleId })} />
      )}
      {renderPage()}
      <BottomNavigation activePage={route.page} onNavigate={route.navigate} disabled={store.isSaving} />
    </div>
  );
}
