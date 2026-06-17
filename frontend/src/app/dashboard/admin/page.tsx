"use client";

import { useEffect, useState } from "react";

import { getAdminAnalytics } from "@/services/admin-analytics.service";

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
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
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-40 animate-pulse rounded-3xl bg-white shadow-sm"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-white">
        <div className="relative z-10">
          <p className="mb-2 text-sm opacity-90">Kareer Administration</p>

          <h1 className="text-5xl font-bold">Dashboard Admin 🛡️</h1>

          <p className="mt-3 max-w-2xl text-white/80">
            Monitoring seluruh aktivitas platform Kareer.
          </p>
        </div>

        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10" />
        <div className="absolute bottom-0 right-20 h-32 w-32 rounded-full bg-white/10" />
      </div>

      {/* STATS */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Users</p>

          <h2 className="mt-3 text-5xl font-bold text-blue-600">
            {analytics?.users?.total ?? 0}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Verified Companies</p>

          <h2 className="mt-3 text-5xl font-bold text-emerald-600">
            {analytics?.companies?.verified ?? 0}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Active Jobs</p>

          <h2 className="mt-3 text-5xl font-bold text-orange-500">
            {analytics?.jobs?.active ?? 0}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Revenue</p>

          <h2 className="mt-3 text-4xl font-bold text-purple-600">
            Rp {(analytics?.revenue ?? 0).toLocaleString()}
          </h2>
        </div>
      </div>

      {/* OVERVIEW */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-xl font-bold">User Overview</h3>

          <div className="space-y-3">
            <div className="flex justify-between rounded-2xl bg-slate-50 p-4">
              <span>Total Applicant</span>

              <span className="font-bold text-blue-600">
                {analytics?.users?.applicants ?? 0}
              </span>
            </div>

            <div className="flex justify-between rounded-2xl bg-slate-50 p-4">
              <span>Total Company</span>

              <span className="font-bold text-emerald-600">
                {analytics?.users?.companies ?? 0}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-xl font-bold">Platform Overview</h3>

          <div className="space-y-3">
            <div className="flex justify-between rounded-2xl bg-slate-50 p-4">
              <span>Total Applications</span>

              <span className="font-bold text-indigo-600">
                {analytics?.applications?.total ?? 0}
              </span>
            </div>

            <div className="flex justify-between rounded-2xl bg-slate-50 p-4">
              <span>Approved Payments</span>

              <span className="font-bold text-green-600">
                {analytics?.payments?.approved ?? 0}
              </span>
            </div>

            <div className="flex justify-between rounded-2xl bg-slate-50 p-4">
              <span>Total Payments</span>

              <span className="font-bold text-purple-600">
                {analytics?.payments?.total ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
