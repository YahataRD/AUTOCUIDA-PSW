import { createApp } from "./app.js";
import { readConfig } from "./config.js";

try {
  const config = readConfig();
  const app = createApp(config);
  const server = app.listen(config.port, config.host, () => {
    console.log(`AutoCUIDA API em http://${config.host}:${config.port}`);
  });
  server.on("error", (error) => {
    console.error(error.code === "EADDRINUSE"
      ? `Porta ${config.port} ocupada. Encerre o mock ou configure outra PORT.`
      : "Não foi possível iniciar o servidor HTTP.");
    process.exitCode = 1;
  });
  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.once(signal, () => server.close());
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
