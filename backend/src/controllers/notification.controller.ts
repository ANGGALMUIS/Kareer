import { Request, Response } from "express";

import notificationService from "../services/notification.service";

class NotificationController {
  async getAll(req: Request, res: Response) {
    const data = await notificationService.getNotifications(req.user!.userId);

    return res.json({
      success: true,
      data,
    });
  }

  async read(req: Request, res: Response) {
    const data = await notificationService.markAsRead(
      req.user!.userId,
      req.params.id as string,
    );

    return res.json({
      success: true,
      data,
    });
  }

  async readAll(req: Request, res: Response) {
    const data = await notificationService.markAllAsRead(req.user!.userId);

    return res.json({
      success: true,
      data,
    });
  }
}

export default new NotificationController();
