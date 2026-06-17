import { Request, Response } from "express";

import authService from "../services/auth.service";

import { registerSchema, loginSchema } from "../validations/auth.schema";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const validatedData = registerSchema.parse(req.body);

      const user = await authService.register(validatedData);

      return res.status(201).json({
        success: true,
        message: "Register berhasil",
        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);

      const result = await authService.login(validatedData);

      return res.status(200).json({
        success: true,
        message: "Login berhasil",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async me(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      data: req.user,
    });
  }

  async changePassword(req: Request, res: Response) {
    try {
      await authService.changePassword(
        req.user!.userId,

        req.body.currentPassword,

        req.body.newPassword,
      );

      return res.json({
        success: true,
        message: "Password berhasil diperbarui",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async changeEmail(req: Request, res: Response) {
    try {
      const user = await authService.changeEmail(
        req.user!.userId,
        req.body.email,
      );

      return res.json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const data = await authService.forgotPassword(req.body.email);

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

  async resetPassword(req: Request, res: Response) {
    try {
      const data = await authService.resetPassword(
        req.body.token,
        req.body.password,
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
}

export default new AuthController();
