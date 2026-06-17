"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Building2, Globe, Search } from "lucide-react";

import { Company } from "@/types/job";
import { getCompanies } from "@/services/company.service";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredCompanies(companies);
      return;
    }

    const keyword = search.toLowerCase();

    setFilteredCompanies(
      companies.filter(
        (company) =>
          company.name.toLowerCase().includes(keyword) ||
          company.description?.toLowerCase().includes(keyword),
      ),
    );
  }, [search, companies]);

  const loadCompanies = async () => {
    try {
      const response = await getCompanies();

      setCompanies(response || []);
      setFilteredCompanies(response || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl  py-6">
        {/* HERO */}

        <div
          className="
            rounded-[32px]
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-cyan-500
            p-10
            text-white
            shadow-xl
          "
        >
          <p className="text-sm font-medium text-blue-100">Explore Companies</p>

          <h1 className="mt-3 text-5xl font-bold">
            Temukan Perusahaan Terbaik
          </h1>

          <p className="mt-4 max-w-2xl text-blue-100">
            Jelajahi perusahaan yang telah bergabung bersama Kareer dan temukan
            tempat terbaik untuk membangun kariermu.
          </p>

          <div className="mt-8 max-w-2xl">
            <div
              className="
      flex
      items-center
      gap-3

      rounded-2xl
      border
      border-slate-200

      bg-white

      px-5
      py-4

      shadow-lg
    "
            >
              <Search
                size={20}
                className="
        shrink-0
        text-slate-400
      "
              />

              <input
                type="text"
                placeholder="Cari perusahaan berdasarkan nama..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
        w-full

        bg-transparent

        text-slate-900
        placeholder:text-slate-400

        outline-none
        border-none
      "
              />
            </div>
          </div>
        </div>

        {/* STATS */}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-500">Total Perusahaan</p>

            <h3 className="mt-2 text-4xl font-bold text-slate-900">
              {companies.length}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-500">Perusahaan Tampil</p>

            <h3 className="mt-2 text-4xl font-bold text-blue-600">
              {filteredCompanies.length}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-500">Partner Kareer</p>

            <h3 className="mt-2 text-4xl font-bold text-green-600">
              {companies.length}
            </h3>
          </div>
        </div>

        {/* HEADER */}

        <div className="mt-12 mb-6">
          <h2 className="text-3xl font-bold text-slate-900">
            Daftar Perusahaan
          </h2>

          <p className="mt-2 text-slate-500">
            Perusahaan yang telah diverifikasi dan aktif membuka lowongan.
          </p>
        </div>

        {/* LOADING */}

        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="
                  h-[260px]
                  animate-pulse
                  rounded-3xl
                  bg-white
                "
              />
            ))}
          </div>
        )}

        {/* EMPTY */}

        {!loading && filteredCompanies.length === 0 && (
          <div
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-12
              text-center
            "
          >
            <h3 className="text-2xl font-bold text-slate-900">
              Perusahaan Tidak Ditemukan
            </h3>

            <p className="mt-3 text-slate-500">Coba gunakan kata kunci lain.</p>
          </div>
        )}

        {/* GRID */}

        {!loading && filteredCompanies.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => (
              <Link
                key={company.id}
                href={`/companies/${company.id}`}
                className="
      group
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-blue-200
      hover:shadow-xl
    "
              >
                <div className="flex gap-5">
                  {/* LOGO */}

                  <div
                    className="
          flex
          h-20
          w-20
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
        "
                  >
                    {company.logoUrl ? (
                      <img
                        src={company.logoUrl}
                        alt={company.name}
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <div
                        className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-gradient-to-br
              from-blue-500
              to-indigo-600
              text-xl
              font-bold
              text-white
            "
                      >
                        {company.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          className="
                text-xl
                font-bold
                text-slate-900
                transition
                group-hover:text-blue-600
              "
                        >
                          {company.name}
                        </h3>

                        <div
                          className="
                mt-2
                inline-flex
                items-center
                rounded-full
                bg-green-50
                px-3
                py-1
                text-xs
                font-medium
                text-green-700
              "
                        >
                          ✓ Terverifikasi
                        </div>
                      </div>
                    </div>

                    <p
                      className="
            mt-4
            line-clamp-3
            text-sm
            leading-relaxed
            text-slate-600
          "
                    >
                      {company.description ||
                        "Perusahaan telah bergabung bersama Kareer."}
                    </p>

                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      {company.website && (
                        <div className="flex items-center gap-2">
                          <Globe size={14} />
                          <span className="truncate">{company.website}</span>
                        </div>
                      )}

                      {company.address && (
                        <div className="flex items-center gap-2">
                          <Building2 size={14} />
                          <span className="truncate">{company.address}</span>
                        </div>
                      )}
                    </div>

                    <div
                      className="
            mt-5
            border-t
            border-slate-100
            pt-4
            text-right
          "
                    >
                      <span
                        className="
              font-semibold
              text-blue-600
            "
                      >
                        Lihat Detail →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
