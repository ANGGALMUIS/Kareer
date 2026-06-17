import { Router } from "express";

import companyPublicController from "../controllers/company-public.controller";

const router = Router();

router.get("/:id", companyPublicController.getById);

export default router;
