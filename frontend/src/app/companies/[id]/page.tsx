"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { Globe, MapPin } from "lucide-react";

import { getPublicCompany } from "@/services/company.service";

export default function CompanyProfilePage() {
  const params = useParams();

  const [company, setCompany] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await getPublicCompany(params.id as string);

        setCompany(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [params.id]);

  if (loading) {
    return <div className="mx-auto max-w-7xl px-6 py-20">Loading...</div>;
  }

  if (!company) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20">
        Perusahaan tidak ditemukan.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl py-8">
        {/* HERO */}

        <div
          className="
          rounded-[36px]
          bg-gradient-to-r
          from-blue-600
          via-indigo-600
          to-cyan-500

          p-10
          text-white
          shadow-xl
        "
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div
              className="
              flex
              h-28
              w-28
              items-center
              justify-center
              overflow-hidden

              rounded-3xl
              bg-white
              p-3
              shadow-lg
            "
            >
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-4xl font-bold text-blue-600">
                  {company.name.charAt(0)}
                </span>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-5xl font-bold">{company.name}</h1>

              <p className="mt-2 text-blue-100">
                {company.industry || "Perusahaan"}
              </p>

              <div
                className="
                mt-3
                inline-flex
                items-center
                rounded-full
                bg-white/20
                px-4
                py-2
                text-sm
              "
              >
                ✓ Perusahaan Terverifikasi
              </div>

              <div className="mt-6 flex flex-wrap gap-6 text-sm">
                {company.address && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {company.address}
                  </div>
                )}

                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Globe size={16} />
                    Website Resmi
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-500">Lowongan Aktif</p>

            <h3 className="mt-2 text-4xl font-bold text-blue-600">
              {company.jobs?.length || 0}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-500">Industri</p>

            <h3 className="mt-2 text-lg font-bold text-slate-900">
              {company.industry || "-"}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-500">Website</p>

            <h3 className="mt-2 truncate text-lg font-bold text-slate-900">
              {company.website || "-"}
            </h3>
          </div>
        </div>

        {/* ABOUT */}

        <div
          className="
          mt-8
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
        "
        >
          <h2 className="text-2xl font-bold text-slate-900">
            Tentang Perusahaan
          </h2>

          <p className="mt-5 whitespace-pre-wrap leading-relaxed text-slate-600">
            {company.description || "Belum ada deskripsi perusahaan."}
          </p>
        </div>

        {/* JOBS */}

        <div
          className="
          mt-8
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
        "
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              Lowongan Aktif
            </h2>

            <span className="text-slate-500">
              {company.jobs?.length || 0} Lowongan
            </span>
          </div>

          {company.jobs?.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {company.jobs.map((job: any) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="
                  rounded-2xl
                  border
                  border-slate-200
                  p-5

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:shadow-lg
                "
                >
                  <h3 className="text-lg font-bold text-slate-900">
                    {job.title}
                  </h3>

                  <p className="mt-2 text-slate-500">{job.location}</p>

                  <div className="mt-4 text-blue-600 font-semibold">
                    Lihat Lowongan →
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div
              className="
              rounded-2xl
              border
              border-dashed
              border-slate-200
              p-10
              text-center
              text-slate-500
            "
            >
              Tidak ada lowongan aktif.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
