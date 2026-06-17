import prisma from "../config/prisma";

class SavedJobService {
  async saveJob(userId: string, jobId: string) {
    const job = await prisma.jobListing.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      throw new Error("Lowongan tidak ditemukan");
    }

    return prisma.savedJob.create({
      data: {
        userId,
        jobListingId: jobId,
      },
    });
  }

  async removeSavedJob(userId: string, jobId: string) {
    const savedJob = await prisma.savedJob.findFirst({
      where: {
        userId,
        jobListingId: jobId,
      },
    });

    if (!savedJob) {
      throw new Error("Bookmark tidak ditemukan");
    }

    return prisma.savedJob.delete({
      where: {
        id: savedJob.id,
      },
    });
  }

  async getSavedJobs(userId: string) {
    return prisma.savedJob.findMany({
      where: {
        userId,
      },

      include: {
        jobListing: {
          include: {
            company: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default new SavedJobService();
