import { Router } from "express";

import authController from "../controllers/auth.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/me", authMiddleware, authController.me);

router.put("/change-password", authMiddleware, authController.changePassword);

router.put("/change-email", authMiddleware, authController.changeEmail);

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password", authController.resetPassword);
export default router;
