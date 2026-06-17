"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: React.ReactNode;

  role?: "ADMIN" | "COMPANY" | "APPLICANT";
}

export default function ProtectedRoute({ children, role }: Props) {
  const router = useRouter();

  const { token, user, initialized } = useAuth();

  useEffect(() => {
    if (!initialized) return;

    if (!token) {
      router.replace("/login");
      return;
    }

    if (role && user?.role !== role) {
      router.replace("/");
    }
  }, [initialized, token, user, role, router]);

  if (!initialized) {
    return <div className="h-40 animate-pulse rounded-xl bg-gray-100" />;
  }

  if (!token) {
    return null;
  }

  if (role && user?.role !== role) {
    return null;
  }

  return <>{children}</>;
}
