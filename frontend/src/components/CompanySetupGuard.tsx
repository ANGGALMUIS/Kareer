"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { getCompanyProfile } from "@/services/company.service";

export default function CompanySetupGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const pathname = usePathname();

  const { initialized, token, user } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!initialized) return;

    if (!token) return;

    if (user?.role !== "COMPANY") {
      setLoading(false);
      return;
    }

    const checkProfile = async () => {
      try {
        const response = await getCompanyProfile();

        const company = response.data;

        const isSetupPage = pathname === "/dashboard/company/setup";

        if (!company.profileCompleted && !isSetupPage) {
          router.replace("/dashboard/company/setup");
          return;
        }

        if (company.profileCompleted && isSetupPage) {
          router.replace("/dashboard/company");
          return;
        }
      } catch (error) {
        // kalau profile belum ada
        if (pathname !== "/dashboard/company/setup") {
          router.replace("/dashboard/company/setup");
        }
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [initialized, token, user, pathname, router]);

  if (loading) {
    return <div className="h-40 animate-pulse rounded-xl bg-gray-100" />;
  }

  return <>{children}</>;
}
