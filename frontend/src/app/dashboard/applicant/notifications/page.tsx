"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "@/services/notification.service";

import { Bell, CheckCheck } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();

      setNotifications(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleRead = async (id: string) => {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                isRead: true,
              }
            : notification,
        ),
      );

      window.dispatchEvent(new CustomEvent("notification-updated"));
    } catch (error) {
      console.error(error);
    }
  };

  const handleReadAll = async () => {
    try {
      await markAllAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );

      window.dispatchEvent(new CustomEvent("notification-updated"));
    } catch (error) {
      console.error(error);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-1 sm:px-1 md:px-6 py-1">
        {/* HERO */}

        <div
          className="
          mb-8
          overflow-hidden
          rounded-[28px]
          bg-gradient-to-r
          from-blue-600
          via-indigo-600
          to-purple-600
          p-8
          text-white
          shadow-xl
        "
        >
          <p className="text-blue-100">Applicant Workspace</p>

          <h1 className="mt-2 text-4xl font-bold">Notification Center</h1>

          <p className="mt-3 text-blue-100">
            Pantau seluruh perkembangan lamaran, interview, dan aktivitas
            akunmu.
          </p>
        </div>

        {/* STATS */}

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div
            className="
            rounded-3xl
            bg-white
            p-6
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
          >
            <p className="text-sm text-slate-500">Total Notifikasi</p>

            <h2 className="mt-3 text-4xl font-bold text-blue-600">
              {notifications.length}
            </h2>
          </div>

          <div
            className="
            rounded-3xl
            bg-white
            p-6
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
          >
            <p className="text-sm text-slate-500">Belum Dibaca</p>

            <h2 className="mt-3 text-4xl font-bold text-orange-500">
              {unreadCount}
            </h2>
          </div>
        </div>

        {/* ACTION */}

        {notifications.length > 0 && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleReadAll}
              className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              text-white
              transition-all
              duration-300
              hover:bg-blue-700
            "
            >
              <CheckCheck size={18} />
              Tandai Semua Dibaca
            </button>
          </div>
        )}

        {/* CONTENT */}

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                h-36
                animate-pulse
                rounded-3xl
                bg-white
              "
              />
            ))}
          </div>
        )}

        {!loading && (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                rounded-3xl
                border
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                ${
                  notification.isRead
                    ? "bg-white border-slate-200"
                    : "bg-blue-50 border-blue-300"
                }
              `}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Bell size={20} className="text-blue-600" />

                      <h2 className="font-bold text-lg">
                        {notification.title}
                      </h2>

                      {!notification.isRead && (
                        <span
                          className="
                          rounded-full
                          bg-blue-600
                          px-2
                          py-1
                          text-xs
                          font-medium
                          text-white
                        "
                        >
                          NEW
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-slate-600">
                      {notification.message}
                    </p>

                    <p className="mt-4 text-sm text-slate-400">
                      {new Date(notification.createdAt).toLocaleString("id-ID")}
                    </p>
                  </div>

                  {!notification.isRead && (
                    <button
                      onClick={() => handleRead(notification.id)}
                      className="
                      rounded-xl
                      bg-blue-600
                      px-4
                      py-2
                      text-sm
                      text-white
                      transition-all
                      duration-300
                      hover:bg-blue-700
                    "
                    >
                      Dibaca
                    </button>
                  )}
                </div>
              </div>
            ))}

            {notifications.length === 0 && (
              <div
                className="
                rounded-3xl
                bg-white
                p-12
                text-center
                shadow-sm
              "
              >
                <div className="text-6xl">🔔</div>

                <h2 className="mt-4 text-2xl font-bold">
                  Belum Ada Notifikasi
                </h2>

                <p className="mt-3 text-slate-500">
                  Notifikasi akan muncul ketika ada perkembangan pada lamaran,
                  interview, maupun aktivitas akun.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
