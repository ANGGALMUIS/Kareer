import api from "@/lib/api";

export const getApplicantProfile = async () => {
  const response = await api.get("/applicant/profile");

  return response.data;
};

export const updateApplicantProfile = async (data: any) => {
  const response = await api.put("/applicant/profile", data);

  return response.data;
};

export const getPublicApplicant = async (id: string) => {
  const response = await api.get(`/applicant/${id}`);

  return response.data;
};
