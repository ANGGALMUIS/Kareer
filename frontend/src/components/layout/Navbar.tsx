"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "@/store/auth.store";

export default function Navbar() {
  const router = useRouter();

  const initialized = useAuthStore((state) => state.initialized);
  const initialize = useAuthStore((state) => state.initialize);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  if (!initialized) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // sisa kode navbar tetap

  return (
    <header
      className="
      sticky
      top-0
      z-50
      bg-white/80
      backdrop-blur-xl
      shadow-[0_1px_20px_rgba(0,0,0,0.04)]
    "
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center px-6">
        {/* LOGO */}

        <Link
          href="/"
          className="
                text-3xl
                font-bold
                text-blue-600
              "
        >
          Kareer
        </Link>

        {/* NAVIGATION */}

        <nav
          className="
    ml-auto
    hidden
    items-center
    gap-2
    md:flex
  "
        >
          <Link
            href="/jobs"
            className="
            rounded-xl
            px-4
            py-2
            text-sm
            font-medium
            text-slate-600
            transition
            hover:bg-slate-100
            hover:text-slate-900
          "
          >
            Lowongan
          </Link>

          <Link
            href="/companies"
            className="
            rounded-xl
            px-4
            py-2
            text-sm
            font-medium
            text-slate-600
            transition
            hover:bg-slate-100
            hover:text-slate-900
          "
          >
            Perusahaan
          </Link>
        </nav>

        {/* RIGHT SIDE */}

        <div
          className="
          ml-8
          flex
          items-center
          gap-3
        "
        >
          {!user ? (
            <>
              <Link
                href="/login"
                className="
                rounded-xl
                border
                border-slate-200
                px-5
                py-2.5
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-slate-50
              "
              >
                Masuk
              </Link>

              <Link
                href="/register"
                className="
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-blue-500/20
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-xl
              "
              >
                Mulai Sekarang
              </Link>
            </>
          ) : (
            <>
              <Link
                href={
                  user.role === "APPLICANT"
                    ? "/dashboard/applicant"
                    : user.role === "COMPANY"
                      ? "/dashboard/company"
                      : "/dashboard/admin"
                }
                className="
                rounded-xl
                bg-slate-100
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-slate-200
              "
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="
                rounded-xl
                border
                border-slate-200
                px-4
                py-2.5
                text-sm
                font-medium
                transition
                hover:bg-slate-50
              "
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
