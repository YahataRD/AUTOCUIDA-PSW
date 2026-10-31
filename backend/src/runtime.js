import { once } from "node:events";
import { createApp } from "./app.js";
import { connectDatabase, disconnectDatabase, isDatabaseReady } from "./database.js";

export async function startServer(config) {
  // Não abrir porta HTTP enquanto a conexão inicial não estiver confirmada.
  await connectDatabase(config);
  const app = createApp({ ...config, isReady: isDatabaseReady });
  let server;
  try {
    server = app.listen(config.port, config.host);
    await once(server, "listening");
  } catch (error) {
    await disconnectDatabase();
    throw new Error(error.code === "EADDRINUSE"
      ? `Porta ${config.port} ocupada. Encerre o mock ou configure outra PORT.`
      : "Não foi possível iniciar o servidor HTTP.");
  }

  let closing;
  function close() {
    // Vários sinais ou chamadas compartilham o mesmo encerramento.
    closing ??= (async () => {
      try {
        await new Promise((resolve, reject) => {
          const timer = setTimeout(() => server.closeAllConnections(), 5000);
          timer.unref();
          server.close((error) => {
            clearTimeout(timer);
            if (error) reject(error);
            else resolve();
          });
        });
      } finally {
        await disconnectDatabase();
      }
    })();
    return closing;
  }
  return { server, close };
}
