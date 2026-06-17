import { z } from "zod";

export const createCompanyRequestSchema = z.object({
  companyName: z.string().min(3, "Nama perusahaan minimal 3 karakter"),

  industry: z.string().min(2, "Industri wajib diisi"),

  website: z.string().optional(),

  address: z.string().min(5, "Alamat wajib diisi"),

  description: z.string().min(10, "Deskripsi minimal 10 karakter"),

  proposalUrl: z.string().optional(),
});

export type CreateCompanyRequestInput = z.infer<
  typeof createCompanyRequestSchema
>;
