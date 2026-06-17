import api from "@/lib/api";

export const createInterview = async (data: {
  applicationId: string;
  scheduledAt: string;
  location?: string;
  meetingLink?: string;
  notes?: string;
}) => {
  const response = await api.post("/interviews", data);

  return response.data;
};

export const getInterview = async (applicationId: string) => {
  const response = await api.get(`/interviews/${applicationId}`);

  return response.data;
};

export const updateInterview = async (
  id: string,
  data: {
    scheduledAt?: string;
    location?: string;
    meetingLink?: string;
    notes?: string;
    status?: string;
  },
) => {
  const response = await api.put(`/interviews/${id}`, data);

  return response.data;
};

export const deleteInterview = async (id: string) => {
  const response = await api.delete(`/interviews/${id}`);

  return response.data;
};

export const getMyInterviews = async () => {
  const response = await api.get("/interviews/my");

  return response.data;
};

export const getCompanyInterviews = async (page = 1, limit = 10) => {
  const response = await api.get(
    `/interviews/company?page=${page}&limit=${limit}`,
  );

  return response.data;
};