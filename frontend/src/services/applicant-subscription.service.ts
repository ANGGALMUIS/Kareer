import api from "@/lib/api";

export const getMySubscription = async () => {
  const response = await api.get("/applicant-subscriptions/my");

  return response.data;
};

export const createSubscription = async (data: { paymentProof: string }) => {
  const response = await api.post("/applicant-subscriptions", data);

  return response.data;
};

export const getAllSubscriptions = async () => {
  const response = await api.get("/applicant-subscriptions/admin");

  return response.data;
};

export const approveSubscription = async (id: string) => {
  const response = await api.patch(`/applicant-subscriptions/${id}/approve`);

  return response.data;
};

export const rejectSubscription = async (id: string) => {
  const response = await api.patch(`/applicant-subscriptions/${id}/reject`);

  return response.data;
};
