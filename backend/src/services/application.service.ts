import prisma from "../config/prisma";
import { ApplyJobInput } from "../validations/application.schema";
import notificationService from "./notification.service";
import activityLogService from "./activity-log.service";

class ApplicationService {
  async applyJob(
    userId: string,
    data: ApplyJobInput,
    file?: Express.Multer.File,
  ) {
    const job = await prisma.jobListing.findUnique({
      where: {
        id: data.jobListingId,
      },
    });

    if (!job) {
      throw new Error("Lowongan tidak ditemukan");
    }

    // CEK PROFILE COMPLETION

    const profile = await prisma.applicantProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new Error(
        "Lengkapi profil terlebih dahulu sebelum melamar pekerjaan.",
      );
    }

    const profileFields = [
      profile.headline,
      profile.bio,
      profile.location,
      profile.phone,
      profile.linkedinUrl,
      profile.githubUrl,
      profile.portfolioUrl,
      profile.cvUrl,
    ];

    const completedFields = profileFields.filter(
      (field) => field && String(field).trim() !== "",
    ).length;

    const profileCompletion = Math.round(
      (completedFields / profileFields.length) * 100,
    );

    if (profileCompletion < 70) {
      throw new Error(
        `Profil Anda baru ${profileCompletion}%. Minimal 70% untuk melamar pekerjaan.`,
      );
    }

    // CEK PREMIUM APPLICANT
    const subscription = await prisma.applicantSubscription.findUnique({
      where: {
        userId,
      },
    });

    const isPremium = subscription?.status === "ACTIVE";

    if (!isPremium) {
      const totalApplications = await prisma.application.count({
        where: {
          userId,
        },
      });

      if (totalApplications >= 5) {
        throw new Error(
          "Batas 5 lamaran telah tercapai. Upgrade ke Applicant Premium untuk melamar tanpa batas.",
        );
      }
    }

    const existing = await prisma.application.findFirst({
      where: {
        userId,
        jobListingId: data.jobListingId,
      },
    });

    if (existing) {
      throw new Error("Anda sudah melamar lowongan ini");
    }

    const application = await prisma.application.create({
      data: {
        userId,

        jobListingId: data.jobListingId,

        coverLetter: data.coverLetter,

        assessmentAnswerUrl: file?.path || null,

        assessmentAnswerName: file?.originalname || null,
      },
    });

    console.log("ACTIVITY LOG DIPANGGIL");

    await activityLogService.create(
      userId,
      "APPLICATION_CREATED",
      "Lamaran Baru",
      `Melamar posisi "${job.title}"`,
    );
    return application;
  }

  async getCompanyApplications(
    userId: string,
    page = 1,
    limit = 10,
    keyword?: string,
    status?: string,
  ) {
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
      jobListing: {
        companyId: company.id,
      },
    };

    if (keyword) {
      where.OR = [
        {
          user: {
            name: {
              contains: keyword,
              mode: "insensitive",
            },
          },
        },

        {
          jobListing: {
            title: {
              contains: keyword,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    if (status && status !== "ALL") {
      where.status = status;
    }

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,

        include: {
          user: {
            include: {
              applicantProfile: true,
            },
          },

          jobListing: true,

          interview: true,
        },

        orderBy: {
          appliedAt: "desc",
        },

        skip,
        take: limit,
      }),

      prisma.application.count({
        where,
      }),
    ]);

    return {
      data: applications,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async exportCompanyApplications(userId: string) {
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

        interview: true,
      },

      orderBy: {
        appliedAt: "desc",
      },
    });
  }

  async updateStatus(userId: string, applicationId: string, status: any) {
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
        user: true,
        jobListing: true,
      },
    });

    if (!application) {
      throw new Error("Lamaran tidak ditemukan");
    }

    const updatedApplication = await prisma.application.update({
      where: {
        id: applicationId,
      },

      data: {
        status,
      },

      include: {
        user: true,
        jobListing: true,
      },
    });

    let title = "Update Status Lamaran";

    let message = "";

    switch (status) {
      case "REVIEW":
        title = "Lamaran Sedang Direview";

        message = `Lamaran Anda untuk posisi "${updatedApplication.jobListing.title}" sedang ditinjau oleh perusahaan.`;

        break;

      case "INTERVIEW":
        title = "Undangan Interview";

        message = `Selamat! Anda lolos tahap seleksi awal dan diundang untuk interview pada posisi "${updatedApplication.jobListing.title}".`;

        break;

      case "ACCEPTED":
        title = "Lamaran Diterima";

        message = `Selamat! Lamaran Anda untuk posisi "${updatedApplication.jobListing.title}" telah diterima.`;

        break;

      case "REJECTED":
        title = "Lamaran Belum Berhasil";

        message = `Terima kasih telah melamar posisi "${updatedApplication.jobListing.title}". Saat ini perusahaan memilih kandidat lain yang lebih sesuai.`;

        break;

      default:
        message = `Status lamaran Anda untuk posisi "${updatedApplication.jobListing.title}" telah diperbarui menjadi ${status}.`;
    }

    await notificationService.createNotification(
      updatedApplication.userId,
      title,
      message,
    );

    await activityLogService.create(
      updatedApplication.userId,
      "APPLICATION_STATUS_UPDATED",
      "Status Lamaran Diperbarui",
      `Status lamaran "${updatedApplication.jobListing.title}" berubah menjadi ${status}`,
    );

    return updatedApplication;
  }

  async myApplications(userId: string) {
    return prisma.application.findMany({
      where: {
        userId,
      },

      include: {
        jobListing: true,
      },

      orderBy: {
        appliedAt: "desc",
      },
    });
  }

  async notifyCvViewed(companyUserId: string, applicationId: string) {
    const company = await prisma.company.findUnique({
      where: {
        userId: companyUserId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },

      include: {
        jobListing: true,
      },
    });

    if (!application) {
      throw new Error("Lamaran tidak ditemukan");
    }

    await notificationService.createNotification(
      application.userId,
      "CV Dilihat Recruiter",
      `${company.name} telah melihat CV Anda untuk posisi "${application.jobListing.title}".`,
    );

    return true;
  }

  async notifyAssessmentViewed(companyUserId: string, applicationId: string) {
    const company = await prisma.company.findUnique({
      where: {
        userId: companyUserId,
      },
    });

    if (!company) {
      throw new Error("Perusahaan tidak ditemukan");
    }

    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },

      include: {
        jobListing: true,
      },
    });

    if (!application) {
      throw new Error("Lamaran tidak ditemukan");
    }

    await notificationService.createNotification(
      application.userId,
      "Assessment Ditinjau",
      `${company.name} sedang meninjau jawaban assessment Anda untuk posisi "${application.jobListing.title}".`,
    );

    return true;
  }
}

export default new ApplicationService();
