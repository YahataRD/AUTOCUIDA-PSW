export const dataKey = ["autocuida"];

// Com usuário autenticado o cache é separado por conta; sem usuário (demo)
// mantém a chave antiga.
export const dataKeyFor = (userId) => (userId ? [...dataKey, userId] : dataKey);

// Ao sair ou trocar de conta: cancela consultas em andamento e apaga o cache,
// para que respostas da sessão anterior não preencham a nova.
export async function resetSessionData(client) {
  await client.cancelQueries();
  client.clear();
}

export function dataQuery(api, userId) {
  return {
    queryKey: dataKeyFor(userId),
    queryFn: ({ signal }) => api.load({ signal }),
    retry: false,
    // localhost continua acessível quando o navegador se considera offline.
    networkMode: "always",
    refetchOnWindowFocus: false,
  };
}

export function commandMutation(client, api, userId) {
  const key = dataKeyFor(userId);
  return {
    mutationFn: ({ command, args }) => api[command](...args),
    retry: false,
    networkMode: "always",
    onMutate: () => client.cancelQueries({ queryKey: key }),
    onSuccess: (result, { command }) => {
      client.setQueryData(key, (data) => {
        if (!data) return data;
        if (command === "updateVehicle") {
          return { ...data, vehicles: data.vehicles.map((v) => v.id === result.id ? result : v) };
        }
        if (command === "deactivateVehicle") {
          return { ...data, vehicles: data.vehicles.map((v) => v.id === result.id ? { ...v, active: false } : v) };
        }
        if (command === "registerMaintenanceItem") {
          return { ...data, maintenanceItems: [...data.maintenanceItems, result] };
        }
        if (command === "updateMaintenanceItem") {
          return { ...data, maintenanceItems: data.maintenanceItems.map((i) => i.id === result.id ? result : i) };
        }
        if (command === "removeMaintenanceItem") {
          return { ...data, maintenanceItems: data.maintenanceItems.map((i) => i.id === result.id ? { ...i, active: false } : i) };
        }
        if (command === "removeService") {
          return { ...data, serviceRecords: data.serviceRecords.filter((r) => r.id !== result.id) };
        }
        if (command === "registerService" || command === "updateService") {
          return {
            ...data,
            serviceRecords: command === "updateService"
              ? data.serviceRecords.map((record) => record.id === result.id ? result : record)
              : [result, ...data.serviceRecords.filter((record) => record.id !== result.id)],
            vehicles: data.vehicles.map((vehicle) =>
              vehicle.id === result.vehicleId
                ? {
                    ...vehicle,
                    currentKm: Math.max(vehicle.currentKm, result.serviceKm),
                  }
                : vehicle,
            ),
          };
        }
        return {
          ...data,
          vehicles:
            command === "registerVehicle"
              ? [
                  ...data.vehicles.filter(
                    (vehicle) => vehicle.id !== result.id,
                  ),
                  result,
                ]
              : data.vehicles.map((vehicle) =>
                  vehicle.id === result.id ? result : vehicle,
                ),
        };
      });
    },
    // Reconsultar inclusive em falhas: a escrita pode chegar ao servidor antes
    // de a conexão cair. Não inventamos um estado local após a operação.
    onSettled: () => client.invalidateQueries({ queryKey: key }),
  };
}
