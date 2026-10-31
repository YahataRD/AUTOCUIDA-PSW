import express from "express";
import cors from "cors";
import { readConfig } from "./config.js";
import { errorHandler, notFound } from "./middleware/errors.js";

export function createApp({ origins = readConfig().origins } = {}) {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors({ origin: origins }));
  app.use(express.json({ limit: "100kb" }));

  // Verifica apenas o processo HTTP. Persistência será integrada na próxima etapa.
  app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "autocuida-api" });
  });

  // Registrar rotas dos módulos acima destes dois middlewares.
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
