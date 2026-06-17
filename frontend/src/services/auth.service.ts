import api from "@/lib/api";

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.put("/auth/change-password", data);

  return response.data;
};

export const changeEmail = async (email: string) => {
  const response = await api.put("/auth/change-email", {
    email,
  });

  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

export const resetPassword = async (token: string, password: string) => {
  const response = await api.post("/auth/reset-password", {
    token,
    password,
  });

  return response.data;
};
