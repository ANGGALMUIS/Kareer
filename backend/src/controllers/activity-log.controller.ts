import { Request, Response } from "express";

import activityLogService from "../services/activity-log.service";

class ActivityLogController {
  async latest(req: Request, res: Response) {
    try {
      const data = await activityLogService.latest();

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

export default new ActivityLogController();
