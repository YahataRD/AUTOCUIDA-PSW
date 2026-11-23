import { createHttpClient } from "./http.js";
import { validateData } from "./validation.js";

function vehicleFields({ plate, model, year, currentKm }) {
  return { plate, model, year, currentKm };
}

const vehiclePath = (id) => `vehicles/${encodeURIComponent(id)}`;

export function createVehicleApi(baseUrl, options) {
  const request = createHttpClient(baseUrl, options);
  return {
    async load({ signal } = {}) {
      const vehicles = await request("vehicles", { signal });
      return validateData({ vehicles, maintenanceItems: [], serviceRecords: [] });
    },
    registerVehicle: (input) =>
      request("vehicles", { method: "POST", body: vehicleFields(input) }),
    updateVehicle: (id, input) =>
      request(vehiclePath(id), { method: "PUT", body: vehicleFields(input) }),
    updateOdometer: (id, currentKm) =>
      request(vehiclePath(id), { method: "PATCH", body: { currentKm } }),
    deactivateVehicle: (id) =>
      request(vehiclePath(id), { method: "PATCH", body: { active: false } }),
  };
}
