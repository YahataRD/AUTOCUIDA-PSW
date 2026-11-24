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
      const [vehicles, maintenanceItems, serviceRecords] = await Promise.all([
        request("vehicles", { signal }),
        request("maintenanceItems", { signal }),
        request("serviceRecords", { signal }),
      ]);
      return validateData({ vehicles, maintenanceItems, serviceRecords });
    },
    registerVehicle: (input) =>
      request("vehicles", { method: "POST", body: vehicleFields(input) }),
    updateVehicle: (id, input) =>
      request(vehiclePath(id), { method: "PUT", body: vehicleFields(input) }),
    updateOdometer: (id, currentKm) =>
      request(vehiclePath(id), { method: "PATCH", body: { currentKm } }),
    deactivateVehicle: (id) =>
      request(vehiclePath(id), { method: "PATCH", body: { active: false } }),
    registerMaintenanceItem: (vehicleId, input) =>
      request("maintenanceItems", {
        method: "POST",
        body: {
          vehicleId,
          name: input.name,
          intervalKm: input.intervalKm,
          intervalMonths: input.intervalMonths,
          initialReference: {
            date: input.initialDate ?? input.initialReference?.date,
            km: input.initialKm ?? input.initialReference?.km,
          },
        },
      }),
    updateMaintenanceItem: (itemId, input) =>
      request(`maintenanceItems/${encodeURIComponent(itemId)}`, {
        method: "PUT",
        body: {
          name: input.name,
          intervalKm: input.intervalKm,
          intervalMonths: input.intervalMonths,
          initialReference: {
            date: input.initialDate ?? input.initialReference?.date,
            km: input.initialKm ?? input.initialReference?.km,
          },
        },
      }),
    removeMaintenanceItem: (itemId) =>
      request(`maintenanceItems/${encodeURIComponent(itemId)}`, {
        method: "PATCH",
        body: { active: false },
      }),
    registerService: (_vehicleId, input) =>
      request("serviceRecords", {
        method: "POST",
        body: {
          vehicleId: _vehicleId,
          maintenanceItemId: input.maintenanceItemId,
          maintenanceType: input.maintenanceType,
          serviceDate: input.serviceDate,
          serviceKm: input.serviceKm,
          amount: input.amount,
          shop: input.shop,
        },
      }),
    updateService: (serviceId, input) =>
      request(`serviceRecords/${encodeURIComponent(serviceId)}`, {
        method: "PUT",
        body: {
          maintenanceItemId: input.maintenanceItemId,
          maintenanceType: input.maintenanceType,
          serviceDate: input.serviceDate,
          serviceKm: input.serviceKm,
          amount: input.amount,
          shop: input.shop,
        },
      }),
    removeService: (serviceId) =>
      request(`serviceRecords/${encodeURIComponent(serviceId)}`, {
        method: "DELETE",
      }).then(() => ({ id: serviceId })),
  };
}
