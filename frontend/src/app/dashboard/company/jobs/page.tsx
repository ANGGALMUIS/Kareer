"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

import { deleteJob, getMyJobs } from "@/services/job.service";

import { Job } from "@/types/job";

import { Briefcase, Pencil, Plus, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
export default function CompanyJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [loading, setLoading] = useState(true);

  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);

  const fetchJobs = async (currentPage = page, keyword = search) => {
    setLoading(true);
    try {
      const response = await getMyJobs(currentPage, 10, keyword);

      setJobs(response.data || []);

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

  useEffect(() => {
    fetchJobs(page, debouncedSearch);
  }, [page, debouncedSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const handleDelete = async (id: string) => {
    setDeletingJobId(id);
    try {
      await deleteJob(id);

      setJobs((prev) => prev.filter((job) => job.id !== id));

      toast.success("Lowongan berhasil dihapus");
    } catch (error) {
      console.error(error);

      toast.error("Gagal menghapus lowongan");
    } finally {
      setDeletingJobId(null);
    }
  };

  const employmentTypeLabel: Record<string, string> = {
    FULL_TIME: "Full Time",
    PART_TIME: "Part Time",
    INTERNSHIP: "Magang",
    CONTRACT: "Kontrak",
    FREELANCE: "Freelance",
  };

  const workModeLabel: Record<string, string> = {
    ONSITE: "Onsite",
    HYBRID: "Hybrid",
    REMOTE: "Remote",
  };

  const experienceLevelLabel: Record<string, string> = {
    FRESH_GRADUATE: "Fresh Graduate",
    JUNIOR: "Junior",
    MID_LEVEL: "Mid Level",
    SENIOR: "Senior",
  };

  return (
    <ProtectedRoute role="COMPANY">
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-1 sm:px-1 md:px-6 py-1">
          {/* HEADER */}
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

            <div
              className="
    relative
    z-10
    flex
    flex-col
    gap-6

    lg:flex-row
    lg:items-center
    lg:justify-between
  "
            >
              <div>
                <p className="text-blue-100">Recruitment Workspace</p>

                <h1
                  className="
    mt-2
    text-3xl
    font-bold

    md:text-5xl
  "
                >
                  📦 Lowongan Saya
                </h1>

                <p className="mt-4 max-w-xl text-blue-100">
                  Kelola seluruh lowongan perusahaan, pantau performa rekrutmen,
                  dan temukan kandidat terbaik.
                </p>
              </div>

              <Link
                href="/dashboard/company/jobs/create"
                className="
    w-full
    rounded-2xl
    bg-white
    px-6
    py-3
    text-center
    font-semibold
    text-blue-700

    sm:w-auto
  "
              >
                + Buat Lowongan
              </Link>
            </div>
          </div>

          <div className="-mt-0 grid gap-6 md:grid-cols-3 py-5">
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
              <p className="text-sm text-blue-600">Total Lowongan</p>

              <h2 className="mt-2 text-4xl font-bold">{jobs.length}</h2>
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
              <p className="text-sm text-green-600">Lowongan Aktif</p>

              <h2 className="mt-2 text-4xl font-bold">{jobs.length}</h2>
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
              <p className="text-sm text-purple-600">Halaman</p>

              <h2 className="mt-2 text-4xl font-bold">{page}</h2>
            </div>
          </div>

          {/* SEARCH */}

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
            <div
              className="
    flex
    flex-col
    gap-3

    sm:flex-row
  "
            >
              <input
                type="text"
                placeholder="🔍 Cari lowongan..."
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
"
              />

              <button
                onClick={() => setPage(1)}
                className="
  w-full
  rounded-2xl
  bg-blue-600
  px-6
  py-3
  text-white

  sm:w-auto
"
              >
                Cari
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Menampilkan {jobs.length} dari {pagination.total} lowongan
            </p>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="mt-8 space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    h-44
                    animate-pulse
                     rounded-3xl
                    bg-white
                  "
                />
              ))}
            </div>
          )}

          {/* EMPTY */}

          {!loading && jobs.length === 0 && (
            <div
              className="
                mt-8
                rounded-3xl
                bg-white
                p-12
                text-center
                shadow-sm
              "
            >
              <Briefcase size={48} className="mx-auto text-slate-300" />

              <h2 className="mt-4 text-2xl font-bold">Belum Ada Lowongan</h2>

              <p className="mt-2 text-slate-500">
                Buat lowongan pertama untuk mulai mencari kandidat.
              </p>

              <Link
                href="/dashboard/company/jobs/create"
                className="
                  mt-6
                  inline-flex
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-3
                  text-white
                "
              >
                Buat Lowongan
              </Link>
            </div>
          )}

          {/* JOB LIST */}

          {!loading && jobs.length > 0 && (
            <div className="mt-5 space-y-5">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="
    group
    rounded-[32px]
    border
    border-slate-100
    bg-white
    p-8
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-xl
  "
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h2
                        className="
    text-2xl
    font-bold
    transition
    group-hover:text-blue-600
  "
                      >
                        {job.title}
                      </h2>

                      <div className="mt-3 flex gap-2">
                        <span
                          className="
      rounded-full
      bg-green-100
      px-3
      py-1
      text-xs
      font-medium
      text-green-700
    "
                        >
                          Aktif
                        </span>
                      </div>

                      <p className="mt-2 text-slate-500">
                        {job.location || "Remote"}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.employmentType && (
                          <span
                            className="
                              rounded-full
                              bg-blue-100
                              px-3
                              py-1
                              text-sm
                              text-blue-700
                            "
                          >
                            {employmentTypeLabel[job.employmentType]}
                          </span>
                        )}

                        {job.workMode && (
                          <span
                            className="
                              rounded-full
                              bg-purple-100
                              px-3
                              py-1
                              text-sm
                              text-purple-700
                            "
                          >
                            {workModeLabel[job.workMode]}
                          </span>
                        )}

                        {job.experienceLevel && (
                          <span
                            className="
                              rounded-full
                              bg-orange-100
                              px-3
                              py-1
                              text-sm
                              text-orange-700
                            "
                          >
                            {experienceLevelLabel[job.experienceLevel]}
                          </span>
                        )}
                      </div>

                      {job.salaryMin && job.salaryMax && (
                        <p className="mt-4 font-medium">
                          Rp {job.salaryMin.toLocaleString()}
                          {" - "}
                          Rp {job.salaryMax.toLocaleString()}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/dashboard/company/jobs/${job.id}/edit`}
                        className="
    inline-flex
    items-center
    gap-2
    rounded-2xl
    bg-blue-50
    px-5
    py-3
    font-medium
    text-blue-600
    transition-all
    hover:bg-blue-100
    hover:shadow-sm
  "
                      >
                        <Pencil size={16} />
                        Edit
                      </Link>

                      <ConfirmDialog
                        title="Hapus Lowongan"
                        description="Lowongan yang dihapus tidak dapat dikembalikan."
                        onConfirm={() => handleDelete(job.id)}
                        trigger={
                          <button
                            disabled={deletingJobId === job.id}
                            className="
    inline-flex
    items-center
    gap-2
    rounded-2xl
    bg-red-50
    px-5
    py-3
    font-medium
    text-red-600
    transition-all
    hover:bg-red-100
    hover:shadow-sm
    disabled:opacity-50
  "
                          >
                            <Trash2 size={16} />

                            {deletingJobId === job.id ? "Deleting..." : "Hapus"}
                          </button>
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {pagination.totalPages > 1 && (
            <div
              className="
      mt-4
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
