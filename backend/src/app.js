import express from "express";
import cors from "cors";
import { readConfig } from "./config.js";
import { errorHandler, notFound } from "./middleware/errors.js";

export function createApp({ origins = readConfig().origins, isReady = async () => false } = {}) {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors({ origin: origins }));
  app.use(express.json({ limit: "100kb" }));

  // Liveness verifica o processo; readiness confirma a disponibilidade do banco.
  app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "autocuida-api" });
  });
  app.get("/ready", async (req, res) => {
    if (await isReady()) {
      return res.json({ status: "ready", service: "autocuida-api" });
    }
    res.status(503).json({
      error: { code: "DATABASE_UNAVAILABLE", message: "Banco de dados indisponível." },
    });
  });

  // Registrar rotas dos módulos acima destes dois middlewares.
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
