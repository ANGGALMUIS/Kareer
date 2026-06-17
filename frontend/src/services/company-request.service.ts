import api from "@/lib/api";

export const createCompanyRequest = async (data: any) => {
  const response = await api.post("/company-request", data);

  return response.data;
};

export const getMyCompanyRequests = async () => {
  const response = await api.get("/company-request/my");

  return response.data;
};

export const getAllCompanyRequests = async () => {
  const response = await api.get("/company-request/admin");

  return response.data;
};

export const approveCompanyRequest = async (id: string) => {
  const response = await api.patch(`/company-request/${id}/approve`);

  return response.data;
};

export const rejectCompanyRequest = async (id: string, reason: string) => {
  const response = await api.patch(`/company-request/${id}/reject`, {
    reason,
  });

  return response.data;
};
