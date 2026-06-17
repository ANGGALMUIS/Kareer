import { z } from "zod";

export const createProfileSchema = z.object({
  phone: z.string().optional(),
  bio: z.string().optional(),

  linkedinUrl: z.string().optional(),

  cvUrl: z.string().optional(),

  isPublic: z.boolean().optional(),
});

export const updateProfileSchema = createProfileSchema.partial();

export type CreateProfileInput = z.infer<typeof createProfileSchema>;

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
