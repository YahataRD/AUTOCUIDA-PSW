import { readConfig, readDatabaseConfig } from "./config.js";
import { startServer } from "./runtime.js";

try {
  const config = { ...readConfig(), ...readDatabaseConfig() };
  const runtime = await startServer(config);
  console.log(`AutoCUIDA API em http://${config.host}:${config.port}`);
  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.once(signal, () => {
      runtime.close().catch(() => {
        console.error("Não foi possível encerrar a API corretamente.");
        process.exitCode = 1;
      });
    });
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
