import { Router } from "express";

import jobController from "../controllers/job.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

import { requireCompany } from "../middlewares/role.middleware";

import { checkJobLimit } from "../middlewares/subscription.middleware";

import { uploadAssessment } from "../middlewares/upload.middleware";
const router = Router();

router.post(
  "/",
  authMiddleware,
  requireCompany,
  checkJobLimit,
  uploadAssessment.single("assessmentFile"),
  jobController.create,
);

router.get("/", jobController.getAll);
router.get("/my", authMiddleware, requireCompany, jobController.myJobs);
router.put("/:id", authMiddleware, requireCompany, jobController.update);
router.delete("/:id", authMiddleware, requireCompany, jobController.delete);
router.get("/:id", jobController.getById);

export default router;
