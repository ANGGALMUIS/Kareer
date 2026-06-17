import { Request, Response } from "express";

import profileService from "../services/profile.service";

import {
  createProfileSchema,
  updateProfileSchema,
} from "../validations/profile.schema";

class ProfileController {
  async create(req: Request, res: Response) {
    try {
      const data = createProfileSchema.parse(req.body);

      const profile = await profileService.createProfile(
        req.user!.userId,
        data,
      );

      return res.status(201).json({
        success: true,
        data: profile,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async me(req: Request, res: Response) {
    try {
      const profile = await profileService.getMyProfile(req.user!.userId);

      return res.status(200).json({
        success: true,
        data: profile,
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
      const data = updateProfileSchema.parse(req.body);

      const profile = await profileService.updateProfile(
        req.user!.userId,
        data,
      );

      return res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new ProfileController();
