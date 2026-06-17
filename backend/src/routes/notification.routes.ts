import { Router } from "express";

import notificationController from "../controllers/notification.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, notificationController.getAll);

router.patch("/:id/read", authMiddleware, notificationController.read);

router.patch("/read-all", authMiddleware, notificationController.readAll);

export default router;
