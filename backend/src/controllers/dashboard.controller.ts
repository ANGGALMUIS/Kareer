import { Request, Response } from "express";

import dashboardService from "../services/dashboard.service";

class DashboardController {
  async company(req: Request, res: Response) {
    const data = await dashboardService.companyStats(req.user!.userId);

    return res.json({
      success: true,
      data,
    });
  }

  async applicant(req: Request, res: Response) {
    const data = await dashboardService.applicantStats(req.user!.userId);

    return res.json({
      success: true,
      data,
    });
  }

  async admin(req: Request, res: Response) {
    const data = await dashboardService.adminStats();

    return res.json({
      success: true,
      data,
    });
  }
}

export default new DashboardController();
