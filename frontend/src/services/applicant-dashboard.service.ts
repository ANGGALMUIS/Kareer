import api from "@/lib/api";

export const getApplicantDashboard = async () => {
  const response = await api.get("/applicant-dashboard");

  return response.data;
};
