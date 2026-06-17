import {
  Briefcase,
  MapPin,
  Wallet,
  Bookmark,
  BookmarkCheck,
  Send,
} from "lucide-react";

import { Job } from "@/types/job";

interface Props {
  job: Job;
  onSave?: () => void;
  onApply?: () => void;
  saving?: boolean;
  saved?: boolean;
}

const employmentTypeLabel = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  INTERNSHIP: "Magang",
  CONTRACT: "Kontrak",
  FREELANCE: "Freelance",
};

const workModeLabel = {
  ONSITE: "Onsite",
  HYBRID: "Hybrid",
  REMOTE: "Remote",
};

const experienceLabel = {
  FRESH_GRADUATE: "Fresh Graduate",
  JUNIOR: "Junior",
  MID_LEVEL: "Mid Level",
  SENIOR: "Senior",
};

export default function JobHeader({
  job,
  onSave,
  onApply,
  saving,
  saved,
}: Props) {
  return (
    <div className="border-b border-slate-200 pb-8">
      <div className="flex gap-6">
        {/* LOGO */}
        <div className="flex-shrink-0">
          {job.company?.logoUrl ? (
            <img
              src={job.company.logoUrl}
              alt={job.company.name}
              className="
              h-24
              w-24
              rounded-xl
              border
              border-slate-200
              bg-white
              object-contain
              p-2
            "
            />
          ) : (
            <div
              className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-xl
              bg-blue-600
              text-3xl
              font-bold
              text-white
            "
            >
              {job.company.name.charAt(0)}
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-slate-900">{job.title}</h1>

          <p className="mt-2 text-lg text-slate-600">{job.company.name}</p>

          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin size={15} />
              {job.location || "Indonesia"}
            </div>

            {job.salaryMin && job.salaryMax && (
              <div className="flex items-center gap-2">
                <Wallet size={15} />
                Rp {job.salaryMin.toLocaleString()}
                {" - "}
                Rp {job.salaryMax.toLocaleString()}
              </div>
            )}

            <div className="flex items-center gap-2">
              <Briefcase size={15} />
              Lowongan Aktif
            </div>
          </div>

          {/* BADGES */}
          <div className="mt-5 flex flex-wrap gap-2">
            {job.employmentType && (
              <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {employmentTypeLabel[job.employmentType]}
              </span>
            )}

            {job.workMode && (
              <span className="rounded-lg bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                {workModeLabel[job.workMode]}
              </span>
            )}

            {job.experienceLevel && (
              <span className="rounded-lg bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                {experienceLabel[job.experienceLevel]}
              </span>
            )}

            {job.industry && (
              <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {job.industry}
              </span>
            )}
          </div>

          <div className="mt-5">
            <p className="text-sm text-slate-500">
              Diposting {new Date(job.createdAt).toLocaleDateString("id-ID")}
            </p>
          </div>
          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-3 py-6">
            {job.assessmentFileUrl && (
              <a
                href={job.assessmentFileUrl}
                target="_blank"
                rel="noreferrer"
                className="
    inline-flex
    items-center
    justify-center
    rounded-xl
    px-5
    py-3
    text-sm
    font-semibold
    text-white
    bg-blue-600
    hover:bg-blue-700
    transition
  "
              >
                Download Assessment
              </a>
            )}

            <button
              onClick={onSave}
              disabled={saving || saved}
              className={`
    flex
    items-center
    gap-2
    rounded-xl
    px-5
    py-3
    text-sm
    font-semibold
    transition-all

    ${
      saved
        ? "bg-blue-600 text-white"
        : "border border-slate-300 bg-white hover:bg-slate-50"
    }
  `}
            >
              {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}

              {saved ? "Tersimpan" : "Simpan Lowongan"}
            </button>

            <button
              onClick={onApply}
              className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-700
            "
            >
              <Send size={16} />
              Lamar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
