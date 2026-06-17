import prisma from "../config/prisma";

import { PaymentStatus, SubscriptionStatus } from "@prisma/client";

import notificationService from "./notification.service";

class AdminPaymentService {
  async getPayments() {
    return prisma.payment.findMany({
      include: {
        company: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async approvePayment(paymentId: string) {
    const payment = await prisma.payment.findUnique({
      where: {
        id: paymentId,
      },
    });

    if (!payment) {
      throw new Error("Payment tidak ditemukan");
    }

    if (payment.status !== PaymentStatus.PENDING) {
      throw new Error("Payment sudah diproses");
    }

    const updatedPayment = await prisma.payment.update({
      where: {
        id: paymentId,
      },

      data: {
        status: PaymentStatus.APPROVED,

        approvedAt: new Date(),
      },
    });

    await prisma.companySubscription.create({
      data: {
        companyId: payment.companyId,

        plan: payment.plan,

        status: SubscriptionStatus.ACTIVE,
      },
    });

    const company = await prisma.company.findUnique({
      where: {
        id: payment.companyId,
      },
    });

    if (company) {
      await notificationService.createNotification(
        company.userId,
        "Pembayaran Disetujui",
        `Paket ${payment.plan} berhasil diaktifkan.`,
      );
    }

    return updatedPayment;
  }

  async rejectPayment(paymentId: string, reason: string) {
    const payment = await prisma.payment.findUnique({
      where: {
        id: paymentId,
      },
    });

    if (!payment) {
      throw new Error("Payment tidak ditemukan");
    }

    const updatedPayment = await prisma.payment.update({
      where: {
        id: paymentId,
      },

      data: {
        status: PaymentStatus.REJECTED,

        rejectionReason: reason,
      },
    });

    const company = await prisma.company.findUnique({
      where: {
        id: payment.companyId,
      },
    });

    if (company) {
      await notificationService.createNotification(
        company.userId,
        "Pembayaran Ditolak",
        `Pembayaran ditolak: ${reason}`,
      );
    }

    return updatedPayment;
  }
}

export default new AdminPaymentService();
