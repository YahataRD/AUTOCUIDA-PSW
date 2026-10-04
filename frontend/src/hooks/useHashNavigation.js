import { useEffect, useState } from "react";
import { buildHash, parseRoute, resolveRoute } from "../navigation/routes.js";

export default function useHashNavigation(data) {
  const [locationRoute, setLocationRoute] = useState(() =>
    parseRoute(window.location.hash),
  );
  const route = data ? resolveRoute(locationRoute, data) : locationRoute;
  const canonicalHash = buildHash(route);

  useEffect(() => {
    const onHashChange = () =>
      setLocationRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (data && window.location.hash !== canonicalHash) {
      window.history.replaceState(null, "", canonicalHash);
      setLocationRoute(parseRoute(canonicalHash));
    }
  }, [data, canonicalHash]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [route.page, route.vehicleId, route.itemId]);

  function navigate(page, { vehicleId = route.vehicleId, itemId = null } = {}) {
    const hash = buildHash({ page, vehicleId, itemId });
    if (window.location.hash !== hash) {
      window.location.hash = hash;
      setLocationRoute(parseRoute(hash));
    }
  }

  return { ...route, navigate };
}
