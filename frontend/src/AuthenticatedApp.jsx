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
  const [selectedId, setSelectedId] = useState(null);
  const [createdId, setCreatedId] = useState(null);
  const activeVehicles = store.data?.vehicles.filter((entry) => entry.active);
  const vehicle = activeVehicles?.find((entry) => entry.id === selectedId)
    ?? activeVehicles?.[0];

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl pb-7">
      <AppHeader page="garage">
        <div className="flex max-w-full flex-wrap items-center gap-3">
          <p className="min-w-0 break-words">{session.user.name}</p>
          <button type="button" className="secondary-button" onClick={onLogout}>
            Sair
          </button>
        </div>
      </AppHeader>
      {store.status === "loading" && (
        <div className="px-5 md:px-10" aria-busy="true">
          <StateMessage title="Carregando veículos">Aguarde enquanto buscamos seus veículos.</StateMessage>
        </div>
      )}
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
          disabled={store.isSaving} onSelect={setSelectedId} />
      )}
      {store.data && (
        <GaragePage
          key={vehicle?.id ?? "empty"}
          vehicle={vehicle}
          isSaving={store.isSaving}
          justRegistered={Boolean(vehicle && vehicle.id === createdId)}
          onRegisterVehicle={async (input) => {
            const created = await store.registerVehicle(input);
            setCreatedId(created.id);
            setSelectedId(created.id);
          }}
          onUpdateVehicle={store.updateVehicle}
          onUpdateOdometer={(km) => store.updateOdometer(vehicle.id, km)}
          onDeactivateVehicle={store.deactivateVehicle}
        />
      )}
    </div>
  );
}
