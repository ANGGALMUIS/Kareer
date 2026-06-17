import { Request, Response, NextFunction } from "express";

import prisma from "../config/prisma";

export const checkJobLimit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        userId: req.user!.userId,
      },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Perusahaan tidak ditemukan",
      });
    }

    if (company.verificationStatus !== "APPROVED") {
      return res.status(403).json({
        success: false,
        message: "Perusahaan belum diverifikasi",
      });
    }

    const subscription = await prisma.companySubscription.findFirst({
      where: {
        companyId: company.id,

        status: "ACTIVE",
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    let maxJobs = 2;

    if (subscription?.plan === "BASIC") {
      maxJobs = 10;
    }

    if (subscription?.plan === "PREMIUM") {
      return next();
    }

    const totalJobs = await prisma.jobListing.count({
      where: {
        companyId: company.id,

        status: "OPEN",
      },
    });

    if (totalJobs >= maxJobs) {
      return res.status(403).json({
        success: false,
        message: `Batas lowongan paket tercapai (${maxJobs})`,
      });
    }

    next();
  } catch {
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
    });
  }
};
