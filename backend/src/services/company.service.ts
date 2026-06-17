import prisma from "../config/prisma";

import { ApplyCompanyInput } from "../validations/company.schema";
import { JobStatus, ApplicationStatus } from "@prisma/client";

class CompanyService {
  async applyCompany(userId: string, data: ApplyCompanyInput) {
    const existingCompany = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (existingCompany) {
      throw new Error("Anda sudah pernah mengajukan perusahaan");
    }

    const company = await prisma.company.create({
      data: {
        userId,

        name: data.name,

        industry: data.industry,

        description: data.description,

        website: data.website,

        address: data.address,

        profileCompleted: false,
      },
    });

    return company;
  }

  async getProfile(userId: string) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    return company;
  }

  async updateProfile(userId: string, data: ApplyCompanyInput) {
    return prisma.company.upsert({
      where: {
        userId,
      },

      update: {
        ...data,
        profileCompleted: true,
      },

      create: {
        userId,
        ...data,
        profileCompleted: true,
      },
    });
  }

  async activateCompany(userId: string) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    await prisma.company.update({
      where: {
        userId,
      },
      data: {
        verificationStatus: "APPROVED",
        verifiedAt: new Date(),
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: "COMPANY",
      },
    });

    return {
      message: "Perusahaan berhasil diaktifkan",
    };
  }

  async getPublicCompany(companyId: string) {
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },

      include: {
        jobs: {
          where: {
            status: JobStatus.OPEN,
          },

          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    return company;
  }

  async getPublicCompanies() {
    return prisma.company.findMany({
      where: {
        verificationStatus: "APPROVED",
      },

      select: {
        id: true,
        name: true,
        industry: true,
        description: true,
        website: true,
        address: true,
        logoUrl: true,

        _count: {
          select: {
            jobs: {
              where: {
                status: "OPEN",
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getDashboardStats(userId: string) {
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

    const totalApplicants = await prisma.application.count({
      where: {
        jobListing: {
          companyId: company.id,
        },
      },
    });

    return {
      totalJobs,
      activeJobs,
      totalApplicants,
    };
  }

  async getRecentApplicants(userId: string) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    return prisma.application.findMany({
      where: {
        jobListing: {
          companyId: company.id,
        },
      },

      include: {
        user: {
          include: {
            applicantProfile: true,
          },
        },

        jobListing: true,
      },

      orderBy: {
        appliedAt: "desc",
      },

      take: 5,
    });
  }

  async getApplications(userId: string) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    return prisma.application.findMany({
      where: {
        jobListing: {
          companyId: company.id,
        },
      },
      include: {
        user: {
          include: {
            applicantProfile: true,
          },
        },
        jobListing: true,
      },
      orderBy: {
        appliedAt: "desc",
      },
    });
  }

  async getAnalytics(userId: string) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    const [
      totalJobs,
      activeJobs,
      totalApplicants,

      review,
      interview,
      accepted,
      rejected,

      jobs,
    ] = await Promise.all([
      prisma.jobListing.count({
        where: {
          companyId: company.id,
        },
      }),

      prisma.jobListing.count({
        where: {
          companyId: company.id,
          status: JobStatus.OPEN,
        },
      }),

      prisma.application.count({
        where: {
          jobListing: {
            companyId: company.id,
          },
        },
      }),

      prisma.application.count({
        where: {
          jobListing: {
            companyId: company.id,
          },
          status: ApplicationStatus.REVIEW,
        },
      }),

      prisma.application.count({
        where: {
          jobListing: {
            companyId: company.id,
          },
          status: ApplicationStatus.INTERVIEW,
        },
      }),

      prisma.application.count({
        where: {
          jobListing: {
            companyId: company.id,
          },
          status: ApplicationStatus.ACCEPTED,
        },
      }),

      prisma.application.count({
        where: {
          jobListing: {
            companyId: company.id,
          },
          status: ApplicationStatus.REJECTED,
        },
      }),

      prisma.jobListing.findMany({
        where: {
          companyId: company.id,
        },

        include: {
          _count: {
            select: {
              applications: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return {
      totalJobs,
      activeJobs,
      totalApplicants,

      review,
      interview,
      accepted,
      rejected,

      jobs: jobs.map((job) => ({
        id: job.id,
        title: job.title,
        applicants: job._count.applications,
      })),
    };
  }
}

export default new CompanyService();
