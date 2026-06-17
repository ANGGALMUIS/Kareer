"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getApplicantProfile } from "@/services/applicant.service";
import { getNotifications } from "@/services/notification.service";
import { useAuthStore } from "@/store/auth.store";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Bookmark,
  Bell,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActiveMenu = (href: string) => {
    if (href === "/dashboard/applicant") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  const router = useRouter();

  const logout = useAuthStore((state) => state.logout);

  const [applicant, setApplicant] = useState<any>(null);

  const [notifications, setNotifications] = useState<any[]>([]);

  const [openMenu, setOpenMenu] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, notificationRes] = await Promise.all([
          getApplicantProfile(),
          getNotifications(),
        ]);

        setApplicant(profileRes.data);

        setNotifications(notificationRes.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();

    const handleNotificationUpdate = () => {
      loadData();
    };

    window.addEventListener("notification-updated", handleNotificationUpdate);

    return () => {
      window.removeEventListener(
        "notification-updated",
        handleNotificationUpdate,
      );
    };
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  const menus = [
    {
      name: "Dashboard",
      href: "/dashboard/applicant",
      icon: LayoutDashboard,
    },

    {
      name: "Applications",
      href: "/dashboard/applicant/applications",
      icon: FileText,
    },

    {
      name: "Interviews",
      href: "/dashboard/applicant/interviews",
      icon: Calendar,
    },

    {
      name: "Saved Jobs",
      href: "/dashboard/applicant/saved-jobs",
      icon: Bookmark,
    },

    {
      name: "Notifications",
      href: "/dashboard/applicant/notifications",
      icon: Bell,
    },
  ];

  const handleLogout = () => {
    logout();

    router.push("/");
  };

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
    <ProtectedRoute role="APPLICANT">
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
                    <span>{menu.name}</span>

                    <Icon size={16} />

                    {menu.name === "Notifications" && unreadCount > 0 && (
                      <span
                        className="
          flex
          h-5
          min-w-[20px]
          items-center
          justify-center
          rounded-full
          bg-red-500
          px-1.5
          text-[10px]
          font-bold
          text-white
          shadow-sm
        "
                      >
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ACCOUNT */}

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
                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-600
                    font-bold
                    text-white
                  "
                >
                  {applicant?.headline?.charAt(0)?.toUpperCase() || "A"}
                </div>

                <span>Applicant</span>

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
                  "
                >
                  <div className="border-b border-slate-100 p-5">
                    <p className="font-semibold">Applicant</p>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      Candidate Account
                    </p>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/dashboard/applicant/profile"
                      className="
                        flex
                        items-center
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        hover:bg-slate-100
                      "
                    >
                      👤 Profile
                    </Link>

                    <Link
                      href="/dashboard/applicant/subscriptions"
                      className="
                        flex
                        items-center
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        hover:bg-slate-100
                      "
                    >
                      💳 Subscription
                    </Link>

                    <Link
                      href="/dashboard/applicant/become-company"
                      className="
                        flex
                        items-center
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        hover:bg-slate-100
                      "
                    >
                      🏢 Become Company
                    </Link>

                    <div className="my-2 border-t border-slate-100" />

                    <button
                      onClick={handleLogout}
                      className="
                        flex
                        w-full
                        items-center
                        rounded-2xl
                        px-4
                        py-3
                        text-left
                        text-sm
                        text-red-500
                        hover:bg-red-50
                      "
                    >
                      🚪 Logout
                    </button>
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
  "
              >
                {/* HEADER */}

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
              from-blue-600
              to-indigo-600
              text-white
              font-bold
            "
                    >
                      {applicant?.headline?.charAt(0)?.toUpperCase() || "A"}
                    </div>

                    <div>
                      <p className="font-semibold">Applicant</p>

                      <p className="text-sm text-slate-500">
                        Candidate Account
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

                {/* MENUS */}

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

                        {menu.name === "Notifications" && unreadCount > 0 && (
                          <span
                            className="
                      ml-auto
                      rounded-full
                      bg-red-500
                      px-2
                      py-0.5
                      text-xs
                      text-white
                    "
                          >
                            {unreadCount}
                          </span>
                        )}
                      </Link>
                    );
                  })}

                  <div className="my-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                  <Link
                    href="/dashboard/applicant/profile"
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
                    href="/dashboard/applicant/subscriptions"
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
                    href="/dashboard/applicant/become-company"
                    className="
            mb-2
            block
            rounded-xl
            px-4
            py-3
            hover:bg-slate-100
          "
                  >
                    🏢 Become Company
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="
            mt-4
            w-full
            rounded-xl
            px-4
            py-3
            text-left
            text-red-500
            hover:bg-red-50
          "
                  >
                    🚪 Logout
                  </button>
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
