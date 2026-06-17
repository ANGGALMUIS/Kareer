"use client";

import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const token = useAuthStore((s) => s.token);

  const user = useAuthStore((s) => s.user);

  const initialized = useAuthStore((s) => s.initialized);

  return {
    token,
    user,
    initialized,
    isAuthenticated: !!token,
  };
}
