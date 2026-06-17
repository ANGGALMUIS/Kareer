"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

import {
  LayoutDashboard,
  BarChart3,
  GitBranch,
  CreditCard,
  Users,
  ChevronDown,
  Shield,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActiveMenu = (href: string) => {
    if (href === "/dashboard/admin") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menus = [
    {
      name: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: BarChart3,
    },
    {
      name: "Company Request",
      href: "/dashboard/admin/company-request",
      icon: GitBranch,
    },
    {
      name: "Subscriptions",
      href: "/dashboard/admin/applicant-subscriptions",
      icon: Users,
    },
    {
      name: "Payments",
      href: "/dashboard/admin/payments",
      icon: CreditCard,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ProtectedRoute role="ADMIN">
      <div className="min-h-screen bg-slate-50">
        <header
          className="
    sticky
    top-0
    z-50
    bg-white
    shadow-[0_1px_20px_rgba(0,0,0,0.04)]
  "
        >
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
            <Link
              href="/dashboard/admin"
              className="text-2xl font-bold text-blue-600"
            >
              Kareer
            </Link>

            <nav
              className="
    hidden
    items-center
    gap-2
    md:flex
  "
            >
              {menus.map((menu) => {
                const Icon = menu.icon;

                const active = isActiveMenu(menu.href);

                return (
                  <Link
                    key={menu.href}
                    href={menu.href}
                    className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Icon size={16} />
                    {menu.name}
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="
    md:hidden
    rounded-xl
    p-2
    text-slate-700
  "
            >
              <Menu size={26} />
            </button>

            <div className="relative hidden md:block">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white">
                  <Shield size={16} />
                </div>

                <span className="hidden md:block">Administrator</span>

                <ChevronDown size={16} />
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-3 w-72 rounded-3xl border border-slate-200 bg-white shadow-xl">
                  <div className="border-b border-slate-100 p-5">
                    <p className="font-semibold">Administrator</p>

                    <p className="text-sm text-slate-500">
                      System Administrator
                    </p>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/"
                      className="block rounded-2xl px-4 py-3 text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {mobileMenuOpen && (
            <div
              className="
      fixed
      inset-0
      z-[9999]
      bg-black/50
      md:hidden
    "
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className="
        absolute
        right-0
        top-0
        h-full
         w-[70%]
    max-w-[300px]
        bg-white
        shadow-[0_20px_50px_rgba(0,0,0,0.12)]
      "
              >
                <div
                  className="
          flex
          items-center
          justify-between
          p-5
        "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-red-500
              to-orange-500
              text-white
            "
                    >
                      <Shield size={20} />
                    </div>

                    <div>
                      <p className="font-semibold">Administrator</p>

                      <p className="text-sm text-slate-500">
                        System Administrator
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="
            rounded-xl
            p-2
            hover:bg-slate-100
          "
                  >
                    <X size={22} />
                  </button>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                <div className="p-4">
                  {menus.map((menu) => {
                    const Icon = menu.icon;

                    return (
                      <Link
                        key={menu.href}
                        href={menu.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`
                mb-2
                flex
                items-center
                gap-3
                rounded-2xl
                px-4
                py-3
                transition-all
                duration-200
                ${
                  isActiveMenu(menu.href)
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-slate-100 text-slate-700"
                }
              `}
                      >
                        <Icon size={18} />
                        {menu.name}
                      </Link>
                    );
                  })}

                  <div className="my-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                  <Link
                    href="/"
                    className="
            block
            rounded-xl
            px-4
            py-3
            text-red-500
            hover:bg-red-50
          "
                  >
                    🚪 Logout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </header>

        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
