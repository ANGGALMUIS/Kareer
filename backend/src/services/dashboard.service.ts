import prisma from "../config/prisma";

class DashboardService {
  async companyStats(userId: string) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    const totalJobs = await prisma.jobListing.count({
      where: {
        companyId: company.id,
      },
    });

    const activeJobs = await prisma.jobListing.count({
      where: {
        companyId: company.id,
        status: "OPEN",
      },
    });

    const totalApplications = await prisma.application.count({
      where: {
        jobListing: {
          companyId: company.id,
        },
      },
    });

    const acceptedApplications = await prisma.application.count({
      where: {
        jobListing: {
          companyId: company.id,
        },
        status: "ACCEPTED",
      },
    });

    const rejectedApplications = await prisma.application.count({
      where: {
        jobListing: {
          companyId: company.id,
        },
        status: "REJECTED",
      },
    });

    return {
      totalJobs,
      activeJobs,
      totalApplications,
      acceptedApplications,
      rejectedApplications,
    };
  }

  async applicantStats(userId: string) {
    const totalApplications = await prisma.application.count({
      where: {
        userId,
      },
    });

    const submitted = await prisma.application.count({
      where: {
        userId,
        status: "SUBMITTED",
      },
    });

    const review = await prisma.application.count({
      where: {
        userId,
        status: "REVIEW",
      },
    });

    const interview = await prisma.application.count({
      where: {
        userId,
        status: "INTERVIEW",
      },
    });

    const accepted = await prisma.application.count({
      where: {
        userId,
        status: "ACCEPTED",
      },
    });

    const rejected = await prisma.application.count({
      where: {
        userId,
        status: "REJECTED",
      },
    });

    return {
      totalApplications,
      submitted,
      review,
      interview,
      accepted,
      rejected,
    };
  }

  async adminStats() {
    const users = await prisma.user.count();

    const companies = await prisma.company.count();

    const pendingCompanies = await prisma.company.count({
      where: {
        verificationStatus: "PENDING",
      },
    });

    const jobs = await prisma.jobListing.count();

    const applications = await prisma.application.count();

    const pendingPayments = await prisma.payment.count({
      where: {
        status: "PENDING",
      },
    });

    return {
      users,
      companies,
      pendingCompanies,
      jobs,
      applications,
      pendingPayments,
    };
  }
}

export default new DashboardService();
