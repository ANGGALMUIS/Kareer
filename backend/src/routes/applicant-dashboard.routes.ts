import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import applicantDashboardController from "../controllers/applicant-dashboard.controller";

const router = Router();

router.get("/", authMiddleware, applicantDashboardController.getDashboard);

export default router;
