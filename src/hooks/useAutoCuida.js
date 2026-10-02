import { useEffect, useReducer, useState } from "react";
import { loadData } from "../data/loadData.js";
import { getToday } from "../data/validation.js";
import { createVehicle } from "../state/vehicles.js";
import {
  autoCuidaReducer,
  createServiceRecord,
  validateOdometer,
} from "../state/autoCuida.js";

function resourceReducer(state, action) {
  if (action.type === "loading")
    return { status: "loading", data: null, error: "" };
  if (action.type === "loaded")
    return { status: "ready", data: action.data, error: "" };
  if (action.type === "failed")
    return { status: "error", data: null, error: action.error };
  return { ...state, data: autoCuidaReducer(state.data, action) };
}

export default function useAutoCuida() {
  const [state, dispatch] = useReducer(resourceReducer, {
    status: "loading",
    data: null,
    error: "",
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: "loading" });
    loadData(`${import.meta.env.BASE_URL}data/autocuida.json`, {
      signal: controller.signal,
    })
      .then((data) => {
        if (!controller.signal.aborted) dispatch({ type: "loaded", data });
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          dispatch({
            type: "failed",
            error:
              "Não foi possível carregar os dados de demonstração. Verifique a conexão ou o arquivo de dados e tente novamente.",
          });
        }
      });
    return () => controller.abort();
  }, [attempt]);

  function updateOdometer(vehicleId, currentKm) {
    validateOdometer(state.data, vehicleId, currentKm);
    dispatch({ type: "odometerUpdated", vehicleId, currentKm });
  }

  function registerVehicle(input) {
    const currentYear = new Date().getFullYear();
    const vehicle = createVehicle(state.data, input, {
      id: crypto.randomUUID(),
      currentYear,
    });
    dispatch({ type: "vehicleRegistered", vehicle, currentYear });
    return vehicle;
  }

  function registerService(vehicleId, input) {
    const today = getToday();
    const record = createServiceRecord(state.data, vehicleId, input, {
      id: crypto.randomUUID(),
      today,
    });
    dispatch({ type: "serviceRegistered", record, today });
    return record;
  }

  return {
    ...state,
    retry: () => setAttempt((value) => value + 1),
    updateOdometer,
    registerService,
    registerVehicle,
  };
}
