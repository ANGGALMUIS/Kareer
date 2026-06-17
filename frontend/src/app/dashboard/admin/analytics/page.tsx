"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

import { getAdminAnalytics } from "@/services/admin-analytics.service";

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await getAdminAnalytics();

      setAnalytics(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute role="ADMIN">
        <div className="p-10">Loading...</div>
      </ProtectedRoute>
    );
  }

  return (
    <div className="space-y-8">
      {/* HERO */}
      <div
        className="
        relative
        overflow-hidden
        rounded-[32px]
        bg-gradient-to-r
        from-indigo-600
        via-blue-600
        to-cyan-500
        p-10
        text-white
      "
      >
        <div className="relative z-10">
          <p className="mb-2 text-sm opacity-90">Kareer Analytics</p>

          <h1 className="text-5xl font-bold">Platform Analytics 📊</h1>

          <p className="mt-3 max-w-2xl text-white/80">
            Statistik lengkap pengguna, perusahaan, lowongan, aplikasi dan
            revenue platform.
          </p>
        </div>

        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10" />
        <div className="absolute bottom-0 right-20 h-32 w-32 rounded-full bg-white/10" />
      </div>

      {/* MAIN STATS */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card
          title="Total Users"
          value={analytics?.users?.total ?? 0}
          color="text-blue-600"
        />

        <Card
          title="Applicants"
          value={analytics?.users?.applicants ?? 0}
          color="text-cyan-600"
        />

        <Card
          title="Companies"
          value={analytics?.users?.companies ?? 0}
          color="text-emerald-600"
        />

        <Card
          title="Verified Companies"
          value={analytics?.companies?.verified ?? 0}
          color="text-green-600"
        />
      </div>

      {/* JOBS & APPLICATIONS */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-xl font-bold">Job Statistics</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span>Total Jobs</span>

              <span className="font-bold text-blue-600">
                {analytics?.jobs?.total ?? 0}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span>Active Jobs</span>

              <span className="font-bold text-green-600">
                {analytics?.jobs?.active ?? 0}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-xl font-bold">Application Statistics</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span>Total Applications</span>

              <span className="font-bold text-indigo-600">
                {analytics?.applications?.total ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PAYMENTS */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-xl font-bold">Payment & Revenue</h3>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-green-50 p-5">
            <p className="text-sm text-green-600">Approved Payments</p>

            <h2 className="mt-2 text-4xl font-bold text-green-700">
              {analytics?.payments?.approved ?? 0}
            </h2>
          </div>

          <div className="rounded-3xl bg-blue-50 p-5">
            <p className="text-sm text-blue-600">Total Payments</p>

            <h2 className="mt-2 text-4xl font-bold text-blue-700">
              {analytics?.payments?.total ?? 0}
            </h2>
          </div>

          <div className="rounded-3xl bg-purple-50 p-5">
            <p className="text-sm text-purple-600">Revenue</p>

            <h2 className="mt-2 text-3xl font-bold text-purple-700">
              Rp {(analytics?.revenue ?? 0).toLocaleString()}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: any;
  color: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>

      <h2 className={`mt-3 text-5xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}
