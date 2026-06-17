import prisma from "../config/prisma";

import { SubscriptionPlanType } from "@prisma/client";

import { CreatePaymentInput } from "../validations/payment.schema";

class PaymentService {
  async createPayment(userId: string, data: CreatePaymentInput) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    let amount = 0;

    if (data.plan === "BASIC") {
      amount = 100000;
    }

    if (data.plan === "PREMIUM") {
      amount = 250000;
    }

    const payment = await prisma.payment.create({
      data: {
        companyId: company.id,

        plan: data.plan as SubscriptionPlanType,

        bankName: data.bankName,

        accountNumber: data.accountNumber,

        accountHolder: data.accountHolder,

        paymentProofUrl: data.paymentProofUrl,

        amount,
      },
    });

    return payment;
  }

  async myPayments(userId: string) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    return prisma.payment.findMany({
      where: {
        companyId: company.id,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default new PaymentService();
