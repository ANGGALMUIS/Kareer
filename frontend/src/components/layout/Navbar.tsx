"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
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
    flex
    items-center
    gap-1
  "
        >
          <Link
            href="/jobs"
            className="
    rounded-xl
    px-3
    py-2
    text-sm
    font-medium
    text-slate-600
    transition
    hover:bg-slate-100
    md:px-4
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

        <button
          onClick={() => setMobileOpen(true)}
          className="
    ml-3
    rounded-xl
    p-2
    transition
    hover:bg-slate-100
    md:hidden
  "
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* RIGHT SIDE */}

        <div
          className="
    ml-4
    hidden
    items-center
    gap-3
    md:flex
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

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />

          <div
            onClick={(e) => e.stopPropagation()}
            className="
  fixed
  right-0
  top-0
  z-50
  h-screen
  w-72
  bg-white
  p-6
  shadow-2xl
"
          >
            <div className="mb-6 border-b pb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-gradient-to-br
          from-blue-600
          to-indigo-600
          font-bold
          text-white
        "
                  >
                    K
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">Kareer</h3>

                    <p className="text-xs text-slate-500">
                      Job Portal Indonesia
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="
        rounded-xl
        p-2
        hover:bg-slate-200
      "
                >
                  <X />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="
          block
          rounded-2xl
          border
          border-slate-200
          py-3
          text-center
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
                    onClick={() => setMobileOpen(false)}
                    className="
          block
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          py-3
          text-center
          font-semibold
          text-white
          shadow-lg
          shadow-blue-500/20
        "
                  >
                    Daftar Sekarang
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
                    onClick={() => setMobileOpen(false)}
                    className="
          block
          rounded-2xl
          bg-slate-100
          py-3
          text-center
          font-medium
          text-slate-700
          transition
          hover:bg-slate-200
        "
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="
          block
          w-full
          rounded-2xl
          border
          border-red-200
          py-3
          text-center
          font-medium
          text-red-600
          transition
          hover:bg-red-50
        "
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
