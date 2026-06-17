"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCompanyProfile } from "@/services/company.service";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart3,
  Calendar,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActiveMenu = (href: string) => {
    if (href === "/dashboard/company") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };
  const [company, setCompany] = useState<any>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const loadCompany = async () => {
      try {
        const response = await getCompanyProfile();

        setCompany(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCompany();
  }, []);

  const menus = [
    {
      name: "Dashboard",
      href: "/dashboard/company",
      icon: LayoutDashboard,
    },
    {
      name: "Jobs",
      href: "/dashboard/company/jobs",
      icon: Briefcase,
    },
    {
      name: "Applications",
      href: "/dashboard/company/applications",
      icon: Users,
    },
    {
      name: "Interviews",
      href: "/dashboard/company/interviews",
      icon: Calendar,
    },
    {
      name: "Analytics",
      href: "/dashboard/company/analytics",
      icon: BarChart3,
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
    <ProtectedRoute role="COMPANY">
      <div className="min-h-screen bg-slate-50">
        {/* NAVBAR */}

        <header
          className="
    sticky
    top-0
    z-50
    bg-white
    shadow-[0_1px_20px_rgba(0,0,0,0.04)]
  "
        >
          <div
            className="
              mx-auto
              flex
              h-20
              max-w-7xl
              items-center
              justify-between
              px-6
            "
          >
            {/* LOGO */}

            <Link
              href="/"
              className="
                text-2xl
                font-bold
                text-blue-600
              "
            >
              Kareer
            </Link>

            {/* MENU */}

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
                    className={`
                      flex
  items-center
  gap-2
  rounded-2xl
  px-4
  py-3
  text-sm
  font-medium
  transition-all
  duration-200
                      ${
                        active
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : "text-slate-600 hover:bg-slate-100"
                      } 
                    `}
                  >
                    <Icon size={16} />
                    {menu.name}
                  </Link>
                );
              })}
            </nav>

            {/* ACCOUNT */}

            {/* MOBILE MENU BUTTON */}

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="
    flex
    items-center
    justify-center
    rounded-xl
    p-2
    text-slate-700
    md:hidden
  "
            >
              <Menu size={26} />
            </button>

            <div className="relative hidden md:block">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="
  flex
  items-center
  gap-3
  rounded-2xl
  bg-slate-50
  px-4
  py-3
  text-sm
  font-medium
  transition-all
  duration-200
  hover:bg-slate-100
"
              >
                {company?.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt={company.name}
                    className="
        h-8
        w-8
        rounded-full
        object-cover
      "
                  />
                ) : (
                  <div
                    className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-full
        bg-blue-600
        text-sm
        font-bold
        text-white
      "
                  >
                    {company?.name?.charAt(0)?.toUpperCase() || "C"}
                  </div>
                )}

                <span>{company?.name || "Company"}</span>

                <ChevronDown size={16} />
              </button>

              {openMenu && (
                <div
                  className="
      absolute
      right-0
      mt-3
      w-72
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      shadow-[0_20px_50px_rgba(0,0,0,0.12)]
      animate-in
      fade-in
      slide-in-from-top-2
      duration-200
    "
                >
                  <div className="border-b border-slate-100 p-5">
                    <div className="flex items-center gap-3">
                      {company?.logoUrl ? (
                        <img
                          src={company.logoUrl}
                          alt={company.name}
                          className="
              h-12
              w-12
              rounded-full
              object-cover
            "
                        />
                      ) : (
                        <div
                          className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-lg
              font-bold
              text-white
            "
                        >
                          {company?.name?.charAt(0)?.toUpperCase() || "C"}
                        </div>
                      )}

                      <div>
                        <p
                          className="
              text-sm
              font-semibold
              text-slate-900
            "
                        >
                          {company?.name || "Company"}
                        </p>

                        <p
                          className="
              text-xs
              text-slate-500
            "
                        >
                          Employer Account
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/dashboard/company/profile"
                      onClick={() => setOpenMenu(false)}
                      className="
          flex
          items-center
          rounded-2xl
          px-4
          py-3
          text-sm
          transition
          hover:bg-slate-100
        "
                    >
                      👤 Profile
                    </Link>

                    <Link
                      href="/dashboard/company/subscription"
                      onClick={() => setOpenMenu(false)}
                      className="
          flex
          items-center
          rounded-2xl
          px-4
          py-3
          text-sm
          transition
          hover:bg-slate-100
        "
                    >
                      💳 Subscription
                    </Link>

                    <Link
                      href="/dashboard/company/settings"
                      onClick={() => setOpenMenu(false)}
                      className="
          flex
          items-center
          rounded-2xl
          px-4
          py-3
          text-sm
          transition
          hover:bg-slate-100
        "
                    >
                      ⚙️ Settings
                    </Link>

                    <div className="my-2 border-t border-slate-100" />

                    <Link
                      href="/"
                      onClick={() => setOpenMenu(false)}
                      className="
          flex
          items-center
          rounded-2xl
          px-4
          py-3
          text-sm
          text-red-500
          transition
          hover:bg-red-50
        "
                    >
                      🚪 Logout
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
                onClick={(e) => e.stopPropagation()}
                className="
absolute
right-0
top-0
h-full
w-[75%]
max-w-[300px]
bg-white
shadow-[0_20px_50px_rgba(0,0,0,0.12)]
transition-transform
duration-300
ease-out
"
              >
                <div
                  className="
    flex
    items-center
    justify-between
    border-b
    border-slate-100
    p-5
  "
                >
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {company?.logoUrl ? (
                        <img
                          src={company.logoUrl}
                          alt={company.name}
                          className="h-12 w-12 rounded-2xl object-cover"
                        />
                      ) : (
                        <div
                          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          text-white
          font-bold
        "
                        >
                          {company?.name?.charAt(0)}
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-slate-900">
                          {company?.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          Employer Account
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="
    rounded-xl
    p-2
    transition
    hover:bg-slate-100
  "
                  >
                    <X size={22} />
                  </button>
                </div>

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
                    href="/dashboard/company/profile"
                    className="
            mb-2
            block
            rounded-xl
            px-4
            py-3
            hover:bg-slate-100
          "
                  >
                    👤 Profile
                  </Link>

                  <Link
                    href="/dashboard/company/subscription"
                    className="
            mb-2
            block
            rounded-xl
            px-4
            py-3
            hover:bg-slate-100
          "
                  >
                    💳 Subscription
                  </Link>

                  <Link
                    href="/dashboard/company/settings"
                    className="
            mb-2
            block
            rounded-xl
            px-4
            py-3
            hover:bg-slate-100
          "
                  >
                    ⚙️ Settings
                  </Link>

                  <Link
                    href="/"
                    className="
            mt-4
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

        {/* CONTENT */}

        <main
          className="
            mx-auto
            max-w-7xl
            px-6
            py-8
          "
        >
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
