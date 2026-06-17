import prisma from "../config/prisma";

class ApplicantService {
  async getProfile(userId: string) {
    const profile = await prisma.applicantProfile.findUnique({
      where: {
        userId,
      },

      include: {
        user: true,
      },
    });

    return profile;
  }

  async updateProfile(
    userId: string,
    data: {
      phone?: string;
      headline?: string;
      bio?: string;
      location?: string;
      linkedinUrl?: string;
      githubUrl?: string;
      portfolioUrl?: string;
      skills?: string[];
      cvUrl?: string;
    },
  ) {
    const profile = await prisma.applicantProfile.upsert({
      where: {
        userId,
      },

      update: {
        ...data,
      },

      create: {
        userId,
        ...data,
      },
    });

    return profile;
  }

  async getPublicProfile(userId: string) {
    console.log("USER ID:", userId);
    const profile = await prisma.applicantProfile.findUnique({
      where: {
        userId,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
    console.log("PROFILE:", profile);

    return profile;
  }
}

export default new ApplicantService();
