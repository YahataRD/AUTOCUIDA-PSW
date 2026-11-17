// Cliente HTTP compartilhado: Bearer token, erros estruturados do servidor
// ({ error: { code, message, fields } }) e respostas sem corpo (204/vazias).
export class ApiError extends Error {
  constructor(message, { status, code, fields, cause } = {}) {
    super(message, { cause });
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

async function readPayload(response) {
  if (response.status === 204) return null;
  // Respostas reais do fetch sempre têm text(). Implementações mínimas só com
  // json() (como fetchers simulados em testes) seguem o ramo abaixo.
  if (typeof response.text !== "function") {
    try {
      return await response.json();
    } catch (cause) {
      if (!response.ok) return null;
      throw new ApiError("O servidor retornou uma resposta inválida.", {
        status: response.status,
        cause,
      });
    }
  }
  const text = await response.text();
  if (text.trim() === "") return null;
  try {
    return JSON.parse(text);
  } catch (cause) {
    // Corpo de erro que não é JSON (ex.: página de proxy): a mensagem usa o status.
    if (!response.ok) return null;
    throw new ApiError("O servidor retornou uma resposta inválida.", {
      status: response.status,
      cause,
    });
  }
}

// getToken: lê o token em memória a cada chamada (nunca guardar em constante).
// onUnauthorized(code): chamado em 401 de rotas autenticadas (sessão expirada).
export function createHttpClient(
  baseUrl,
  { fetcher = fetch, getToken = () => null, onUnauthorized } = {},
) {
  const base = baseUrl.replace(/\/$/, "");

  return async function request(path, { signal, method = "GET", body, auth = true } = {}) {
    const headers = {};
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const token = auth ? getToken() : null;
    if (token) headers.Authorization = `Bearer ${token}`;

    let response;
    try {
      response = await fetcher(`${base}/${path}`, {
        method,
        signal,
        headers,
        cache: "no-store",
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      });
    } catch (error) {
      if (signal?.aborted) throw error;
      throw new ApiError(
        "Não foi possível acessar o servidor. Verifique sua conexão e tente novamente.",
        { cause: error },
      );
    }

    const payload = await readPayload(response);
    if (!response.ok) {
      const detail = payload?.error;
      if (response.status === 401 && auth && token) onUnauthorized?.(detail?.code);
      throw new ApiError(
        detail?.message || `O servidor recusou a operação (HTTP ${response.status}).`,
        { status: response.status, code: detail?.code, fields: detail?.fields },
      );
    }
    return payload;
  };
}
