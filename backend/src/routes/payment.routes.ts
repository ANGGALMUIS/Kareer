import { Router } from "express";

import paymentController from "../controllers/payment.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

import { requireCompany } from "../middlewares/role.middleware";

const router = Router();

router.post("/", authMiddleware, requireCompany, paymentController.create);

router.get("/my", authMiddleware, requireCompany, paymentController.myPayments);

export default router;
