import prisma from "../config/prisma";

import { CreateJobInput } from "../validations/job.schema";

class JobService {
  async createJob(
    userId: string,
    data: CreateJobInput,
    file?: Express.Multer.File,
  ) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    const activeSubscription = await prisma.companySubscription.findFirst({
      where: {
        companyId: company.id,
        status: "ACTIVE",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const currentPlan = activeSubscription?.plan || "FREE";

    const activeJobs = await prisma.jobListing.count({
      where: {
        companyId: company.id,
        status: "OPEN",
      },
    });

    let limit = 2;

    if (currentPlan === "BASIC") {
      limit = 10;
    }

    if (currentPlan === "PREMIUM") {
      limit = Number.MAX_SAFE_INTEGER;
    }

    if (activeJobs >= limit) {
      throw new Error(
        currentPlan === "FREE"
          ? "Paket FREE hanya dapat membuat 2 lowongan aktif. Upgrade ke BASIC atau PREMIUM."
          : currentPlan === "BASIC"
            ? "Paket BASIC hanya dapat membuat 10 lowongan aktif. Upgrade ke PREMIUM."
            : "Batas lowongan tercapai.",
      );
    }

    return prisma.jobListing.create({
      data: {
        companyId: company.id,

        title: data.title,
        description: data.description,
        requirements: data.requirements,

        location: data.location,

        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,

        employmentType: data.employmentType,
        workMode: data.workMode,
        experienceLevel: data.experienceLevel,

        industry: data.industry,

        skills: data.skills || [],
        benefits: data.benefits || [],

        assessmentFileUrl: file?.path || null,

        assessmentFileName: file?.originalname || null,
      },
    });
  }

  async getJobs(query: {
    keyword?: string;
    location?: string;

    salaryMin?: number;
    salaryMax?: number;

    employmentType?: string;

    workMode?: string;

    experienceLevel?: string;

    industry?: string;

    page?: number;
    limit?: number;
  }) {
    const {
      keyword,
      location,

      salaryMin,
      salaryMax,

      employmentType,
      workMode,
      experienceLevel,
      industry,

      page = 1,
      limit = 10,
    } = query;

    const where: any = {
      status: "OPEN",
    };

    if (keyword) {
      where.OR = [
        {
          title: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      ];
    }

    if (location) {
      where.location = {
        contains: location,
        mode: "insensitive",
      };
    }

    if (salaryMin) {
      where.salaryMin = {
        gte: salaryMin,
      };
    }

    if (salaryMax) {
      where.salaryMax = {
        lte: salaryMax,
      };
    }

    if (employmentType) {
      where.employmentType = employmentType;
    }

    if (workMode) {
      where.workMode = workMode;
    }

    if (experienceLevel) {
      where.experienceLevel = experienceLevel;
    }

    if (industry) {
      where.industry = {
        contains: industry,
        mode: "insensitive",
      };
    }

    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      prisma.jobListing.findMany({
        where,

        include: {
          company: true,
        },

        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.jobListing.count({
        where,
      }),
    ]);

    return {
      jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getJobById(id: string) {
    return prisma.jobListing.findUnique({
      where: {
        id,
      },

      include: {
        company: true,
      },
    });
  }

  async getMyJobs(userId: string, page = 1, limit = 10, keyword?: string) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    const skip = (page - 1) * limit;

    const where: any = {
      companyId: company.id,
    };

    if (keyword) {
      where.OR = [
        {
          title: {
            contains: keyword,
            mode: "insensitive",
          },
        },

        {
          location: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      ];
    }

    const [jobs, total] = await Promise.all([
      prisma.jobListing.findMany({
        where,

        orderBy: {
          createdAt: "desc",
        },

        skip,
        take: limit,
      }),

      prisma.jobListing.count({
        where,
      }),
    ]);

    return {
      data: jobs,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateJob(userId: string, jobId: string, data: CreateJobInput) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    const job = await prisma.jobListing.findFirst({
      where: {
        id: jobId,
        companyId: company.id,
      },
    });

    if (!job) {
      throw new Error("Lowongan tidak ditemukan");
    }

    return prisma.jobListing.update({
      where: {
        id: jobId,
      },

      data: {
        title: data.title,
        description: data.description,
        requirements: data.requirements,

        location: data.location,

        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,

        employmentType: data.employmentType,

        workMode: data.workMode,

        experienceLevel: data.experienceLevel,

        industry: data.industry,
      },
    });
  }

  async deleteJob(userId: string, jobId: string) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    const job = await prisma.jobListing.findFirst({
      where: {
        id: jobId,
        companyId: company.id,
      },
    });

    if (!job) {
      throw new Error("Lowongan tidak ditemukan");
    }

    return prisma.jobListing.delete({
      where: {
        id: jobId,
      },
    });
  }
}

export default new JobService();
