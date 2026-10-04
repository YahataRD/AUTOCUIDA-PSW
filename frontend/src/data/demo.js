import seed from "../../../mock/seed.json" with { type: "json" };
import { autoCuidaReducer, createServiceRecord } from "../state/autoCuida.js";
import { createVehicle } from "../state/vehicles.js";
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
  };
}
