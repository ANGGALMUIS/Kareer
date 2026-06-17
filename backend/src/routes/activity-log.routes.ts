import { Router } from "express";

import activityLogController from "../controllers/activity-log.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get("/", authMiddleware, requireAdmin, activityLogController.latest);

export default router;
