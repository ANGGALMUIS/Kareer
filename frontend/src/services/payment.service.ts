import api from "@/lib/api";

export const createPayment = async (data: {
  plan: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  paymentProofUrl?: string;
}) => {
  const response = await api.post("/payments", data);

  return response.data;
};

export const getMyPayments = async () => {
  const response = await api.get("/payments/my");

  return response.data;
};

export const getAllPayments = async () => {
  const response = await api.get("/admin/payments");

  return response.data;
};

export const approvePayment = async (paymentId: string) => {
  const response = await api.patch(`/admin/payments/${paymentId}/approve`);

  return response.data;
};

export const rejectPayment = async (paymentId: string, reason: string) => {
  const response = await api.patch(`/admin/payments/${paymentId}/reject`, {
    reason,
  });

  return response.data;
};
