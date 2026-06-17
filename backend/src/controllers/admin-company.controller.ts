import { Request, Response } from "express";

import adminCompanyService from "../services/admin-company.service";

import { rejectCompanySchema } from "../validations/company-verification.schema";

class AdminCompanyController {
  async getPending(req: Request, res: Response) {
    const data = await adminCompanyService.getPendingCompanies();

    return res.json({
      success: true,
      data,
    });
  }

  async approve(req: Request, res: Response) {
    const company = await adminCompanyService.approveCompany(
      req.params.id as string,
    );

    return res.json({
      success: true,
      data: company,
    });
  }

  async reject(req: Request, res: Response) {
    const { reason } = rejectCompanySchema.parse(req.body);

    const company = await adminCompanyService.rejectCompany(
      req.params.id as string,
      reason,
    );

    return res.json({
      success: true,
      data: company,
    });
  }

  async verify(req: Request, res: Response) {
    try {
      const data = await adminCompanyService.verifyCompany(
        req.params.id as string,
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

  async unverify(req: Request, res: Response) {
    try {
      const data = await adminCompanyService.unverifyCompany(
        req.params.id as string,
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
    const data = await adminCompanyService.getAllCompanies();

    return res.json({
      success: true,
      data,
    });
  }
}

export default new AdminCompanyController();
