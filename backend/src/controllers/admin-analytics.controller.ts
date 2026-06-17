import { Request, Response } from "express";

import adminAnalyticsService from "../services/admin-analytics.service";

class AdminAnalyticsController {
  async get(req: Request, res: Response) {
    try {
      const data = await adminAnalyticsService.getAnalytics();

      return res.json({
        success: true,
        data,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new AdminAnalyticsController();
