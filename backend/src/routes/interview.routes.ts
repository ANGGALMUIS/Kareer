import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import interviewController from "../controllers/interview.controller";

const router = Router();

router.post("/", authMiddleware, interviewController.create);
router.get("/my", authMiddleware, interviewController.myInterviews);
router.get("/company", authMiddleware, interviewController.companyInterviews);
router.get("/:applicationId", authMiddleware, interviewController.get);

router.put("/:id", authMiddleware, interviewController.update);

router.delete("/:id", authMiddleware, interviewController.delete);

export default router;
