"use client";

import { useEffect, useMemo, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";
import { toast } from "sonner";
import {
  getCompanyInterviews,
  updateInterview,
} from "@/services/interview.service";

export default function CompanyInterviewsPage() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews(page);
  }, [page]);

  const fetchInterviews = async (currentPage = page) => {
    try {
      const response = await getCompanyInterviews(currentPage, 10);

      setInterviews(response.data || []);

      setPagination(
        response.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1,
        },
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (id: string) => {
    try {
      await updateInterview(id, {
        status: "COMPLETED",
      });

      fetchInterviews();
    } catch (error) {
      console.error(error);
      toast.error("Gagal update interview");
    }
  };

  const cancelInterview = async (id: string) => {
    const confirmed = window.confirm("Batalkan interview ini?");

    if (!confirmed) return;

    try {
      await updateInterview(id, {
        status: "CANCELLED",
      });

      fetchInterviews();
    } catch (error) {
      console.error(error);
      toast.error("Gagal membatalkan interview");
    }
  };

  const upcoming = useMemo(() => {
    return interviews.filter((i) => i.status === "SCHEDULED");
  }, [interviews]);

  const completed = useMemo(() => {
    return interviews.filter((i) => i.status === "COMPLETED");
  }, [interviews]);

  const cancelled = useMemo(() => {
    return interviews.filter((i) => i.status === "CANCELLED");
  }, [interviews]);

  if (loading) {
    return (
      <ProtectedRoute role="COMPANY">
        <div></div>
      </ProtectedRoute>
    );
  }

  const filteredInterviews = interviews
    .filter((interview) => {
      const matchesStatus =
        statusFilter === "ALL" || interview.status === statusFilter;

      const matchesSearch =
        interview.application.user.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        interview.application.jobListing.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      const statusOrder = {
        SCHEDULED: 1,
        COMPLETED: 2,
        CANCELLED: 3,
      };

      const statusDiff =
        statusOrder[a.status as keyof typeof statusOrder] -
        statusOrder[b.status as keyof typeof statusOrder];

      if (statusDiff !== 0) {
        return statusDiff;
      }

      return (
        new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
      );
    });

  return (
    <ProtectedRoute role="COMPANY">
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-1 sm:px-1 md:px-6 py-1">
          <div
            className="
    relative
    overflow-hidden
    rounded-[32px]
    bg-gradient-to-r
    from-blue-600
    via-blue-700
    to-violet-600
    px-10
    py-8
    text-white
    shadow-xl
  "
          >
            <div className="relative z-10">
              <p className="text-sm text-blue-100">Recruitment Workspace</p>

              <h1 className="mt-2 text-4xl font-bold">🎤 Interview Center</h1>

              <p className="mt-4 max-w-2xl text-blue-100">
                Kelola seluruh jadwal interview, pantau progres kandidat, dan
                ambil keputusan rekrutmen dengan lebih cepat.
              </p>
            </div>

            <div
              className="
      absolute
      -right-20
      -top-20
      h-64
      w-64
      rounded-full
      bg-white/10
    "
            />
          </div>

          {/* SUMMARY */}

          <div className=" grid gap-6 md:grid-cols-3 py-6">
            <StatCard title="Upcoming" value={upcoming.length} />

            <StatCard title="Completed" value={completed.length} />

            <StatCard title="Cancelled" value={cancelled.length} />
          </div>

          <div
            className="
    rounded-[32px]
    border
    border-slate-100
    bg-white
    p-6
    shadow-sm
  "
          >
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="🔍 Cari Kandidat..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                  w-full
        flex-1
        rounded-2xl
        border
        border-slate-200
        px-5
        py-3
        outline-none
        focus:border-blue-500
      "
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="
        rounded-2xl
        border
        border-slate-200
        px-5
        py-3
      "
              >
                <option value="ALL">Semua Status</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Menampilkan {filteredInterviews.length} interview
            </p>
          </div>

          {/* INTERVIEW CARDS */}

          <div className="mt-5 space-y-5">
            {filteredInterviews.map((interview) => (
              <div
                key={interview.id}
                className="
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition
        hover:shadow-md
      "
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                  {/* LEFT */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div
                        className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-blue-100
                text-lg
                font-bold
                text-blue-700
              "
                      >
                        {interview.application?.user?.name
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {interview.application?.user?.name}
                        </h3>

                        <p className="text-slate-500">
                          {interview.application?.jobListing?.title}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-xs uppercase text-slate-400">
                          Jadwal
                        </p>

                        <p className="font-medium">
                          {new Date(interview.scheduledAt).toLocaleString(
                            "id-ID",
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase text-slate-400">
                          Lokasi
                        </p>

                        <p className="font-medium">
                          {interview.location || "-"}
                        </p>
                      </div>
                    </div>

                    {interview.notes && (
                      <div
                        className="
                mt-5
                rounded-2xl
                bg-slate-50
                p-4
              "
                      >
                        <p className="text-xs uppercase text-slate-400">
                          Catatan
                        </p>

                        <p className="mt-1 text-slate-600">{interview.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-start gap-3 lg:items-end">
                    {interview.status === "SCHEDULED" && (
                      <span
                        className="
                rounded-full
                bg-blue-100
                px-4
                py-2
                text-sm
                font-semibold
                text-blue-700
              "
                      >
                        Scheduled
                      </span>
                    )}

                    {interview.status === "COMPLETED" && (
                      <span
                        className="
                rounded-full
                bg-green-100
                px-4
                py-2
                text-sm
                font-semibold
                text-green-700
              "
                      >
                        Completed
                      </span>
                    )}

                    {interview.status === "CANCELLED" && (
                      <span
                        className="
                rounded-full
                bg-red-100
                px-4
                py-2
                text-sm
                font-semibold
                text-red-700
              "
                      >
                        Cancelled
                      </span>
                    )}

                    {interview.status === "SCHEDULED" && (
                      <div className="mt-2 flex flex-col gap-2">
                        <button
                          onClick={() => markCompleted(interview.id)}
                          className="
                  rounded-xl
                  bg-green-600
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-green-700
                "
                        >
                          Complete
                        </button>

                        <button
                          onClick={() => cancelInterview(interview.id)}
                          className="
                  rounded-xl
                  bg-red-600
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-red-700
                "
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredInterviews.length === 0 && (
              <div
                className="
        rounded-[32px]
        border
        border-dashed
        border-slate-300
        bg-white
        p-12
        text-center
      "
              >
                <h3 className="text-lg font-semibold">Belum ada interview</h3>

                <p className="mt-2 text-slate-500">
                  Interview yang dijadwalkan akan muncul di sini.
                </p>
              </div>
            )}
          </div>

          {pagination.totalPages > 1 && (
            <div
              className="
      mt-8
      flex
      items-center
      justify-center
      gap-3
    "
            >
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="
        rounded-xl
        border
        px-4
        py-2
        disabled:opacity-50
      "
              >
                Previous
              </button>

              <span className="font-medium">
                Page {pagination.page}
                {" / "}
                {pagination.totalPages}
              </span>

              <button
                disabled={page === pagination.totalPages}
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, pagination.totalPages))
                }
                className="
        rounded-xl
        border
        px-4
        py-2
        disabled:opacity-50
      "
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  const color =
    title === "Upcoming"
      ? "bg-blue-50 border-blue-100"
      : title === "Completed"
        ? "bg-green-50 border-green-100"
        : "bg-red-50 border-red-100";

  return (
    <div
      className={`
        rounded-[28px]
        border
        p-6
        shadow-sm
        ${color}
      `}
    >
      <p className="text-sm text-slate-500">{title}</p>

      <h2 className="mt-3 text-5xl font-bold">{value}</h2>
    </div>
  );
}
