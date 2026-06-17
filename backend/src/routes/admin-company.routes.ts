import { Router } from "express";

import adminCompanyController from "../controllers/admin-company.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  requireAdmin,
  adminCompanyController.getPending,
);

router.get("/all", authMiddleware, requireAdmin, adminCompanyController.getAll);

router.patch(
  "/:id/approve",
  authMiddleware,
  requireAdmin,
  adminCompanyController.approve,
);

router.patch(
  "/:id/reject",
  authMiddleware,
  requireAdmin,
  adminCompanyController.reject,
);

router.patch(
  "/:id/verify",
  authMiddleware,
  requireAdmin,
  adminCompanyController.verify,
);

router.patch(
  "/:id/unverify",
  authMiddleware,
  requireAdmin,
  adminCompanyController.unverify,
);

export default router;
