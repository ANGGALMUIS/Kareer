import { Router } from "express";

import applicationController from "../controllers/application.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

import { requireCompany } from "../middlewares/role.middleware";

import { uploadAssessmentAnswer } from "../middlewares/upload.middleware";
const router = Router();

router.post(
  "/",
  authMiddleware,
  uploadAssessmentAnswer.single("assessmentAnswer"),
  applicationController.apply,
);

router.get("/my", authMiddleware, applicationController.myApplications);

router.get(
  "/company",
  authMiddleware,
  requireCompany,
  applicationController.companyApplications,
);

router.get(
  "/company/export",
  authMiddleware,
  requireCompany,
  applicationController.exportCompanyApplications,
);

router.patch(
  "/:id/status",
  authMiddleware,
  requireCompany,
  applicationController.updateStatus,
);

router.post(
  "/:id/view-cv",
  authMiddleware,
  requireCompany,
  applicationController.notifyCvViewed,
);

router.post(
  "/:id/view-assessment",
  authMiddleware,
  requireCompany,
  applicationController.notifyAssessmentViewed,
);

export default router;
