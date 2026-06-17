import { Router } from "express";

import adminPaymentController from "../controllers/admin-payment.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/payments",
  authMiddleware,
  requireAdmin,
  adminPaymentController.getPayments,
);

router.patch(
  "/payments/:id/approve",
  authMiddleware,
  requireAdmin,
  adminPaymentController.approve,
);

router.patch(
  "/payments/:id/reject",
  authMiddleware,
  requireAdmin,
  adminPaymentController.reject,
);

export default router;
