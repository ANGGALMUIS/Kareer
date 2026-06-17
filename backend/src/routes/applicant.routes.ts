import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import applicantController from "../controllers/applicant.controller";

const router = Router();

router.get("/profile", authMiddleware, applicantController.profile);

router.put("/profile", authMiddleware, applicantController.updateProfile);

router.get("/:id", applicantController.publicProfile);

export default router;
