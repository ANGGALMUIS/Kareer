import Link from "next/link";
import { motion } from "framer-motion";

import { Job } from "@/types/job";

interface Props {
  job: Job;
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

export default function JobCard({ job }: Props) {
  const companyInitial = job.company?.name?.charAt(0)?.toUpperCase() || "K";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <Link
        href={`/jobs/${job.id}`}
        className="
        group
        block
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        transition-all
        duration-300
        hover:border-blue-300
        hover:shadow-lg
        overflow-hidden
      "
      >
        {/* HEADER */}

        <div className="flex items-start gap-3">
          <div
            className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-blue-500
            to-cyan-400
            font-semibold
            text-white
          "
          >
            {companyInitial}
          </div>

          <div className="min-w-0 flex-1">
            <div
              className="
    flex
    flex-col
    gap-2
    sm:flex-row
    sm:items-start
    sm:justify-between
  "
            >
              <div className="min-w-0">
                <h2
                  className="
                  line-clamp-2
    break-words
                  text-lg
                  font-bold
                  text-slate-900
                  transition
                  group-hover:text-blue-600
                "
                >
                  {job.title}
                </h2>

                <p className="truncate text-sm text-slate-500">
                  {job.company.name}
                </p>
              </div>

              <div className="sm:text-right">
                {job.salaryMin && job.salaryMax ? (
                  <div className="text-sm font-semibold text-green-600">
                    Rp {(job.salaryMin / 1000000).toFixed(1)}jt -
                    {(job.salaryMax / 1000000).toFixed(1)}jt
                  </div>
                ) : (
                  <div className="text-xs text-slate-400">
                    Gaji Tidak Ditampilkan
                  </div>
                )}
              </div>
            </div>

            {/* TAGS */}

            <div className="mt-3 flex flex-wrap gap-2">
              {job.employmentType && (
                <span
                  className="
                  rounded-md
                  bg-orange-100
                  px-2
                  py-1
                  text-xs
                  text-orange-700
                "
                >
                  {employmentTypeLabel[job.employmentType]}
                </span>
              )}

              {job.workMode && (
                <span
                  className="
                  rounded-md
                  bg-purple-100
                  px-2
                  py-1
                  text-xs
                  text-purple-700
                "
                >
                  {workModeLabel[job.workMode]}
                </span>
              )}

              {job.experienceLevel && (
                <span
                  className="
                  rounded-md
                  bg-blue-100
                  px-2
                  py-1
                  text-xs
                  text-blue-700
                "
                >
                  {experienceLabel[job.experienceLevel]}
                </span>
              )}
            </div>

            {/* INFO */}

            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div>📍 {job.location || "Indonesia"}</div>

              {job.industry && <div>🏢 {job.industry}</div>}
            </div>

            {/* FOOTER */}

            <div
              className="
              mt-4
              border-t
              border-slate-100
              pt-3
              text-sm
              text-slate-500
            "
            >
              Diposting {new Date(job.createdAt).toLocaleDateString("id-ID")}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
