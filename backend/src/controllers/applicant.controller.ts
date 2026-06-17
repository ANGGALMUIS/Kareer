import { Request, Response } from "express";

import applicantService from "../services/applicant.service";

class ApplicantController {
  async profile(req: Request, res: Response) {
    try {
      const profile = await applicantService.getProfile(req.user!.userId);

      return res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const profile = await applicantService.updateProfile(
        req.user!.userId,
        req.body,
      );

      return res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async publicProfile(req: Request, res: Response) {
    try {
      const profile = await applicantService.getPublicProfile(req.params.id as string);

      return res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new ApplicantController();
