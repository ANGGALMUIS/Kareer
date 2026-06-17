import  prisma  from "../config/prisma";

class ApplicantSubscriptionService {
  async getMySubscription(userId: string) {
    return prisma.applicantSubscription.findUnique({
      where: {
        userId,
      },
    });
  }

  async create(userId: string, paymentProof: string) {
    const existing = await prisma.applicantSubscription.findUnique({
      where: {
        userId,
      },
    });

    if (existing) {
      throw new Error("Pengajuan subscription sudah ada");
    }

    return prisma.applicantSubscription.create({
      data: {
        userId,
        plan: "PREMIUM",
        paymentProof,
        status: "PENDING",
      },
    });
  }

  async getAll() {
    return prisma.applicantSubscription.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async approve(id: string) {
    return prisma.applicantSubscription.update({
      where: {
        id,
      },

      data: {
        status: "ACTIVE",

        startDate: new Date(),

        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  async reject(id: string) {
    return prisma.applicantSubscription.update({
      where: {
        id,
      },

      data: {
        status: "REJECTED",
      },
    });
  }
}

export const applicantSubscriptionService = new ApplicantSubscriptionService();
