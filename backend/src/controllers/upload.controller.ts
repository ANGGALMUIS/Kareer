import { Request, Response } from "express";

import uploadService from "../services/upload.service";

class UploadController {
  async uploadCV(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File wajib diupload",
        });
      }

      const profile = await uploadService.saveCV(
        req.user!.userId,
        (req.file as any).path,
      );

      return res.status(200).json({
        success: true,
        message: "CV berhasil diupload",
        data: profile,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async uploadCompanyLogo(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Logo wajib diupload",
        });
      }

      return res.status(200).json({
        success: true,

        data: {
          logoUrl: (req.file as any).path,
        },
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async uploadPaymentProof(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Bukti pembayaran wajib diupload",
        });
      }

      return res.status(200).json({
        success: true,

        data: {
          paymentProofUrl: (req.file as any).path,
        },
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async uploadProposal(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Proposal wajib diupload",
        });
      }

      return res.status(200).json({
        success: true,

        data: {
          proposalUrl: (req.file as any).path,
        },
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new UploadController();
