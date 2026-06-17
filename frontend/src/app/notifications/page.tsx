"use client";

import { useEffect, useState } from "react";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "@/services/notification.service";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();

      setNotifications(response.data);
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
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                isRead: true,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleReadAll = async () => {
    try {
      await markAllAsRead();

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        })),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Notifikasi</h1>

            <p className="mt-2 text-slate-500">Semua aktivitas akunmu.</p>
          </div>

          <button
            onClick={handleReadAll}
            className="
              rounded-xl
              bg-blue-600
              px-4
              py-2
              text-white
            "
          >
            Tandai Semua Dibaca
          </button>
        </div>

        {loading && <div className="mt-8">Loading...</div>}

        {!loading && (
          <div className="mt-8 space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                    rounded-3xl
                    border
                    bg-white
                    p-5
                    shadow-sm

                    ${!notification.isRead ? "border-blue-300" : ""}
                  `}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-bold">{notification.title}</h2>

                    <p className="mt-2 text-slate-600">
                      {notification.message}
                    </p>

                    <p className="mt-3 text-xs text-slate-400">
                      {new Date(notification.createdAt).toLocaleString("id-ID")}
                    </p>
                  </div>

                  {!notification.isRead && (
                    <button
                      onClick={() => handleRead(notification.id)}
                      className="
                          rounded-lg
                          bg-blue-600
                          px-3
                          py-2
                          text-sm
                          text-white
                        "
                    >
                      Baca
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
                  p-10
                  text-center
                "
              >
                Belum ada notifikasi.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
