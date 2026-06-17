"use client";

import { useEffect, useState } from "react";

import JobCard from "@/components/jobs/JobCard";

import { getJobs } from "@/services/job.service";

import { Job } from "@/types/job";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [keyword, setKeyword] = useState("");

  const [location, setLocation] = useState("");

  const [employmentType, setEmploymentType] = useState("");

  const [workMode, setWorkMode] = useState("");

  const [experienceLevel, setExperienceLevel] = useState("");

  const [industry, setIndustry] = useState("");

  const [salaryMin, setSalaryMin] = useState("");

  const [sortBy, setSortBy] = useState("relevant");

  const [salaryMax, setSalaryMax] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const data = await getJobs({
        keyword,
        location,

        employmentType,
        workMode,
        experienceLevel,

        industry,

        salaryMin: salaryMin ? Number(salaryMin) : undefined,

        salaryMax: salaryMax ? Number(salaryMax) : undefined,

        page,
        limit: 10,
      });

      setJobs(data.jobs);

      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [
    page,

    keyword,
    location,

    employmentType,
    workMode,
    experienceLevel,

    industry,

    salaryMin,
    salaryMax,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const keywordFromUrl = params.get("keyword") || "";

    if (keywordFromUrl) {
      setKeyword(keywordFromUrl);
    }
  }, []);

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return (b.salaryMax || 0) - (a.salaryMax || 0);
  });

  return (
    <section className="min-h-screen bg-slate-50">
      {/* HERO */}
      <div className="border-slate bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Temukan Lowongan Terbaik
          </h1>

          <p className="mt-2 text-slate-500">
            Cari pekerjaan sesuai minat, kemampuan, dan tujuan kariermu.
          </p>

          <div className="mt-8 flex flex-col gap-3 lg:flex-row">
            {/* KEYWORD */}

            <div
              className="
          flex
          flex-1
          items-center
          rounded-xl
          bg-slate-100
          px-4
        "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-5 w-5 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                />
              </svg>

              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari Nama Pekerjaan, Skill, dan Perusahaan"
                className="
            h-14
            w-full
            bg-transparent
            outline-none
          "
              />
            </div>

            {/* LOKASI */}

            <div
              className="
          flex
          items-center
          rounded-xl
          bg-slate-100
          px-4
          lg:w-[360px]
        "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-5 w-5 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Semua Kota/Provinsi"
                className="
            h-14
            w-full
            bg-transparent
            outline-none
          "
              />
            </div>

            {/* BUTTON */}
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* MOBILE FILTER BAR */}
        <div className="mb-6 lg:hidden">
          <button
            onClick={() => setShowFilters(true)}
            className="
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-2xl
        border
        border-slate-200
        bg-white
        py-3
        font-medium
        text-slate-700
        shadow-sm
      "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h18M6 12h12M10 20h4"
              />
            </svg>
            Filter Pencarian
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* FILTER */}

          {showFilters && (
            <div
              onClick={() => setShowFilters(false)}
              className="
      fixed
      inset-0
      z-40
      bg-black/40
      lg:hidden
    "
            />
          )}

          <aside
            className={`
    ${showFilters ? "translate-x-0" : "-translate-x-full"}

    fixed
    inset-y-0
    left-0
    z-50
    w-[75%]
max-w-[300px]
    overflow-y-auto
    bg-white
    p-6
    shadow-2xl
    transition-transform

    lg:sticky
    lg:top-24
    lg:h-fit
    lg:w-auto
    lg:translate-x-0
  `}
          >
            <div className="border-b border-slate-200 pb-5">
              <h2 className="text-lg font-bold text-slate-900">Prioritaskan</h2>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSortBy("relevant")}
                  className={`
        h-11
        rounded-xl
        text-sm
        font-medium
        transition-all

        ${
          sortBy === "relevant"
            ? "bg-blue-600 text-white shadow-md"
            : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
        }
      `}
                >
                  Relevan
                </button>

                <button
                  onClick={() => setSortBy("newest")}
                  className={`
        h-11
        rounded-xl
        text-sm
        font-medium
        transition-all

        ${
          sortBy === "newest"
            ? "bg-blue-600 text-white shadow-md"
            : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
        }
      `}
                >
                  Terbaru
                </button>
              </div>
            </div>

            {/* TIPE KERJA */}

            <div className="mt-6">
              <h3 className="mb-3 font-semibold">Tipe Pekerjaan</h3>

              <div className="space-y-3 text-sm">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={employmentType === "FULL_TIME"}
                    onChange={() =>
                      setEmploymentType(
                        employmentType === "FULL_TIME" ? "" : "FULL_TIME",
                      )
                    }
                  />
                  Full Time
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={employmentType === "PART_TIME"}
                    onChange={() =>
                      setEmploymentType(
                        employmentType === "PART_TIME" ? "" : "PART_TIME",
                      )
                    }
                  />
                  Part Time
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={employmentType === "INTERNSHIP"}
                    onChange={() =>
                      setEmploymentType(
                        employmentType === "INTERNSHIP" ? "" : "INTERNSHIP",
                      )
                    }
                  />
                  Magang
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={employmentType === "CONTRACT"}
                    onChange={() =>
                      setEmploymentType(
                        employmentType === "CONTRACT" ? "" : "CONTRACT",
                      )
                    }
                  />
                  Kontrak
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={employmentType === "FREELANCE"}
                    onChange={() =>
                      setEmploymentType(
                        employmentType === "FREELANCE" ? "" : "FREELANCE",
                      )
                    }
                  />
                  Freelance
                </label>
              </div>
            </div>

            {/* MODE */}

            <div className="mt-6 border-t border-slate-100 pt-6">
              <h3 className="mb-3 font-semibold">Mode Kerja</h3>

              <div className="space-y-3 text-sm">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={workMode === "ONSITE"}
                    onChange={() =>
                      setWorkMode(workMode === "ONSITE" ? "" : "ONSITE")
                    }
                  />
                  Onsite
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={workMode === "HYBRID"}
                    onChange={() =>
                      setWorkMode(workMode === "HYBRID" ? "" : "HYBRID")
                    }
                  />
                  Hybrid
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={workMode === "REMOTE"}
                    onChange={() =>
                      setWorkMode(workMode === "REMOTE" ? "" : "REMOTE")
                    }
                  />
                  Remote
                </label>
              </div>
            </div>

            {/* EXPERIENCE */}

            <div className="mt-6 border-t border-slate-100 pt-6">
              <h3 className="mb-3 font-semibold">Experience Level</h3>

              <div className="space-y-3 text-sm">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={experienceLevel === "FRESH_GRADUATE"}
                    onChange={() =>
                      setExperienceLevel(
                        experienceLevel === "FRESH_GRADUATE"
                          ? ""
                          : "FRESH_GRADUATE",
                      )
                    }
                  />
                  Fresh Graduate
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={experienceLevel === "JUNIOR"}
                    onChange={() =>
                      setExperienceLevel(
                        experienceLevel === "JUNIOR" ? "" : "JUNIOR",
                      )
                    }
                  />
                  Junior
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={experienceLevel === "MID"}
                    onChange={() =>
                      setExperienceLevel(experienceLevel === "MID" ? "" : "MID")
                    }
                  />
                  Mid Level
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={experienceLevel === "SENIOR"}
                    onChange={() =>
                      setExperienceLevel(
                        experienceLevel === "SENIOR" ? "" : "SENIOR",
                      )
                    }
                  />
                  Senior
                </label>
              </div>
            </div>

            {/* GAJI */}

            <div className="mt-6 border-t border-slate-100 pt-6">
              <h3 className="mb-3 font-semibold">Rentang Gaji</h3>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className="
          rounded-xl
          border
          border-slate-200
          px-3
          py-2
        "
                />

                <input
                  type="number"
                  placeholder="Max"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  className="
          rounded-xl
          border
          border-slate-200
          px-3
          py-2
        "
                />
              </div>
            </div>

            {/* BUTTON */}

            <button
              onClick={() => {
                setKeyword("");
                setLocation("");

                setEmploymentType("");
                setWorkMode("");
                setExperienceLevel("");

                setIndustry("");

                setSalaryMin("");
                setSalaryMax("");

                setPage(1);
              }}
              className="
      mt-8
      w-full
      rounded-xl
      bg-slate-100
      py-3
      font-medium
      text-slate-700
      transition
      hover:bg-slate-200
    "
            >
              Reset Filter
            </button>
          </aside>

          {/* JOB LIST */}

          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{jobs.length} Lowongan</h2>
            </div>

            {loading && (
              <div
                className="
    grid
    gap-5
    md:grid-cols-2
  "
              >
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="
h-72
animate-pulse
rounded-3xl
bg-white
shadow-sm
"
                  />
                ))}
              </div>
            )}

            {!loading && jobs.length === 0 && (
              <div
                className="
                    rounded-3xl
                    bg-white
                    p-10
                    text-center
                    shadow-sm
                  "
              >
                <h3 className="text-xl font-bold">
                  Tidak ada lowongan ditemukan
                </h3>

                <p className="mt-2 text-slate-500">
                  Coba ubah filter pencarianmu.
                </p>
              </div>
            )}

            {!loading && jobs.length > 0 && (
              <div
                className="
      grid
      gap-5
      md:grid-cols-2
    "
              >
                {sortedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            {/* PAGINATION */}

            {!loading && totalPages > 1 && (
              <div className="mt-10 flex justify-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="
                      rounded-xl
                      border
                      px-4
                      py-2
                      disabled:opacity-50
                    "
                >
                  Prev
                </button>

                {Array.from({
                  length: totalPages,
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`
                          rounded-xl
                          px-4
                          py-2
                          ${
                            page === index + 1
                              ? "bg-blue-600 text-white"
                              : "border"
                          }
                        `}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
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
        </div>
      </div>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/6285194521595"
        target="_blank"
        rel="noopener noreferrer"
        className="
    fixed
    bottom-6
    right-6
    z-[99999]
    flex
    h-16
    w-16
    items-center
    justify-center
    rounded-full
    bg-green-500
    text-3xl
    shadow-2xl
  "
      >
        💬
      </a>
    </section>
  );
}
