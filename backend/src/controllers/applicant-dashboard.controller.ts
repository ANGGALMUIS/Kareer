import { Request, Response } from "express";

import applicantDashboardService from "../services/applicant-dashboard.service";

class ApplicantDashboardController {
  async getDashboard(req: Request, res: Response) {
    try {
      const data = await applicantDashboardService.getDashboard(
        req.user!.userId,
      );

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new ApplicantDashboardController();
