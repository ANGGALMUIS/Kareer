import { Request, Response } from "express";

import interviewService from "../services/interview.service";

class InterviewController {
  async create(req: Request, res: Response) {
    try {
      const interview = await interviewService.createInterview(
        req.user!.userId,
        req.body.applicationId,
        req.body,
      );

      return res.status(201).json({
        success: true,
        data: interview,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const interview = await interviewService.getInterview(
        req.params.applicationId as string,
      );

      return res.json({
        success: true,
        data: interview,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const interview = await interviewService.updateInterview(
        req.user!.userId,
        req.params.id as string,
        req.body,
      );

      return res.json({
        success: true,
        data: interview,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await interviewService.deleteInterview(req.user!.userId, req.params.id as string);

      return res.json({
        success: true,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async myInterviews(req: any, res: Response) {
    try {
      const interviews = await interviewService.getMyInterviews(
        req.user.userId,
      );

      return res.json({
        success: true,
        data: interviews,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async companyInterviews(req: any, res: Response) {
    try {
      const page = Number(req.query.page || 1);

      const limit = Number(req.query.limit || 10);

      const result = await interviewService.getCompanyInterviews(
        req.user.userId,
        page,
        limit,
      );

      return res.json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new InterviewController();
