import prisma from "../config/prisma";

import {
  CreateProfileInput,
  UpdateProfileInput,
} from "../validations/profile.schema";

class ProfileService {
  async createProfile(userId: string, data: CreateProfileInput) {
    const existing = await prisma.applicantProfile.findUnique({
      where: {
        userId,
      },
    });

    if (existing) {
      throw new Error("Profile sudah dibuat");
    }

    return prisma.applicantProfile.create({
      data: {
        userId,

        phone: data.phone,
        bio: data.bio,

        linkedinUrl: data.linkedinUrl,

        cvUrl: data.cvUrl,

        isPublic: data.isPublic ?? true,
      },
    });
  }

  async getMyProfile(userId: string) {
    const profile = await prisma.applicantProfile.findUnique({
      where: {
        userId,
      },

      include: {
        user: true,
      },
    });

    if (!profile) {
      throw new Error("Profile belum dibuat");
    }

    return profile;
  }

  async updateProfile(userId: string, data: UpdateProfileInput) {
    return prisma.applicantProfile.update({
      where: {
        userId,
      },

      data,
    });
  }
}

export default new ProfileService();
