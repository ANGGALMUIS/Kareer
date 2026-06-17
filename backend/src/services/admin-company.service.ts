import prisma from "../config/prisma";

class AdminCompanyService {
  async getPendingCompanies() {
    return prisma.company.findMany({
      where: {
        verificationStatus: "PENDING",
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async approveCompany(id: string) {
    const company = await prisma.company.update({
      where: { id },

      data: {
        verificationStatus: "APPROVED",

        verifiedAt: new Date(),
      },
    });

    return company;
  }

  async rejectCompany(id: string, reason: string) {
    const company = await prisma.company.update({
      where: { id },

      data: {
        verificationStatus: "REJECTED",

        rejectionReason: reason,
      },
    });

    return company;
  }

  async verifyCompany(id: string) {
    return prisma.company.update({
      where: {
        id,
      },

      data: {
        isVerified: true,
      },
    });
  }

  async unverifyCompany(id: string) {
    return prisma.company.update({
      where: {
        id,
      },

      data: {
        isVerified: false,
      },
    });
  }

  async getAllCompanies() {
    return prisma.company.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}

export default new AdminCompanyService();
