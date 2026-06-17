import { Request, Response } from "express";

import companyService from "../services/company.service";

import { applyCompanySchema } from "../validations/company.schema";
class CompanyController {
  async apply(req: Request, res: Response) {
    try {
      const validatedData = applyCompanySchema.parse(req.body);

      const company = await companyService.applyCompany(
        req.user!.userId,
        validatedData,
      );

      return res.status(201).json({
        success: true,
        message: "Pengajuan perusahaan berhasil",
        data: company,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async profile(req: Request, res: Response) {
    try {
      const company = await companyService.getProfile((req as any).user.userId);

      return res.status(200).json({
        success: true,
        data: company,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const validatedData = applyCompanySchema.parse(req.body);

      const company = await companyService.updateProfile(
        req.user!.userId,
        validatedData,
      );

      return res.status(200).json({
        success: true,
        message: "Profil perusahaan berhasil diperbarui",
        data: company,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async activate(req: Request, res: Response) {
    try {
      const result = await companyService.activateCompany(req.user!.userId);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async publicCompany(req: Request, res: Response) {
    try {
      const company = await companyService.getPublicCompany(
        req.params.id as string,
      );

      return res.status(200).json({
        success: true,
        data: company,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async publicCompanies(req: Request, res: Response) {
    try {
      const companies = await companyService.getPublicCompanies();

      return res.status(200).json({
        success: true,
        data: companies,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async dashboardStats(req: Request, res: Response) {
    try {
      console.log("DASHBOARD CONTROLLER HIT");

      const stats = await companyService.getDashboardStats(
        (req as any).user.userId,
      );

      console.log("STATS:", stats);

      return res.json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      console.log("DASHBOARD ERROR:");
      console.log(error);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async recentApplicants(req: Request, res: Response) {
    try {
      const applicants = await companyService.getRecentApplicants(
        (req as any).user.userId,
      );

      return res.json({
        success: true,
        data: applicants,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async applications(req: Request, res: Response) {
    try {
      const applications = await companyService.getApplications(
        (req as any).user.userId,
      );

      res.json({
        success: true,
        data: applications,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async analytics(req: Request, res: Response) {
    try {
      const data = await companyService.getAnalytics((req as any).user.userId);

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

export default new CompanyController();
