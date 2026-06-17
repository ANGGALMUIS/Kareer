import prisma from "../config/prisma";

class ApplicantDashboardService {
  async getDashboard(userId: string) {
    const [totalApplications, interviews, accepted, rejected, subscription] =
      await Promise.all([
        prisma.application.count({
          where: {
            userId,
          },
        }),

        prisma.application.count({
          where: {
            userId,
            status: "INTERVIEW",
          },
        }),

        prisma.application.count({
          where: {
            userId,
            status: "ACCEPTED",
          },
        }),

        prisma.application.count({
          where: {
            userId,
            status: "REJECTED",
          },
        }),

        prisma.applicantSubscription.findUnique({
          where: {
            userId,
          },
        }),
      ]);

    const activeApplications = await prisma.application.count({
      where: {
        userId,

        status: {
          in: ["SUBMITTED", "REVIEW", "INTERVIEW"],
        },
      },
    });

    const isPremium = subscription?.status === "ACTIVE";

    return {
      stats: {
        totalApplications,
        interviews,
        accepted,
        rejected,
      },

      plan: isPremium ? "PREMIUM" : "FREE",

      activeApplications,

      remaining: isPremium ? "Unlimited" : Math.max(0, 5 - activeApplications),

      subscription,
    };
  }
}

export default new ApplicantDashboardService();
