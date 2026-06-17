import api from "@/lib/api";

export const applyJob = async (payload: FormData) => {
  const response = await api.post("/applications", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getCompanyApplications = async (
  page = 1,
  limit = 10,
  keyword = "",
  status = "ALL",
) => {
  const response = await api.get(
    `/applications/company?page=${page}&limit=${limit}&keyword=${keyword}&status=${status}`,
  );

  return response.data;
};

export const updateApplicationStatus = async (
  applicationId: string,
  status: string,
) => {
  const response = await api.patch(`/applications/${applicationId}/status`, {
    status,
  });

  return response.data;
};

export const getMyApplications = async () => {
  const response = await api.get("/applications/my");

  return response.data;
};

export const exportCompanyApplications = async () => {
  const response = await api.get("/applications/company/export");

  return response.data;
};

export const notifyCvViewed = async (applicationId: string) => {
  const response = await api.post(`/applications/${applicationId}/view-cv`);

  return response.data;
};

export const notifyAssessmentViewed = async (applicationId: string) => {
  const response = await api.post(
    `/applications/${applicationId}/view-assessment`,
  );

  return response.data;
};