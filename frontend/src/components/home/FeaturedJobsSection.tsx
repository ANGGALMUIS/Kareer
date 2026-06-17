"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import FadeUp from "./FadeUp";

import { getJobs } from "@/services/job.service";
import { Job } from "@/types/job";

export default function FeaturedJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getJobs({
        page: 1,
        limit: 6,
      });

      setJobs((data.jobs || []).slice(0, 6));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="mb-12 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Featured Jobs
            </p>

            <h2 className="mt-2 text-4xl font-bold text-slate-900">
              Lowongan Populer
            </h2>

            <p className="mt-3 text-slate-500">
              Temukan peluang karier terbaik dari perusahaan terpercaya.
            </p>
          </div>

          <Link
            href="/jobs"
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-5
              py-3
              font-medium
              transition
              hover:bg-slate-100
            "
          >
            Lihat Semua →
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="
                  h-[320px]
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
              border
              border-slate-200
              bg-white
              p-10
              text-center
            "
          >
            <h3 className="text-xl font-bold text-slate-900">
              Belum Ada Lowongan
            </h3>

            <p className="mt-2 text-slate-500">
              Lowongan akan muncul di sini ketika perusahaan mulai
              mempublikasikan pekerjaan.
            </p>
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.slice(0, 6).map((job, index) => (
              <FadeUp key={job.id} delay={index * 0.08}>
                <Link
                  href={`/jobs/${job.id}`}
                  className="
                    flex
                    h-[320px]
                    flex-col

                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-6

                    shadow-sm

                    transition-all
                    duration-300

                    hover:-translate-y-2
                    hover:border-blue-200
                    hover:shadow-xl
                  "
                >
                  {/* HEADER */}

                  <div className="flex items-start gap-4">
                    {job.company?.logoUrl ? (
                      <img
                        src={job.company.logoUrl}
                        alt={job.company.name}
                        className="
                          h-14
                          w-14
                          rounded-2xl
                          border
                          border-slate-200
                          bg-white
                          object-cover
                          shadow-sm
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          bg-gradient-to-br
                          from-blue-500
                          to-indigo-600
                          text-lg
                          font-bold
                          text-white
                        "
                      >
                        {job.company?.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
                        {job.title}
                      </h3>

                      <p className="mt-1 truncate text-sm text-slate-500">
                        {job.company?.name}
                      </p>
                    </div>
                  </div>

                  {/* TAG */}

                  <div className="mt-5">
                    {job.employmentType && (
                      <span
                        className="
                          rounded-full
                          bg-blue-50
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-blue-700
                        "
                      >
                        {job.employmentType.replaceAll("_", " ")}
                      </span>
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="mt-5 space-y-3 text-sm text-slate-600">
                    <p>📍 {job.location || "Indonesia"}</p>

                    <p>
                      💰 Rp {(job.salaryMin || 0).toLocaleString("id-ID")}
                      {" - "}
                      Rp {(job.salaryMax || 0).toLocaleString("id-ID")}
                    </p>

                    <p>🏢 {job.workMode || "ONSITE"}</p>
                  </div>

                  {/* FOOTER */}

                  <div className="mt-auto border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Lowongan Aktif
                      </span>

                      <span className="font-semibold text-blue-600">
                        Lihat Detail →
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
