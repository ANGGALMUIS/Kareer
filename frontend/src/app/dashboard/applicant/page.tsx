"use client";

import { useEffect, useState } from "react";
import { getNotifications } from "@/services/notification.service";
import api from "@/lib/api";
import { getMySubscription } from "@/services/applicant-subscription.service";

interface Application {
  id: string;
  status: string;
  jobListing: {
    title: string;
  };
}

interface SavedJob {
  id: string;
  jobListing: {
    title: string;
  };
}

interface Notification {
  id: string;
  title: string;
  isRead: boolean;
}

export default function ApplicantDashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [applicationsRes, savedJobsRes, profileRes] = await Promise.all([
          api.get("/applications/my"),
          api.get("/saved-jobs"),
          api.get("/profile/me"),
        ]);

        let subscriptionData = null;

        try {
          const subscriptionRes = await getMySubscription();

          subscriptionData = subscriptionRes.data;
        } catch (error) {
          console.log("No active subscription");
        }

        const notificationsRes = await getNotifications();
        setApplications(applicationsRes.data.data);
        setSavedJobs(savedJobsRes.data.data);
        setNotifications(notificationsRes.data || []);
        setSubscription(subscriptionData);
        setProfile(profileRes.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold">Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-xl border bg-gray-100"
            />
          ))}
        </div>
      </section>
    );
  }

const totalApplications = applications.length;

  const isPremium = subscription?.status === "ACTIVE";
  const profileFields = [
    profile?.headline,
    profile?.bio,
    profile?.location,
    profile?.phone,
    profile?.linkedinUrl,
    profile?.githubUrl,
    profile?.portfolioUrl,
    profile?.cvUrl,
  ];

  const completedFields = profileFields.filter(Boolean).length;

  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100,
  );

  return (
    <>
      {/* HERO */}

      <div
        className="
    relative
    mb-10
    overflow-hidden
    rounded-[32px]
    bg-gradient-to-r
    from-blue-600
    via-indigo-600
    to-purple-600
    p-12
    text-white
    shadow-xl
  "
      >
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <p className="text-sm font-medium text-blue-100">Applicant Workspace</p>

        <h1 className="mt-3 text-5xl font-bold">Selamat Datang 👋</h1>

        <p className="mt-4 max-w-2xl text-blue-100">
          Temukan peluang karier terbaik dan pantau seluruh proses rekrutmenmu
          dalam satu tempat.
        </p>
      </div>

      {/* STATS */}

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div
          className="
          group
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
          <p className="text-sm text-slate-500">Total Lamaran</p>

          <h2 className="mt-3 text-4xl font-bold text-blue-600">
            {applications.length}
          </h2>
        </div>

        <div
          className="
          group
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
          <p className="text-sm text-slate-500">Saved Jobs</p>

          <h2 className="mt-3 text-4xl font-bold text-purple-600">
            {savedJobs.length}
          </h2>
        </div>

        <div
          className="
          group
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
          <p className="text-sm text-slate-500">Notifikasi</p>

          <h2 className="mt-3 text-4xl font-bold text-orange-500">
            {notifications.length}
          </h2>
        </div>

        {isPremium ? (
          <div
            className="
      rounded-3xl
      bg-green-600
      p-6
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
          >
            <p className="text-green-100">Membership</p>

            <h2 className="mt-3 text-2xl font-bold">PREMIUM ⭐</h2>

            <p className="mt-2 text-green-100">Unlimited Applications</p>

            <div className="mt-4 h-2 rounded-full bg-white/20">
              <div className="h-full w-full rounded-full bg-white" />
            </div>
          </div>
        ) : (
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
            <p className="text-sm text-slate-500">Membership</p>

            <h2 className="mt-3 text-2xl font-bold">FREE</h2>

            <p className="mt-3 text-lg font-semibold">
              {totalApplications}/5 Applications
            </p>

            <div className="mt-3 h-2 rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${Math.min((totalApplications / 5) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* PROFILE */}

      <div
        className="
        mb-10
        rounded-3xl
        border
        border-blue-100
        bg-gradient-to-br
        from-white
        to-blue-50
        p-8
        shadow-sm
      "
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Profile Completion</h2>

            <p className="mt-2 text-slate-500">
              Lengkapi profil untuk meningkatkan peluang diterima recruiter.
            </p>
          </div>

          <div className="text-5xl font-bold text-blue-600">
            {profileCompletion}%
          </div>
        </div>

        <div className="mt-6 h-4 rounded-full bg-slate-200">
          <div
            className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-blue-500
            to-indigo-600
            transition-all
            duration-1000
          "
            style={{
              width: `${profileCompletion}%`,
            }}
          />
        </div>
      </div>

      {/* BOTTOM */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Lamaran Terbaru */}

        <div
          className="
      rounded-3xl
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:shadow-xl
    "
        >
          <h2 className="mb-6 text-2xl font-bold">Lamaran Terbaru</h2>

          {applications.length === 0 ? (
            <p className="text-slate-500">Belum ada lamaran.</p>
          ) : (
            <div className="space-y-4">
              {applications.slice(0, 5).map((application) => (
                <div
                  key={application.id}
                  className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-100
                p-4
                transition-all
                duration-300
                hover:border-blue-200
                hover:shadow-md
              "
                >
                  <div>
                    <p className="font-semibold">
                      {application.jobListing.title}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Status Lamaran
                    </p>
                  </div>

                  <span
                    className="
                  rounded-full
                  bg-blue-100
                  px-3
                  py-1
                  text-sm
                  font-medium
                  text-blue-700
                "
                  >
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifikasi Terbaru */}

        <div
          className="
      rounded-3xl
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:shadow-xl
    "
        >
          <h2 className="mb-6 text-2xl font-bold">Notifikasi Terbaru</h2>

          {notifications.length === 0 ? (
            <p className="text-slate-500">Belum ada notifikasi.</p>
          ) : (
            <div className="space-y-4">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className="
                rounded-2xl
                border
                border-slate-100
                p-4
                transition-all
                duration-300
                hover:border-orange-200
                hover:shadow-md
              "
                >
                  <p className="font-semibold">{notification.title}</p>

                  {!notification.isRead && (
                    <span
                      className="
                    mt-2
                    inline-flex
                    rounded-full
                    bg-blue-100
                    px-2
                    py-1
                    text-xs
                    font-medium
                    text-blue-700
                  "
                    >
                      Baru
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
