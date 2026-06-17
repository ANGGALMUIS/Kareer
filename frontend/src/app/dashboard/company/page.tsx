"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

import {
  getCompanyDashboardStats,
  getRecentApplicants,
} from "@/services/company.service";

import {
  Briefcase,
  FileText,
  Users,
  Plus,
  ArrowRight,
  Calendar,
  TrendingUp,
} from "lucide-react";

interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplicants: number;
}

interface RecentApplicant {
  id: string;
  appliedAt: string;

  user: {
    id: string;
    name: string;

    applicantProfile?: {
      headline?: string;
    };
  };

  jobListing: {
    title: string;
  };
}

export default function CompanyDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplicants: 0,
  });

  const [recentApplicants, setRecentApplicants] = useState<RecentApplicant[]>(
    [],
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResponse, applicantsResponse] = await Promise.all([
          getCompanyDashboardStats(),
          getRecentApplicants(),
        ]);

        setStats(statsResponse.data);

        setRecentApplicants(applicantsResponse.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProtectedRoute role="COMPANY">
      {/* Fixed full-screen background — sits behind everything */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#eef2ff]">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 via-white/40 to-indigo-100/50" />
        <div className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full bg-blue-300/15 blur-[140px]" />
        <div className="absolute -right-32 -top-20 h-[600px] w-[600px] rounded-full bg-indigo-300/12 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-purple-200/12 blur-[140px]" /> */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <section className="relative min-h-screen overflow-hidden">
        <div className="mx-auto max-w-7xl px-1 sm:px-1 md:px-6 py-1">
          {/* HERO */}

          <div
            className="
    relative
    overflow-hidden
    rounded-[32px]
    bg-gradient-to-r
    from-blue-600
    via-blue-700
    to-indigo-700
    p-10
    text-white
  "
          >
            <div
              className="
      absolute
      right-0
      top-0
      h-64
      w-64
      rounded-full
      bg-white/10
      blur-3xl
    "
            />

            <div className="relative z-10">
              <p className="text-blue-100">Employer Dashboard</p>

              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold">
                👋 Selamat Datang
              </h1>

              <p
                className="
    mt-3
    max-w-xl
    text-sm
    sm:text-base
    text-purple-100
  "
              >
                Pantau perkembangan rekrutmen, kelola lowongan, dan temukan
                kandidat terbaik lebih cepat.
              </p>

              <div
                className="
        mt-8
        flex
        flex-wrap
        gap-4
      "
              >
                <Link
                  href="/dashboard/company/jobs/create"
                  className="
w-full
md:w-auto
inline-flex
gap-2
items-center
rounded-2xl
bg-white
px-5
py-3
font-semibold
text-indigo-700
"
                >
                  <Plus size={18} />
                  Buat Lowongan
                </Link>

                <Link
                  href="/dashboard/company/applications"
                  className="
w-full
md:w-auto
rounded-2xl
border
px-5
py-3
font-semibold
text-white
inline-flex
          items-center
          gap-2
"
                >
                  <ArrowRight size={18} />
                  Lihat Pelamar
                </Link>
              </div>
            </div>
          </div>

          {/* STATS */}

          <div className="mt-5 grid gap-6 md:grid-cols-3">
            <div
              className="
          rounded-3xl
          border
          border-blue-100
          bg-blue-50
          p-6
          shadow-sm
        "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Total Lowongan</p>

                  <h2 className="mt-2 text-4xl font-bold">
                    {loading ? "..." : stats.totalJobs}
                  </h2>
                </div>

                <Briefcase size={42} className="text-blue-600" />
              </div>
            </div>

            <div
              className="
          rounded-3xl
          border
          border-green-100
          bg-green-50
          p-6
          shadow-sm
        "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Lowongan Aktif</p>

                  <h2 className="mt-2 text-4xl font-bold">
                    {loading ? "..." : stats.activeJobs}
                  </h2>
                </div>

                <TrendingUp size={42} className="text-green-600" />
              </div>
            </div>

            <div
              className="
          rounded-3xl
          border
          border-purple-100
          bg-purple-50
          p-6
          shadow-sm
        "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Total Pelamar</p>

                  <h2 className="mt-2 text-4xl font-bold">
                    {loading ? "..." : stats.totalApplicants}
                  </h2>
                </div>

                <Users size={42} className="text-purple-600" />
              </div>
            </div>
          </div>

          {/* QUICK ACTION */}

          <div className="mt-5 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Quick Actions</h2>

            <div className="mt-8 grid gap-6 md:grid-cols-4">
              <Link
                href="/dashboard/company/jobs/create"
                className="
    group
    rounded-3xl
    border
    border-slate-100
    bg-white
    p-6
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-2
    hover:shadow-xl
  "
              >
                <div
                  className="
      mb-5
      flex
      h-14
      w-14
      items-center
      justify-center
      rounded-2xl
      bg-blue-100
    "
                >
                  <Plus size={28} className="text-blue-600" />
                </div>

                <h3
                  className="
      text-lg
      font-semibold
      text-slate-900
    "
                >
                  Buat Lowongan
                </h3>

                <p
                  className="
      mt-2
      text-sm
      text-slate-500
    "
                >
                  Publikasikan posisi baru dan mulai menerima kandidat.
                </p>

                <div
                  className="
      mt-6
      text-blue-600
      transition
      group-hover:translate-x-1
    "
                >
                  →
                </div>
              </Link>

              <Link
                href="/dashboard/company/jobs"
                className="
    group
    rounded-3xl
    border
    border-slate-100
    bg-white
    p-6
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-2
    hover:shadow-xl
  "
              >
                <div
                  className="
      mb-5
      flex
      h-14
      w-14
      items-center
      justify-center
      rounded-2xl
      bg-purple-100
    "
                >
                  <Briefcase size={28} className="text-purple-600" />
                </div>

                <h3
                  className="
      text-lg
      font-semibold
      text-slate-900
    "
                >
                  Kelola Lowongan
                </h3>

                <p
                  className="
      mt-2
      text-sm
      text-slate-500
    "
                >
                  Edit, update, dan kelola seluruh lowongan perusahaan.
                </p>

                <div
                  className="
      mt-6
      text-purple-600
      transition
      group-hover:translate-x-1
    "
                >
                  →
                </div>
              </Link>

              <Link
                href="/dashboard/company/applications"
                className="
    group
    rounded-3xl
    border
    border-slate-100
    bg-white
    p-6
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-2
    hover:shadow-xl
  "
              >
                <div
                  className="
      mb-5
      flex
      h-14
      w-14
      items-center
      justify-center
      rounded-2xl
      bg-green-100
    "
                >
                  <Users size={28} className="text-green-600" />
                </div>

                <h3
                  className="
      text-lg
      font-semibold
      text-slate-900
    "
                >
                  Pelamar
                </h3>

                <p
                  className="
      mt-2
      text-sm
      text-slate-500
    "
                >
                  Tinjau kandidat yang melamar dan proses rekrutmen mereka.
                </p>

                <div
                  className="
      mt-6
      text-green-600
      transition
      group-hover:translate-x-1
    "
                >
                  →
                </div>
              </Link>

              <Link
                href="/dashboard/company/interviews"
                className="
    group
    rounded-3xl
    border
    border-slate-100
    bg-white
    p-6
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-2
    hover:shadow-xl
  "
              >
                <div
                  className="
      mb-5
      flex
      h-14
      w-14
      items-center
      justify-center
      rounded-2xl
      bg-orange-100
    "
                >
                  <Calendar size={28} className="text-orange-600" />
                </div>

                <h3
                  className="
      text-lg
      font-semibold
      text-slate-900
    "
                >
                  Interview
                </h3>

                <p
                  className="
      mt-2
      text-sm
      text-slate-500
    "
                >
                  Kelola jadwal interview dan komunikasi dengan kandidat.
                </p>

                <div
                  className="
      mt-6
      text-orange-600
      transition
      group-hover:translate-x-1
    "
                >
                  →
                </div>
              </Link>
            </div>
          </div>

          {/* RECENT APPLICANTS */}

          <div className="mt-5 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Pelamar Terbaru</h2>

            <div className="mt-6 space-y-4">
              {recentApplicants.length === 0 ? (
                <p className="text-slate-500">Belum ada pelamar.</p>
              ) : (
                recentApplicants.map((application) => (
                  <Link
                    key={application.id}
                    href={`/applicants/${application.user.id}`}
                    className="
      block
      rounded-3xl
      border
      border-slate-100
      bg-white
      p-5
      transition-all
      duration-200
      hover:-translate-y-1
      hover:border-blue-200
      hover:shadow-md
    "
                  >
                    <div
                      className="
        flex
        items-center
        justify-between
      "
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-blue-100
            font-bold
            text-blue-700
          "
                        >
                          {application.user.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {application.user.name}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {application.jobListing.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {application.user.applicantProfile?.headline ||
                              "Belum menambahkan headline"}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400">Melamar pada</p>

                        <p className="text-sm font-medium text-slate-600">
                          {new Date(application.appliedAt).toLocaleDateString(
                            "id-ID",
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
