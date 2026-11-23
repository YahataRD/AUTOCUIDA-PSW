import { once } from "node:events";
import { createApp } from "./app.js";
import { connectDatabase, disconnectDatabase, isDatabaseReady } from "./database.js";
import { createAuthModule } from "./modules/auth/index.js";
import { User } from "./modules/auth/user.model.js";
import { vehicleRepository } from "./modules/vehicles/repository.js";

export async function startServer(config) {
  const auth = createAuthModule(config.authConfig);
  // Não abrir porta HTTP enquanto a conexão inicial não estiver confirmada.
  await connectDatabase(config);
  try {
    // Criar índices com a conexão atual, inclusive ao reiniciar no mesmo processo.
    await User.createIndexes();
    await vehicleRepository.initialize();
  } catch {
    await disconnectDatabase();
    throw new Error("Não foi possível inicializar os índices de usuários e veículos.");
  }

  let server;
  try {
    const app = createApp({ origins: config.origins, isReady: isDatabaseReady, auth });
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
