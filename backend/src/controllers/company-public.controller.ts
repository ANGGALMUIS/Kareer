import { Request, Response } from "express";

import companyPublicService from "../services/company-public.service";

class CompanyPublicController {
  async getById(req: Request, res: Response) {
    try {
      const company = await companyPublicService.getCompany(
        req.params.id as string,
      );

      return res.json({
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
}

export default new CompanyPublicController();
