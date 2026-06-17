import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import { applicantSubscriptionController } from "../controllers/applicant-subscription.controller";

const router = Router();

router.get("/my", authMiddleware, applicantSubscriptionController.my);

router.post("/", authMiddleware, applicantSubscriptionController.create);

router.get("/admin", authMiddleware, applicantSubscriptionController.getAll);

router.patch(
  "/:id/approve",
  authMiddleware,
  applicantSubscriptionController.approve,
);

router.patch(
  "/:id/reject",
  authMiddleware,
  applicantSubscriptionController.reject,
);

export default router;
