import { Request, Response } from "express";

import savedJobService from "../services/saved-job.service";

class SavedJobController {
  async save(req: Request, res: Response) {
    try {
      const data = await savedJobService.saveJob(
        req.user!.userId,
        req.params.jobId as string,
      );

      return res.status(201).json({
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

  async remove(req: Request, res: Response) {
    try {
      const data = await savedJobService.removeSavedJob(
        req.user!.userId,
        req.params.jobId as string,
      );

      return res.json({
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

  async getAll(req: Request, res: Response) {
    try {
      const data = await savedJobService.getSavedJobs(req.user!.userId);

      return res.json({
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

export default new SavedJobController();
