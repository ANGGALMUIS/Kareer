import { Router } from "express";

import companyController from "../controllers/company.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { requireCompany } from "../middlewares/role.middleware";
const router = Router();

router.post("/apply", authMiddleware, companyController.apply);

router.get("/profile", authMiddleware, companyController.profile);

router.put("/profile", authMiddleware, companyController.update);

router.post("/activate", authMiddleware, companyController.activate);

router.get(
  "/dashboard-stats",
  authMiddleware,
  companyController.dashboardStats,
);

router.get(
  "/recent-applicants",
  authMiddleware,
  companyController.recentApplicants,
);

router.get(
  "/applications",
  authMiddleware,
  requireCompany,
  companyController.applications,
);

router.get(
  "/analytics",
  authMiddleware,
  requireCompany,
  companyController.analytics,
);

router.get("/", companyController.publicCompanies);

router.get("/:id", companyController.publicCompany);

export default router;
