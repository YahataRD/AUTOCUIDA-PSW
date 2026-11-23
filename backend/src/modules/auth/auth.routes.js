import { Router } from "express";
import { validateBody } from "../../middleware/validate.js";
import { loginSchema, registerSchema } from "./auth.schemas.js";

export function createAuthRouter(service) {
  const router = Router();
  router.post(
    "/usuarios",
    validateBody(registerSchema),
    async (req, res) => res.status(201).json(await service.register(req.body)),
  );
  router.post(
    "/login",
    validateBody(loginSchema),
    async (req, res) => res.json(await service.login(req.body)),
  );
  return router;
}
