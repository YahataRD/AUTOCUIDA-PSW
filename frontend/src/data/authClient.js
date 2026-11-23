import { createHttpClient } from "./http.js";

// Rotas públicas de autenticação (sem Bearer).
export function createAuthClient(baseUrl, { fetcher } = {}) {
  const request = createHttpClient(baseUrl, { fetcher });
  return {
    // -> { id, name, email }
    register: ({ name, email, password }) =>
      request("usuarios", { method: "POST", auth: false, body: { name, email, password } }),
    // -> { token, user: { id, name, email } }
    login: ({ email, password }) =>
      request("login", { method: "POST", auth: false, body: { email, password } }),
  };
}
