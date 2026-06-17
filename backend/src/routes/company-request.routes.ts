import { Router } from "express";

import { companyRequestController } from "../controllers/company-request.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  (req, res, next) => {
    next();
  },
  companyRequestController.create,
);

router.get("/admin", authMiddleware, companyRequestController.getAll);

router.patch("/:id/approve", authMiddleware, companyRequestController.approve);

router.patch("/:id/reject", authMiddleware, companyRequestController.reject);
router.get("/my", authMiddleware, companyRequestController.myRequests);
export default router;
