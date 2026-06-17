import { Request, Response } from "express";

import paymentService from "../services/payment.service";

import { createPaymentSchema } from "../validations/payment.schema";

class PaymentController {
  async create(req: Request, res: Response) {
    try {
      const data = createPaymentSchema.parse(req.body);

      const payment = await paymentService.createPayment(
        req.user!.userId,
        data,
      );

      return res.status(201).json({
        success: true,
        data: payment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async myPayments(req: Request, res: Response) {
    try {
      const payments = await paymentService.myPayments(req.user!.userId);

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
}

export default new PaymentController();
