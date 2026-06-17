import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(3),

  description: z.string().min(10),

  requirements: z.string().min(10),

  location: z.string().optional(),

  salaryMin: z.number().optional(),

  salaryMax: z.number().optional(),

  employmentType: z
    .enum(["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT", "FREELANCE"])
    .optional(),

  workMode: z.enum(["ONSITE", "HYBRID", "REMOTE"]).optional(),

  experienceLevel: z
    .enum(["FRESH_GRADUATE", "JUNIOR", "MID_LEVEL", "SENIOR"])
    .optional(),

  industry: z.string().optional(),

  skills: z.array(z.string()).optional(),

  benefits: z.array(z.string()).optional(),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
