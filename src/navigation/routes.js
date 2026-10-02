const paths = {
  dashboard: "/painel",
  garage: "/garagem",
  service: "/servico",
  costs: "/custos",
};

export function parseRoute(hash) {
  const [path, query = ""] = hash.replace(/^#/, "").split("?");
  const params = new URLSearchParams(query);
  const page =
    Object.keys(paths).find((key) => paths[key] === path) ?? "dashboard";
  return {
    page,
    vehicleId: params.get("veiculo"),
    itemId: page === "service" ? params.get("item") : null,
  };
}

export function buildHash({ page, vehicleId, itemId }) {
  const params = new URLSearchParams();
  if (vehicleId) params.set("veiculo", vehicleId);
  if (page === "service" && itemId) params.set("item", itemId);
  const query = params.toString();
  return `#${paths[page] ?? paths.dashboard}${query ? `?${query}` : ""}`;
}

export function resolveRoute(route, data) {
  const vehicle =
    data.vehicles.find(
      (entry) => entry.active && entry.id === route.vehicleId,
    ) ?? data.vehicles.find((entry) => entry.active);
  const item =
    route.page === "service" &&
    data.maintenanceItems.find(
      (entry) =>
        entry.active &&
        entry.vehicleId === vehicle?.id &&
        entry.id === route.itemId,
    );
  return {
    page: route.page,
    vehicleId: vehicle?.id ?? null,
    itemId: item?.id ?? null,
  };
}
