import { validateData } from "./validation.js";

export async function loadData(url, { signal, fetcher = fetch } = {}) {
  const response = await fetcher(url, { signal, cache: "no-store" });
  if (!response.ok)
    throw new Error("Não foi possível carregar os dados de demonstração.");
  return validateData(await response.json());
}
