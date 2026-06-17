import { Router } from "express";

import profileController from "../controllers/profile.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, profileController.create);

router.get("/me", authMiddleware, profileController.me);

router.patch("/me", authMiddleware, profileController.update);

export default router;
