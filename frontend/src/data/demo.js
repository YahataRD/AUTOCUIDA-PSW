import seed from "../../../mock/seed.json" with { type: "json" };
import {
  autoCuidaReducer,
  createMaintenanceItem,
  updateMaintenanceItem,
  createServiceRecord,
  updateServiceRecord,
} from "../state/autoCuida.js";
import { createVehicle, updateVehicle } from "../state/vehicles.js";
import { getToday, validateData } from "./validation.js";

// Só o build explicitamente marcado como demo usa memória. Falhas da API
// nunca ativam este modo, evitando uma falsa confirmação de persistência.
export function createDemoApi() {
  let data = validateData(structuredClone(seed));
  return {
    async load() {
      return structuredClone(data);
    },
    async registerVehicle(input) {
      const currentYear = new Date().getFullYear();
      const vehicle = createVehicle(data, input, {
        id: crypto.randomUUID(),
        currentYear,
      });
      data = autoCuidaReducer(data, {
        type: "vehicleRegistered",
        vehicle,
        currentYear,
      });
      return vehicle;
    },
    async updateOdometer(vehicleId, currentKm) {
      data = autoCuidaReducer(data, {
        type: "odometerUpdated",
        vehicleId,
        currentKm,
      });
      return data.vehicles.find((vehicle) => vehicle.id === vehicleId);
    },
    async updateVehicle(vehicleId, input) {
      const vehicle = updateVehicle(data, vehicleId, input, { currentYear: new Date().getFullYear() });
      data = autoCuidaReducer(data, { type: "vehicleUpdated", vehicleId, vehicle });
      return vehicle;
    },
    async deactivateVehicle(vehicleId) {
      data = autoCuidaReducer(data, { type: "vehicleDeactivated", vehicleId });
      return { id: vehicleId, active: false };
    },
    async registerMaintenanceItem(vehicleId, input) {
      const item = createMaintenanceItem(data, vehicleId, input, { id: crypto.randomUUID() });
      data = autoCuidaReducer(data, { type: "maintenanceItemRegistered", item });
      return item;
    },
    async updateMaintenanceItem(itemId, input) {
      const item = updateMaintenanceItem(data, itemId, input);
      data = autoCuidaReducer(data, { type: "maintenanceItemUpdated", item });
      return item;
    },
    async removeMaintenanceItem(itemId) {
      data = autoCuidaReducer(data, { type: "maintenanceItemRemoved", itemId });
      return { id: itemId, active: false };
    },
    async registerService(vehicleId, input) {
      const today = getToday();
      const record = createServiceRecord(data, vehicleId, input, {
        id: crypto.randomUUID(),
        today,
      });
      data = autoCuidaReducer(data, {
        type: "serviceRegistered",
        record,
        today,
      });
      return record;
    },
    async updateService(serviceId, input) {
      const record = updateServiceRecord(data, serviceId, input, { today: getToday() });
      data = autoCuidaReducer(data, { type: "serviceUpdated", record });
      return record;
    },
    async removeService(serviceId) {
      data = autoCuidaReducer(data, { type: "serviceRemoved", serviceId });
      return { id: serviceId };
    },
  };
}
