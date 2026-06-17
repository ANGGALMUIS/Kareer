import prisma from "../config/prisma";

class UploadService {
  async saveCV(userId: string, filename: string) {
    const profile = await prisma.applicantProfile.update({
      where: {
        userId,
      },

      data: {
        cvUrl: filename,
      },
    });

    return profile;
  }

  async uploadCompanyLogo(fileUrl: string) {
    return {
      logoUrl: fileUrl,
    };
  }
  
}

export default new UploadService();
