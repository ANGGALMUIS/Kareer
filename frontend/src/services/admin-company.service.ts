import api from "@/lib/api";

export const getAllCompanies = async () => {
  const response = await api.get("/admin/companies/all");

  return response.data;
};

export const verifyCompany = async (companyId: string) => {
  const response = await api.patch(`/admin/companies/${companyId}/verify`);

  return response.data;
};

export const unverifyCompany = async (companyId: string) => {
  const response = await api.patch(`/admin/companies/${companyId}/unverify`);

  return response.data;
};
