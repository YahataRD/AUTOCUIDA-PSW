import { Router } from "express";
import { vehicleService, requireVehicleOwner } from "./service.js";

// O módulo não pode ser montado sem um middleware explícito de autenticação.
// A implementação/registro JWT cabe à frente de autenticação.
export function createVehicleRouter({ authenticate } = {}) {
  if (typeof authenticate !== "function") {
    throw new TypeError("As rotas de veículos exigem middleware de autenticação.");
  }
  const router = Router();
  router.use(authenticate, (req, res, next) => {
    requireVehicleOwner(req.user?.id);
    next();
  });

  router.get("/", async (req, res) => {
    res.json(await vehicleService.list(req.user.id));
  });
  router.get("/:id", async (req, res) => {
    res.json(await vehicleService.get(req.user.id, req.params.id));
  });
  router.post("/", async (req, res) => {
    res.status(201).json(await vehicleService.create(req.user.id, req.body));
  });
  router.put("/:id", async (req, res) => {
    res.json(await vehicleService.update(req.user.id, req.params.id, req.body));
  });
  router.patch("/:id", async (req, res) => {
    const command = Object.hasOwn(req.body ?? {}, "active") ? "deactivate" : "updateOdometer";
    res.json(await vehicleService[command](req.user.id, req.params.id, req.body));
  });
  return router;
}
