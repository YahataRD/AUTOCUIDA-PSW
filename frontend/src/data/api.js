import { validateData, getToday } from "./validation.js";
import { createVehicle, updateVehicle } from "../state/vehicles.js";
import {
  createMaintenanceItem,
  updateMaintenanceItem,
  createServiceRecord,
  updateServiceRecord,
  validateOdometer,
} from "../state/autoCuida.js";

export function createApi(baseUrl, fetcher = fetch) {
  const base = baseUrl.replace(/\/$/, "");
  async function request(path, { signal, method = "GET", body } = {}) {
    let response;
    try {
      response = await fetcher(`${base}/${path}`, {
        method,
        signal,
        cache: "no-store",
        ...(body === undefined
          ? {}
          : {
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }),
      });
    } catch (error) {
      if (signal?.aborted) throw error;
      throw new Error(
        "Não foi possível acessar o servidor. Verifique se o mock está em execução.",
        { cause: error },
      );
    }
    if (!response.ok)
      throw new Error(
        `O servidor recusou a operação (HTTP ${response.status}).`,
      );
    try {
      return await response.json();
    } catch (error) {
      throw new Error("O servidor retornou uma resposta inválida.", {
        cause: error,
      });
    }
  }
  async function load({ signal } = {}) {
    const keys = ["vehicles", "maintenanceItems", "serviceRecords"];
    const lists = await Promise.all(
      keys.map((key) => request(key, { signal })),
    );
    return validateData(
      Object.fromEntries(keys.map((key, index) => [key, lists[index]])),
    );
  }

  async function saveService(data, record, method) {
    const vehicle = data.vehicles.find((entry) => entry.id === record.vehicleId);
    // Sem transações no json-server: ampliar o odômetro antes do POST/PUT
    // mantém a base legível mesmo se a gravação do serviço falhar.
    const increasesKm = record.serviceKm > vehicle.currentKm;
    if (increasesKm) {
      await request(`vehicles/${encodeURIComponent(vehicle.id)}`, {
        method: "PATCH",
        body: { currentKm: record.serviceKm },
      });
    }
    try {
      const path = method === "PUT"
        ? `serviceRecords/${encodeURIComponent(record.id)}`
        : "serviceRecords";
      return await request(path, { method, body: record });
    } catch (error) {
      const operation = method === "PUT" ? "a edição" : "o registro";
      throw new Error(
        `${increasesKm ? "O odômetro foi atualizado, mas " : ""}não foi possível confirmar ${operation} do serviço. Confira o histórico antes de tentar novamente. ${error.message}`,
        { cause: error },
      );
    }
  }

  return {
    load,
    async registerVehicle(input) {
      const vehicle = createVehicle(await load(), input, {
        id: crypto.randomUUID(),
        currentYear: new Date().getFullYear(),
      });
      return request("vehicles", { method: "POST", body: vehicle });
    },
    async updateOdometer(vehicleId, currentKm) {
      validateOdometer(await load(), vehicleId, currentKm);
      return request(`vehicles/${encodeURIComponent(vehicleId)}`, {
        method: "PATCH",
        body: { currentKm },
      });
    },
    async updateVehicle(vehicleId, input) {
      const data = await load();
      const vehicle = updateVehicle(data, vehicleId, input, { currentYear: new Date().getFullYear() });
      return request(`vehicles/${encodeURIComponent(vehicleId)}`, { method: "PUT", body: vehicle });
    },
    async deactivateVehicle(vehicleId) {
      await request(`vehicles/${encodeURIComponent(vehicleId)}`, { method: "PATCH", body: { active: false } });
      return { id: vehicleId, active: false };
    },
    async registerMaintenanceItem(vehicleId, input) {
      const data = await load();
      const item = createMaintenanceItem(data, vehicleId, input, { id: crypto.randomUUID() });
      return request("maintenanceItems", { method: "POST", body: item });
    },
    async updateMaintenanceItem(itemId, input) {
      const data = await load();
      const item = updateMaintenanceItem(data, itemId, input);
      return request(`maintenanceItems/${encodeURIComponent(itemId)}`, { method: "PUT", body: item });
    },
    async removeMaintenanceItem(itemId) {
      await request(`maintenanceItems/${encodeURIComponent(itemId)}`, { method: "PATCH", body: { active: false } });
      return { id: itemId, active: false };
    },
    async registerService(vehicleId, input) {
      const data = await load();
      const record = createServiceRecord(data, vehicleId, input, {
        id: crypto.randomUUID(),
        today: getToday(),
      });
      return saveService(data, record, "POST");
    },
    async updateService(serviceId, input) {
      const data = await load();
      const record = updateServiceRecord(data, serviceId, input, { today: getToday() });
      return saveService(data, record, "PUT");
    },
    async removeService(serviceId) {
      await request(`serviceRecords/${encodeURIComponent(serviceId)}`, { method: "DELETE" });
      return { id: serviceId };
    },
  };
}
