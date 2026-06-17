import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";

export const requireRole =
  (role: Role) => (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Akses ditolak",
      });
    }

    next();
  };

export const requireAdmin = requireRole("ADMIN");

export const requireCompany = requireRole("COMPANY");

export const requireApplicant = requireRole("APPLICANT");
