import { z } from "zod";

export const applyCompanySchema = z.object({
  name: z.string().min(3, "Nama perusahaan minimal 3 karakter"),

  industry: z.string().optional(),

  description: z.string().optional(),

  website: z.string().url().optional(),

  address: z.string().optional(),

  logoUrl: z.string().optional(),
});

export type ApplyCompanyInput = z.infer<typeof applyCompanySchema>;
