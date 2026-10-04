import { validateData, getToday } from "./validation.js";
import { createVehicle } from "../state/vehicles.js";
import { createServiceRecord, validateOdometer } from "../state/autoCuida.js";

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
    async registerService(vehicleId, input) {
      const data = await load();
      const record = createServiceRecord(data, vehicleId, input, {
        id: crypto.randomUUID(),
        today: getToday(),
      });
      const vehicle = data.vehicles.find((entry) => entry.id === vehicleId);
      // JSON Server não oferece transações. O odômetro precisa comportar a km
      // do serviço antes de persistir o registro, preservando dados válidos.
      const increasesKm = record.serviceKm > vehicle.currentKm;
      if (increasesKm) {
        await request(`vehicles/${encodeURIComponent(vehicleId)}`, {
          method: "PATCH",
          body: { currentKm: record.serviceKm },
        });
      }
      try {
        return await request("serviceRecords", {
          method: "POST",
          body: record,
        });
      } catch (error) {
        throw new Error(
          `${increasesKm ? "O odômetro foi atualizado, mas " : ""}não foi possível confirmar o registro do serviço. Confira o histórico antes de tentar novamente. ${error.message}`,
          { cause: error },
        );
      }
    },
  };
}
