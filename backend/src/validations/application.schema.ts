import { z } from "zod";

export const applyJobSchema = z.object({
  jobListingId: z.string(),
  coverLetter: z.string().optional(),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(["REVIEW", "INTERVIEW", "ACCEPTED", "REJECTED"]),
});

export type ApplyJobInput = z.infer<typeof applyJobSchema>;
