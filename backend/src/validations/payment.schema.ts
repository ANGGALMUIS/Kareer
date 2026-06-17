import { z } from "zod";

export const createPaymentSchema = z.object({
  plan: z.enum(["BASIC", "PREMIUM"]),

  bankName: z.string().min(2),

  accountNumber: z.string().min(5),

  accountHolder: z.string().min(3),

  paymentProofUrl: z.string().optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
