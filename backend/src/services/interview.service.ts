import prisma from "../config/prisma";

import notificationService from "./notification.service";

class InterviewService {
  async createInterview(
    userId: string,
    applicationId: string,
    data: {
      scheduledAt: string;
      meetingLink?: string;
      location?: string;
      notes?: string;
    },
  ) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,

        jobListing: {
          companyId: company.id,
        },
      },

      include: {
        jobListing: true,
      },
    });

    if (!application) {
      throw new Error("Lamaran tidak ditemukan");
    }

    const existingInterview = await prisma.interview.findUnique({
      where: {
        applicationId,
      },
    });

    if (existingInterview) {
      throw new Error("Interview sudah dijadwalkan");
    }

    const interview = await prisma.interview.create({
      data: {
        applicationId,
        scheduledAt: new Date(data.scheduledAt),
        meetingLink: data.meetingLink,
        location: data.location,
        notes: data.notes,
      },

      include: {
        application: {
          include: {
            user: true,
            jobListing: true,
          },
        },
      },
    });

    await prisma.application.update({
      where: {
        id: applicationId,
      },

      data: {
        status: "INTERVIEW",
      },
    });

    await notificationService.createNotification(
      application.userId,
      "Undangan Interview",
      `Interview untuk posisi "${application.jobListing.title}" telah dijadwalkan pada ${new Date(
        data.scheduledAt,
      ).toLocaleString("id-ID")}.`,
    );

    return interview;
  }

  async getInterview(applicationId: string) {
    return prisma.interview.findUnique({
      where: {
        applicationId,
      },

      include: {
        application: {
          include: {
            user: true,
            jobListing: true,
          },
        },
      },
    });
  }

  async updateInterview(
    userId: string,
    interviewId: string,
    data: {
      scheduledAt?: string;
      meetingLink?: string;
      location?: string;
      notes?: string;
      status?: any;
    },
  ) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    const interview = await prisma.interview.findFirst({
      where: {
        id: interviewId,

        application: {
          jobListing: {
            companyId: company.id,
          },
        },
      },
    });

    if (!interview) {
      throw new Error("Interview tidak ditemukan");
    }

    return prisma.interview.update({
      where: {
        id: interviewId,
      },

      data: {
        ...(data.scheduledAt && {
          scheduledAt: new Date(data.scheduledAt),
        }),

        meetingLink: data.meetingLink,
        location: data.location,
        notes: data.notes,
        status: data.status,
      },
    });
  }

  async deleteInterview(userId: string, interviewId: string) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    const interview = await prisma.interview.findFirst({
      where: {
        id: interviewId,

        application: {
          jobListing: {
            companyId: company.id,
          },
        },
      },
    });

    if (!interview) {
      throw new Error("Interview tidak ditemukan");
    }

    return prisma.interview.delete({
      where: {
        id: interviewId,
      },
    });
  }

  async getMyInterviews(userId: string) {
    return prisma.interview.findMany({
      where: {
        application: {
          userId,
        },
      },

      include: {
        application: {
          include: {
            jobListing: {
              include: {
                company: true,
              },
            },
          },
        },
      },

      orderBy: {
        scheduledAt: "asc",
      },
    });
  }

  async getCompanyInterviews(userId: string, page = 1, limit = 10) {
    const company = await prisma.company.findUnique({
      where: {
        userId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    const skip = (page - 1) * limit;

    const [interviews, total] = await Promise.all([
      prisma.interview.findMany({
        where: {
          application: {
            jobListing: {
              companyId: company.id,
            },
          },
        },

        include: {
          application: {
            include: {
              user: {
                include: {
                  applicantProfile: true,
                },
              },

              jobListing: true,
            },
          },
        },

        orderBy: {
          scheduledAt: "asc",
        },

        skip,
        take: limit,
      }),

      prisma.interview.count({
        where: {
          application: {
            jobListing: {
              companyId: company.id,
            },
          },
        },
      }),
    ]);

    return {
      data: interviews,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export default new InterviewService();
