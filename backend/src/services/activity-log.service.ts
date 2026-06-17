import prisma from "../config/prisma";
import { ActivityType } from "@prisma/client";

class ActivityLogService {
  async create(
    userId: string | null,
    type: ActivityType,
    title: string,
    description: string,
  ) {
    return prisma.activityLog.create({
      data: {
        userId,
        type,
        title,
        description,
      },
    });
  }

  async latest(limit = 20) {
    return prisma.activityLog.findMany({
      take: limit,

      include: {
        user: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default new ActivityLogService();
