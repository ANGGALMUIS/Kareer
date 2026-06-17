"use client";

import { useEffect, useState } from "react";

import { getSavedJobs, removeSavedJob } from "@/services/saved-job.service";

interface SavedJob {
  id: string;

  jobListing: {
    id: string;
    title: string;
    description: string;
    location?: string | null;
  };
}

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {
    try {
      const response = await getSavedJobs();

      setSavedJobs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const handleRemove = async (jobId: string) => {
    try {
      await removeSavedJob(jobId);

      setSavedJobs((prev) =>
        prev.filter((item) => item.jobListing.id !== jobId),
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold">Lowongan Tersimpan</h1>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-40 animate-pulse rounded-xl border bg-gray-100"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 pt-2 pb-10">
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

          <h1 className="mt-2 text-4xl font-bold">Saved Jobs</h1>

          <p className="mt-3 text-blue-100">
            Simpan lowongan favoritmu dan lamar kapan saja.
          </p>
        </div>

        {/* STATS */}

        <div className="mb-8">
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
            <p className="text-sm text-slate-500">Total Saved Jobs</p>

            <h2 className="mt-3 text-4xl font-bold text-purple-600">
              {savedJobs.length}
            </h2>
          </div>
        </div>

        {/* CONTENT */}

        {savedJobs.length === 0 ? (
          <div
            className="
            rounded-3xl
            bg-white
            p-12
            text-center
            shadow-sm
          "
          >
            <div className="text-6xl">🔖</div>

            <h2 className="mt-4 text-2xl font-bold">
              Belum Ada Lowongan Tersimpan
            </h2>

            <p className="mt-3 text-slate-500">
              Simpan lowongan yang menarik agar mudah ditemukan kembali.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {savedJobs.map((savedJob) => (
              <div
                key={savedJob.id}
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
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">
                      {savedJob.jobListing.title}
                    </h2>

                    {savedJob.jobListing.location && (
                      <p className="mt-2 text-slate-500">
                        📍 {savedJob.jobListing.location}
                      </p>
                    )}

                    <p className="mt-4 line-clamp-3 text-slate-600">
                      {savedJob.jobListing.description}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={`/jobs/${savedJob.jobListing.id}`}
                      className="
                      rounded-xl
                      bg-blue-600
                      px-5
                      py-3
                      font-medium
                      text-white
                      transition-all
                      duration-300
                      hover:bg-blue-700
                    "
                    >
                      Lihat Detail
                    </a>

                    <button
                      onClick={() => handleRemove(savedJob.jobListing.id)}
                      className="
                      rounded-xl
                      bg-red-500
                      px-5
                      py-3
                      font-medium
                      text-white
                      transition-all
                      duration-300
                      hover:bg-red-600
                    "
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
