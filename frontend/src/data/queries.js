export const dataKey = ["autocuida"];

export function dataQuery(api) {
  return {
    queryKey: dataKey,
    queryFn: ({ signal }) => api.load({ signal }),
    retry: false,
    // localhost continua acessível quando o navegador se considera offline.
    networkMode: "always",
    refetchOnWindowFocus: false,
  };
}

export function commandMutation(client, api) {
  return {
    mutationFn: ({ command, args }) => api[command](...args),
    retry: false,
    networkMode: "always",
    onMutate: () => client.cancelQueries({ queryKey: dataKey }),
    onSuccess: (result, { command }) => {
      client.setQueryData(dataKey, (data) => {
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
        if (command === "updateService") {
          return { ...data, serviceRecords: data.serviceRecords.map((r) => r.id === result.id ? result : r) };
        }
        if (command === "removeService") {
          return { ...data, serviceRecords: data.serviceRecords.filter((r) => r.id !== result.id) };
        }
        if (command === "registerService") {
          return {
            ...data,
            serviceRecords: [
              result,
              ...data.serviceRecords.filter(
                (record) => record.id !== result.id,
              ),
            ],
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
    onSettled: () => client.invalidateQueries({ queryKey: dataKey }),
  };
}
