const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
];

export function readConfig(env = process.env) {
  const portText = env.PORT ?? "3001";
  const port = Number(portText);
  if (!/^\d+$/.test(portText) || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT deve ser um inteiro entre 1 e 65535.");
  }
  const host = (env.HOST ?? "127.0.0.1").trim();
  if (!host) throw new Error("HOST não pode ser vazio.");
  const origins = env.CORS_ORIGINS === undefined
    ? defaultOrigins
    : env.CORS_ORIGINS.split(",").map((origin) => origin.trim());
  if (!origins.length || origins.some((origin) => {
    try {
      const url = new URL(origin);
      return !["http:", "https:"].includes(url.protocol) || url.origin !== origin;
    } catch {
      return true;
    }
  })) {
    throw new Error("CORS_ORIGINS deve conter origens HTTP(S) sem caminhos, separadas por vírgula.");
  }
  return { port, host, origins: [...new Set(origins)] };
}

export function readDatabaseConfig(env = process.env) {
  const mongoUrl = env.MONGO_URL?.trim();
  if (!mongoUrl || !/^mongodb(?:\+srv)?:\/\//.test(mongoUrl)) {
    throw new Error("Configure MONGO_URL com uma URI mongodb:// ou mongodb+srv:// no ambiente.");
  }
  const timeoutText = env.MONGO_TIMEOUT_MS ?? "5000";
  const timeout = Number(timeoutText);
  if (!/^\d+$/.test(timeoutText) || !Number.isInteger(timeout) || timeout < 100 || timeout > 60000) {
    throw new Error("MONGO_TIMEOUT_MS deve ser um inteiro entre 100 e 60000.");
  }
  return { mongoUrl, mongoTimeoutMs: timeout };
}
