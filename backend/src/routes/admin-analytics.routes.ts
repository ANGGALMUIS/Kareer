import { Router } from "express";

import adminAnalyticsController from "../controllers/admin-analytics.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get("/", authMiddleware, requireAdmin, adminAnalyticsController.get);

export default router;
