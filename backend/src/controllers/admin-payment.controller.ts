import { Request, Response } from "express";

import adminPaymentService from "../services/admin-payment.service";

class AdminPaymentController {
  async getPayments(req: Request, res: Response) {
    try {
      const payments = await adminPaymentService.getPayments();

      return res.json({
        success: true,
        data: payments,
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
      const payment = await adminPaymentService.approvePayment(
        req.params.id as string,
      );

      return res.json({
        success: true,
        message: "Payment approved",
        data: payment,
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
      const payment = await adminPaymentService.rejectPayment(
        req.params.id as string,
        req.body.reason,
      );

      return res.json({
        success: true,
        message: "Payment rejected",
        data: payment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new AdminPaymentController();
