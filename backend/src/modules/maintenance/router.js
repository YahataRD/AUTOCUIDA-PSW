import { Router } from "express";
import { requireVehicleOwner } from "../vehicles/service.js";
import {
  createItem, createRecord, get, list, removeItem, removeRecord, updateItem, updateRecord,
} from "./service.js";

function protectedRouter(authenticate, resource) {
  if (typeof authenticate !== "function") {
    throw new TypeError("As rotas de manutenção exigem middleware de autenticação.");
  }
  const router = Router();
  router.use(authenticate, (req, res, next) => {
    requireVehicleOwner(req.user?.id);
    next();
  });
  router.get("/", async (req, res) => {
    res.json(await list(req.user.id, resource, req.query));
  });
  router.get("/:id", async (req, res) => {
    res.json(await get(req.user.id, resource, req.params.id));
  });
  return router;
}

export function createMaintenanceItemRouter(authenticate) {
  const router = protectedRouter(authenticate, "maintenanceItems");
  router.post("/", async (req, res) => {
    res.status(201).json(await createItem(req.user.id, req.body));
  });
  router.put("/:id", async (req, res) => {
    res.json(await updateItem(req.user.id, req.params.id, req.body));
  });
  router.patch("/:id", async (req, res) => {
    res.json(await removeItem(req.user.id, req.params.id, req.body));
  });
  return router;
}

export function createServiceRecordRouter(authenticate) {
  const router = protectedRouter(authenticate, "serviceRecords");
  router.post("/", async (req, res) => {
    res.status(201).json(await createRecord(req.user.id, req.body));
  });
  router.put("/:id", async (req, res) => {
    res.json(await updateRecord(req.user.id, req.params.id, req.body));
  });
  router.delete("/:id", async (req, res) => {
    await removeRecord(req.user.id, req.params.id);
    res.status(204).end();
  });
  return router;
}
