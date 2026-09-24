import { useState } from "react";
import AppHeader from "./components/AppHeader";
import BottomNavigation from "./components/BottomNavigation";
import {
  initialMaintenanceItems,
  initialServiceRecords,
  initialVehicle,
} from "./data/initialData";
import CostsPage from "./pages/CostsPage";
import DashboardPage from "./pages/DashboardPage";
import GaragePage from "./pages/GaragePage";
import ServicePage from "./pages/ServicePage";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [vehicle, setVehicle] = useState(initialVehicle);
  const [maintenanceItems, setMaintenanceItems] = useState(
    initialMaintenanceItems,
  );
  const [serviceRecords, setServiceRecords] = useState(initialServiceRecords);
  const [selectedMaintenanceItemId, setSelectedMaintenanceItemId] = useState(null);

  function navigateTo(page) {
    if (page !== "service") {
      setSelectedMaintenanceItemId(null);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openServiceRegistration(itemId) {
    setSelectedMaintenanceItemId(itemId);
    setActivePage("service");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateOdometer(currentKm) {
    setVehicle((currentVehicle) => ({ ...currentVehicle, currentKm }));
  }

  function registerService(service) {
    const servicedItem = maintenanceItems.find(
      (item) => item.id === service.maintenanceItemId,
    );
    const newRecord = {
      id: Date.now(),
      ...service,
      itemName: servicedItem.name,
    };

    setMaintenanceItems((currentItems) =>
      currentItems.map((item) =>
        item.id === service.maintenanceItemId
          ? {
              ...item,
              lastServiceDate: service.serviceDate,
              lastServiceKm: service.serviceKm,
            }
          : item,
      ),
    );
    setServiceRecords((currentRecords) => [newRecord, ...currentRecords]);
    setVehicle((currentVehicle) => ({
      ...currentVehicle,
      currentKm: Math.max(currentVehicle.currentKm, service.serviceKm),
    }));

    return newRecord;
  }

  function renderActivePage() {
    switch (activePage) {
      case "garage":
        return (
          <GaragePage
            vehicle={vehicle}
            onUpdateOdometer={updateOdometer}
            onBackToDashboard={() => navigateTo("dashboard")}
          />
        );
      case "service":
        return (
          <ServicePage
            vehicle={vehicle}
            maintenanceItems={maintenanceItems}
            selectedMaintenanceItemId={selectedMaintenanceItemId}
            onRegisterService={registerService}
            onNavigate={navigateTo}
          />
        );
      case "costs":
        return <CostsPage serviceRecords={serviceRecords} />;
      default:
        return (
          <DashboardPage
            vehicle={vehicle}
            maintenanceItems={maintenanceItems}
            onRegisterService={openServiceRegistration}
          />
        );
    }
  }

  return (
    <div className="app-shell">
      <AppHeader page={activePage} currentKm={vehicle.currentKm} />
      {renderActivePage()}
      <BottomNavigation activePage={activePage} onNavigate={navigateTo} />
    </div>
  );
}
