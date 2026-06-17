import { Router } from "express";

import dashboardController from "../controllers/dashboard.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

import {
  requireAdmin,
  requireApplicant,
  requireCompany,
} from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/company",
  authMiddleware,
  requireCompany,
  dashboardController.company,
);

router.get(
  "/applicant",
  authMiddleware,
  requireApplicant,
  dashboardController.applicant,
);

router.get("/admin", authMiddleware, requireAdmin, dashboardController.admin);

export default router;
