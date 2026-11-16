import { Router } from "express";
import { asyncHandler } from "../../middleware/httpError.js";
import { validateBody } from "../../middleware/validate.js";
import { loginSchema, registerSchema } from "./auth.schemas.js";

export function createAuthRouter(service) {
  const router = Router();
  router.post(
    "/usuarios",
    validateBody(registerSchema),
    asyncHandler(async (req, res) => res.status(201).json(await service.register(req.body))),
  );
  router.post(
    "/login",
    validateBody(loginSchema),
    asyncHandler(async (req, res) => res.status(200).json(await service.login(req.body))),
  );
  return router;
}
