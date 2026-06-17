"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

import { getCompanyAnalytics } from "@/services/company.service";

interface AnalyticsData {
  totalJobs: number;
  activeJobs: number;
  totalApplicants: number;

  review: number;
  interview: number;
  accepted: number;
  rejected: number;

  jobs: {
    id: string;
    title: string;
    applicants: number;
  }[];
}

export default function CompanyAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await getCompanyAnalytics();

      setAnalytics(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute role="COMPANY">
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-1">
          <div
            className="
    relative
    overflow-hidden
    rounded-[32px]
    bg-gradient-to-r
    from-blue-600
    via-blue-600
    to-violet-600
    p-10
    text-white
  "
          >
            <p className="text-white/80">Recruitment Performance</p>

            <h1 className="mt-2 text-5xl font-bold">Analytics Dashboard</h1>

            <p className="mt-4 max-w-2xl text-white/90">
              Pantau performa lowongan, kandidat, interview, dan efektivitas
              proses rekrutmen perusahaan.
            </p>
          </div>

          {loading ? (
            <div className="mt-5"></div>
          ) : (
            <>
              <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Total Jobs"
                  value={analytics?.totalJobs || 0}
                  color="blue"
                />

                <StatCard
                  title="Applicants"
                  value={analytics?.totalApplicants || 0}
                  color="purple"
                />

                <StatCard
                  title="Interview"
                  value={analytics?.interview || 0}
                  color="orange"
                />

                <StatCard
                  title="Accepted"
                  value={analytics?.accepted || 0}
                  color="green"
                />

                <StatCard
                  title="Rejected"
                  value={analytics?.rejected || 0}
                  color="red"
                />

                <StatCard
                  title="Review"
                  value={analytics?.review || 0}
                  color="yellow"
                />

                <StatCard
                  title="Active Jobs"
                  value={analytics?.activeJobs || 0}
                  color="indigo"
                />
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <div
                  className="
      rounded-[32px]
      border
      border-slate-200
      bg-white
      p-8
      shadow-sm
    "
                >
                  <h2 className="text-2xl font-bold">Hiring Funnel</h2>

                  <div className="mt-6 space-y-5">
                    <FunnelBar
                      label="Review"
                      value={analytics?.review || 0}
                      color="bg-yellow-500"
                    />

                    <FunnelBar
                      label="Interview"
                      value={analytics?.interview || 0}
                      color="bg-purple-500"
                    />

                    <FunnelBar
                      label="Accepted"
                      value={analytics?.accepted || 0}
                      color="bg-green-500"
                    />

                    <FunnelBar
                      label="Rejected"
                      value={analytics?.rejected || 0}
                      color="bg-red-500"
                    />
                  </div>
                </div>

                <div
                  className="
    rounded-[32px]
    border
    border-slate-200
    bg-white
    p-8
    shadow-sm
  "
                >
                  <h2 className="text-2xl font-bold">Applicants Per Job</h2>

                  <div className="mt-6 space-y-5">
                    {analytics?.jobs?.map((job) => (
                      <div key={job.id}>
                        <div className="mb-2 flex justify-between">
                          <span className="font-medium">{job.title}</span>

                          <span className="text-blue-600 font-semibold">
                            {job.applicants} Pelamar
                          </span>
                        </div>

                        <div className="h-3 rounded-full bg-slate-100">
                          <div
                            className="
              h-full
              rounded-full
              bg-blue-600
            "
                            style={{
                              width: `${Math.min(job.applicants * 20, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  const styles = {
    blue: "bg-blue-50 border-blue-100 text-blue-700",
    purple: "bg-purple-50 border-purple-100 text-purple-700",
    green: "bg-green-50 border-green-100 text-green-700",
    red: "bg-red-50 border-red-100 text-red-700",
    yellow: "bg-yellow-50 border-yellow-100 text-yellow-700",
    orange: "bg-orange-50 border-orange-100 text-orange-700",
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-700",
  };

  return (
    <div
      className={`
        rounded-[28px]
        border
        p-6
        shadow-sm
        ${styles[color as keyof typeof styles]}
      `}
    >
      <p className="text-sm font-medium">{title}</p>

      <h2 className="mt-3 text-4xl font-bold">{value}</h2>
    </div>
  );
}

function FunnelBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span>{label}</span>

        <span className="font-semibold">{value}</span>
      </div>

      <div className="h-3 rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${Math.min(value * 20, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
