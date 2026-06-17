"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import FadeUp from "./FadeUp";
import Container from "@/components/ui/Container";

import { getCompanies } from "@/services/company.service";

export default function FeaturedCompaniesSection() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();

      setCompanies((data || []).slice(0, 4));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Featured Companies
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Perusahaan Terbaik
          </h2>

          <p className="mt-3 text-slate-500">
            Perusahaan terpercaya yang aktif membuka lowongan di Kareer.
          </p>
        </div>

        {loading && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  h-[240px]
                  animate-pulse
                  rounded-3xl
                  bg-white
                "
              />
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {companies.map((company, index) => (
              <FadeUp key={company.id} delay={index * 0.08}>
                <Link
                  href={`/companies/${company.id}`}
                  className="
                    group
                    flex
                    flex-col
                    items-center

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
                  {/* LOGO */}

                  <div
                    className="
                      flex
                      h-20
                      w-20
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
                        className="
                          h-full
                          w-full
                          object-contain
                          p-2
                        "
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

                          text-2xl
                          font-bold
                          text-white
                        "
                      >
                        {company.name?.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* COMPANY */}

                  <h3
                    className="
                      mt-5
                      line-clamp-1
                      text-center
                      text-lg
                      font-bold
                      text-slate-900

                      transition
                      group-hover:text-blue-600
                    "
                  >
                    {company.name}
                  </h3>

                  <p
                    className="
                      mt-2
                      line-clamp-1
                      text-sm
                      text-slate-500
                    "
                  >
                    {company.industry || "Perusahaan"}
                  </p>

                  {/* JOB COUNT */}

                  <div
                    className="
                      mt-4

                      rounded-full
                      bg-blue-50

                      px-4
                      py-2

                      text-sm
                      font-medium
                      text-blue-600
                    "
                  >
                    {company._count?.jobs || 0} Lowongan Aktif
                  </div>

                  <div
                    className="
                      mt-5
                      text-sm
                      font-semibold
                      text-blue-600
                    "
                  >
                    Lihat Profil →
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
