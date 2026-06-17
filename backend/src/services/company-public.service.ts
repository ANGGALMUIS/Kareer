import prisma from "../config/prisma";

class CompanyPublicService {
  async getCompany(companyId: string) {
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },

      include: {
        jobs: {
          where: {
            status: "OPEN",
          },

          orderBy: {
            createdAt: "desc",
          },
        },

        subscriptions: {
          where: {
            status: "ACTIVE",
          },

          orderBy: {
            createdAt: "desc",
          },

          take: 1,
        },
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    const totalJobs = await prisma.jobListing.count({
      where: {
        companyId,
      },
    });

    const totalApplications = await prisma.application.count({
      where: {
        jobListing: {
          companyId,
        },
      },
    });

    return {
      ...company,

      stats: {
        totalJobs,
        activeJobs: company.jobs.length,
        totalApplications,
      },

      activeSubscription:
        company.subscriptions.length > 0 ? company.subscriptions[0] : null,
    };
  }
}

export default new CompanyPublicService();
