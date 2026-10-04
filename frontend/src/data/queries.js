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
