"use client";

import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "COMPANY" | "APPLICANT";
}

interface AuthState {
  token: string | null;
  user: User | null;

  initialized: boolean;

  initialize: () => void;

  setAuth: (token: string, user: User) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  initialized: false,

  initialize: () => {
    if (typeof window === "undefined") {
      set({
        initialized: true,
      });

      return;
    }

    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user") || "null");

    set({
      token,
      user,
      initialized: true,
    });
  },

  setAuth: (token, user) => {
    localStorage.setItem("token", token);

    localStorage.setItem("user", JSON.stringify(user));

    set({
      token,
      user,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    set({
      token: null,
      user: null,
    });
  },
}));
