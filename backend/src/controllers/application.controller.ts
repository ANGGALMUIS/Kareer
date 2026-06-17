import { Request, Response } from "express";

import applicationService from "../services/application.service";

import {
  applyJobSchema,
  updateApplicationStatusSchema,
} from "../validations/application.schema";
import { SrvRecord } from "dns";

class ApplicationController {
  async apply(req: Request, res: Response) {
    try {
      const validatedData = applyJobSchema.parse({
        ...req.body,
      });

      const application = await applicationService.applyJob(
        req.user!.userId,
        validatedData,
        (req as any).file,
      );

      return res.status(201).json({
        success: true,
        data: application,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async companyApplications(req: Request, res: Response) {
    const page = Number(req.query.page || 1);

    const limit = Number(req.query.limit || 10);

    const result = await applicationService.getCompanyApplications(
      req.user!.userId,
      page,
      limit,
      req.query.keyword as string,
      req.query.status as string,
    );

    return res.status(200).json({
      success: true,
      ...result,
    });
  }

  async updateStatus(req: Request, res: Response) {
    const { status } = updateApplicationStatusSchema.parse(req.body);

    const result = await applicationService.updateStatus(
      req.user!.userId,
      req.params.id as string,
      status,
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  }

  async myApplications(req: Request, res: Response) {
    const data = await applicationService.myApplications(req.user!.userId);

    return res.status(200).json({
      success: true,
      data,
    });
  }

  async exportCompanyApplications(req: Request, res: Response) {
    const data = await applicationService.exportCompanyApplications(
      req.user!.userId,
    );

    return res.status(200).json({
      success: true,
      data,
    });
  }

  async notifyCvViewed(req: Request, res: Response) {
    const result = await applicationService.notifyCvViewed(
      req.user!.userId,
      req.params.id as string,
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  }

  async notifyAssessmentViewed(req: Request, res: Response) {
    const result = await applicationService.notifyAssessmentViewed(
      req.user!.userId,
      req.params.id as string,
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  }
}

export default new ApplicationController();
