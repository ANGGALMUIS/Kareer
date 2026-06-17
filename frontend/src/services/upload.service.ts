import api from "@/lib/api";

export const uploadCompanyLogo = async (file: File) => {
  const formData = new FormData();

  formData.append("logo", file);

  const response = await api.post("/upload/company-logo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const uploadPaymentProof = async (file: File) => {
  const formData = new FormData();

  formData.append("paymentProof", file);

  const response = await api.post("/upload/payment-proof", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const uploadProposal = async (file: File) => {
  const formData = new FormData();

  formData.append("proposal", file);

  const response = await api.post("/upload/proposal", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const uploadCV = async (file: File) => {
  const formData = new FormData();

  formData.append("cv", file);

  const response = await api.post("/upload/cv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
