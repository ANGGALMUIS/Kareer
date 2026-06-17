import prisma from "../config/prisma";

export class CompanyRequestService {
  async create(userId: string, data: any) {
    const existingPending = await prisma.companyRequest.findFirst({
      where: {
        userId,
        status: "PENDING",
      },
    });

    if (existingPending) {
      throw new Error("Masih ada pengajuan yang sedang direview");
    }

    return prisma.companyRequest.create({
      data: {
        userId,

        companyName: data.companyName,
        industry: data.industry,
        website: data.website,
        address: data.address,
        description: data.description,
        proposalUrl: data.proposalUrl,
      },
    });
  }

  async getMyRequests(userId: string) {
    return prisma.companyRequest.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getAll() {
    return prisma.companyRequest.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async approve(id: string) {
    const request = await prisma.companyRequest.findUnique({
      where: {
        id,
      },
    });

    if (!request) {
      throw new Error("Pengajuan tidak ditemukan");
    }

    await prisma.user.update({
      where: {
        id: request.userId,
      },
      data: {
        role: "COMPANY",
      },
    });

    const existingCompany = await prisma.company.findUnique({
      where: {
        userId: request.userId,
      },
    });

    if (!existingCompany) {
      await prisma.company.create({
        data: {
          userId: request.userId,
          name: request.companyName,
          industry: request.industry,
          description: request.description,
          website: request.website || null,
          address: request.address,
          verificationStatus: "APPROVED",
          profileCompleted: false,
        },
      });
    }

    return prisma.companyRequest.update({
      where: {
        id,
      },
      data: {
        status: "APPROVED",
      },
    });
  }

  async reject(id: string, rejectionReason: string) {
    return prisma.companyRequest.update({
      where: {
        id,
      },

      data: {
        status: "REJECTED",
        rejectionReason,
      },
    });
  }
}

export const companyRequestService = new CompanyRequestService();
