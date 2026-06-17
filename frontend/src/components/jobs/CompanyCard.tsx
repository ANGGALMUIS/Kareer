import Link from "next/link";

import { Building2, Globe, MapPin } from "lucide-react";

import { Company } from "@/types/job";

interface Props {
  company: Company;
}

export default function CompanyCard({ company }: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        bg-white
        p-8
        shadow-sm
      "
    >
      <h2 className="text-2xl font-bold">Tentang Perusahaan</h2>

      <div className="mt-6 flex items-start gap-5">
        {company.logoUrl && (
          <img
            src={company.logoUrl}
            alt={company.name}
            className="
              h-20
              w-20
              rounded-2xl
              border
              object-cover
            "
          />
        )}

        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <Building2 size={18} />

            <Link
              href={`/companies/${company.id}`}
              className="
                font-semibold
                text-blue-600
                transition
                hover:underline
              "
            >
              {company.name}
            </Link>
          </div>

          {company.address && (
            <div className="flex items-center gap-3">
              <MapPin size={18} />

              <span>{company.address}</span>
            </div>
          )}

          {company.website && (
            <div className="flex items-center gap-3">
              <Globe size={18} />

              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="
                  text-blue-600
                  hover:underline
                "
              >
                {company.website}
              </a>
            </div>
          )}
        </div>
      </div>

      {company.description && (
        <p
          className="
            mt-6
            leading-relaxed
            text-slate-600
          "
        >
          {company.description}
        </p>
      )}

      <div className="mt-6">
        <Link
          href={`/companies/${company.id}`}
          className="
            inline-flex
            items-center
            rounded-xl
            bg-blue-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:bg-blue-700
          "
        >
          Lihat Profil Perusahaan
        </Link>
      </div>
    </div>
  );
}
