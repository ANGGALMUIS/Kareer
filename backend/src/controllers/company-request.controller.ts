import { Request, Response } from "express";

import { createCompanyRequestSchema } from "../validations/company-request.schema";

import { companyRequestService } from "../services/company-request.service";

export class CompanyRequestController {
  async create(req: Request, res: Response) {
    try {
      const data = createCompanyRequestSchema.parse(req.body);

      const request = await companyRequestService.create(
        (req as any).user.userId,
        data,
      );

      return res.status(201).json({
        success: true,
        message: "Pengajuan berhasil dikirim",
        data: request,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async myRequests(req: Request, res: Response) {
    try {
      const requests = await companyRequestService.getMyRequests(
        (req as any).user.userId,
      );

      return res.status(200).json({
        success: true,
        data: requests,
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
      const requests = await companyRequestService.getAll();

      return res.status(200).json({
        success: true,
        data: requests,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async approve(req: Request, res: Response) {
    try {
      const request = await companyRequestService.approve(req.params.id as string);

      return res.status(200).json({
        success: true,
        message: "Pengajuan disetujui",
        data: request,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async reject(req: Request, res: Response) {
    try {
      const request = await companyRequestService.reject(
        req.params.id as string,
        req.body.reason,
      );

      return res.status(200).json({
        success: true,
        message: "Pengajuan ditolak",
        data: request,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export const companyRequestController = new CompanyRequestController();
