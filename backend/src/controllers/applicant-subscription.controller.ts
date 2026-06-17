import { Request, Response } from "express";

import { applicantSubscriptionService } from "../services/applicant-subscription.service";

class ApplicantSubscriptionController {
  async my(req: Request, res: Response) {
    try {
      const subscription = await applicantSubscriptionService.getMySubscription(
        (req as any).user.userId,
      );

      res.json({
        success: true,
        data: subscription,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const subscription = await applicantSubscriptionService.create(
        (req as any).user.userId,
        req.body.paymentProof,
      );

      res.status(201).json({
        success: true,
        data: subscription,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const data = await applicantSubscriptionService.getAll();

      res.json({
        success: true,
        data,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async approve(req: Request, res: Response) {
    try {
      const data = await applicantSubscriptionService.approve(req.params.id as string);

      res.json({
        success: true,
        data,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async reject(req: Request, res: Response) {
    try {
      const data = await applicantSubscriptionService.reject(req.params.id as string);

      res.json({
        success: true,
        data,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export const applicantSubscriptionController =
  new ApplicantSubscriptionController();
