import { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createApi } from "../data/api.js";
import { createDemoApi } from "../data/demo.js";
import { dataQuery, commandMutation } from "../data/queries.js";

const isDemo = import.meta.env.VITE_DATA_MODE === "demo";
const api = isDemo
  ? createDemoApi()
  : createApi(import.meta.env.VITE_API_URL || "http://127.0.0.1:3001");

export default function useAutoCuida() {
  const client = useQueryClient();
  const query = useQuery(dataQuery(api));
  const mutation = useMutation(commandMutation(client, api));
  const pending = useRef(false);

  async function execute(command, ...args) {
    if (pending.current) throw new Error("Aguarde a operação em andamento.");
    pending.current = true;
    try {
      return await mutation.mutateAsync({ command, args });
    } finally {
      pending.current = false;
    }
  }

  return {
    data: query.data,
    status: query.isPending ? "loading" : query.data ? "ready" : "error",
    error: query.error?.message ?? "",
    refreshError: Boolean(query.data && query.isError),
    isSaving: mutation.isPending,
    isDemo,
    retry: query.refetch,
    updateOdometer: (...args) => execute("updateOdometer", ...args),
    registerVehicle: (...args) => execute("registerVehicle", ...args),
    registerService: (...args) => execute("registerService", ...args),
  };
}
