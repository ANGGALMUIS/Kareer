import { Router } from "express";

import uploadController from "../controllers/upload.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

import {
  uploadCV,
  uploadCompanyLogo,
  uploadProposal,
} from "../middlewares/upload.middleware";

const router = Router();

router.post(
  "/cv",
  authMiddleware,
  uploadCV.single("cv"),
  uploadController.uploadCV,
);

router.post(
  "/company-logo",
  authMiddleware,
  uploadCompanyLogo.single("logo"),
  uploadController.uploadCompanyLogo,
);

router.post(
  "/payment-proof",
  authMiddleware,
  uploadCompanyLogo.single("paymentProof"),
  uploadController.uploadPaymentProof,
);

router.post(
  "/proposal",
  authMiddleware,
  uploadProposal.single("proposal"),
  uploadController.uploadProposal,
);

export default router;
