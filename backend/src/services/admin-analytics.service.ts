import prisma from "../config/prisma";

import {
  PaymentStatus,
  VerificationStatus,
  JobStatus,
  SubscriptionStatus,
} from "@prisma/client";

class AdminAnalyticsService {
  async getAnalytics() {
    const [
      totalUsers,
      totalApplicants,
      totalCompanies,
      verifiedCompanies,

      totalJobs,
      activeJobs,

      totalApplications,

      totalPayments,
      approvedPayments,

      approvedRevenue,

      activeApplicantSubscriptions,
    ] = await Promise.all([
      prisma.user.count(),

      prisma.user.count({
        where: {
          role: "APPLICANT",
        },
      }),

      prisma.user.count({
        where: {
          role: "COMPANY",
        },
      }),

      prisma.company.count({
        where: {
          verificationStatus: VerificationStatus.APPROVED,
        },
      }),

      prisma.jobListing.count(),

      prisma.jobListing.count({
        where: {
          status: JobStatus.OPEN,
        },
      }),

      prisma.application.count(),

      prisma.payment.count(),

      prisma.payment.count({
        where: {
          status: PaymentStatus.APPROVED,
        },
      }),

      prisma.payment.aggregate({
        where: {
          status: PaymentStatus.APPROVED,
        },

        _sum: {
          amount: true,
        },
      }),

      prisma.applicantSubscription.count({
        where: {
          status: SubscriptionStatus.ACTIVE,
        },
      }),
    ]);

    const companyRevenue = approvedRevenue._sum.amount || 0;

    const applicantRevenue = activeApplicantSubscriptions * 50000;

    const totalRevenue = companyRevenue + applicantRevenue;

    return {
      users: {
        total: totalUsers,
        applicants: totalApplicants,
        companies: totalCompanies,
      },

      companies: {
        verified: verifiedCompanies,
      },

      jobs: {
        total: totalJobs,
        active: activeJobs,
      },

      applications: {
        total: totalApplications,
      },

      payments: {
        total: totalPayments,
        approved: approvedPayments,
      },

      revenue: totalRevenue,

      revenueBreakdown: {
        companyRevenue,
        applicantRevenue,
        activeApplicantSubscriptions,
      },
    };
  }
}

export default new AdminAnalyticsService();
