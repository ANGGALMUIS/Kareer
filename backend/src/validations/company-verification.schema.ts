import { z } from "zod";

export const rejectCompanySchema = z.object({
  reason: z.string().min(5),
});

export type RejectCompanyInput = z.infer<typeof rejectCompanySchema>;
