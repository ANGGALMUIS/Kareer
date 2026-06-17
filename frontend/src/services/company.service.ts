import api from "@/lib/api";

export interface CompanyProfilePayload {
  name: string;
  industry: string;
  description: string;
  website?: string;
  address: string;
  logoUrl?: string;
}

export const getCompanyProfile = async () => {
  const response = await api.get("/company/profile");

  return response.data;
};

export const updateCompanyProfile = async (data: CompanyProfilePayload) => {
  const response = await api.put("/company/profile", data);

  return response.data;
};

export const getPublicCompany = async (companyId: string) => {
  const response = await api.get(`/company/${companyId}`);

  return response.data;
};



export const getCompanyDashboardStats = async () => {
  const response = await api.get("/company/dashboard-stats");

  return response.data;
};

export const getRecentApplicants = async () => {
  const response = await api.get("/company/recent-applicants");

  return response.data;
};

export const getCompanyApplications = async () => {
  const response = await api.get("/company/applications");

  return response.data;
};

export const getCompanyAnalytics = async () => {
  const response = await api.get("/company/analytics");

  return response.data;
};

export const getCompanies = async () => {
  const response = await api.get("/company");

  return response.data.data;
};
