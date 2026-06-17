import { Router } from "express";

import savedJobController from "../controllers/saved-job.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

import { requireApplicant } from "../middlewares/role.middleware";

const router = Router();

router.post(
  "/:jobId",
  authMiddleware,
  requireApplicant,
  savedJobController.save,
);

router.delete(
  "/:jobId",
  authMiddleware,
  requireApplicant,
  savedJobController.remove,
);

router.get("/", authMiddleware, requireApplicant, savedJobController.getAll);

export default router;
