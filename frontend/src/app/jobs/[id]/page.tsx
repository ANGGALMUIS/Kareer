"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Swal from "sweetalert2";

import { Job } from "@/types/job";

import { getJobById } from "@/services/job.service";

import { saveJob } from "@/services/saved-job.service";

import { applyJob } from "@/services/application.service";

import ApplyJobModal from "@/components/jobs/ApplyJobModal";

import JobHeader from "@/components/jobs/JobHeader";

import JobDetailSkeleton from "@/components/jobs/JobDetailSkeleton";
import { toast } from "sonner";

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

export default function JobDetailPage() {
  const params = useParams();

  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);

  const [loading, setLoading] = useState(true);

  const [applyOpen, setApplyOpen] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem("token");

      setIsLoggedIn(!!token);

      const user = localStorage.getItem("user");

      if (user) {
        const parsedUser = JSON.parse(user);

        setUserRole(parsedUser.role);
      }
      try {
        const response = await getJobById(params.id as string);

        setJob(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  const handleSaveJob = async () => {
    if (!job) return;

    try {
      setSaving(true);

      await saveJob(job.id);

      setSaved(true);
    } catch (error: any) {
      const message = error?.response?.data?.message || "";

      if (
        message.includes("Unique constraint") ||
        message.includes("sudah disimpan")
      ) {
        setSaved(true);
        return;
      }

      toast.error(message || "Gagal menyimpan lowongan");
    } finally {
      setSaving(false);
    }
  };

  const handleApply = async (
    coverLetter: string,
    assessmentAnswer: File | null,
  ) => {
    if (!job) return;

    try {
      const formData = new FormData();

      formData.append("jobListingId", job.id);
      formData.append("coverLetter", coverLetter);

      if (assessmentAnswer) {
        formData.append("assessmentAnswer", assessmentAnswer);
      }

      await applyJob(formData);

      await Swal.fire({
        icon: "success",
        title: "Lamaran Berhasil",
        text: "Lamaran kamu berhasil dikirim ke perusahaan.",
        confirmButtonText: "Lihat Lamaran",
        confirmButtonColor: "#2563eb",
      });

      router.push("/applications");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Gagal melamar pekerjaan";

      if (message.includes("70%") || message.includes("Lengkapi profil")) {
        await Swal.fire({
          icon: "warning",
          title: "Profil Belum Lengkap",
          text: message,
          confirmButtonText: "Lengkapi Profil",
          confirmButtonColor: "#2563eb",
        });

        router.push("/dashboard/applicant/profile");
        return;
      }

      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text: message,
        confirmButtonColor: "#dc2626",
      });
    }
  };

  if (loading) {
    return <JobDetailSkeleton />;
  }

  if (!job) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl border bg-white p-10 text-center">
          Lowongan tidak ditemukan
        </div>
      </section>
    );
  }

  return (
    <>
      <ApplyJobModal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        jobTitle={job.title}
        onSubmit={handleApply}
      />

      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="rounded-2xl bg-white p-10">
            <JobHeader
              job={job}
              saving={saving}
              saved={saved}
              onSave={handleSaveJob}
              onApply={() => {
                if (!isLoggedIn) {
                  router.push("/login");
                  return;
                }

                if (userRole !== "APPLICANT") {
                  toast.error("Hanya applicant yang dapat melamar.");
                  return;
                }

                setApplyOpen(true);
              }}
            />

            {/* Persyaratan */}
            <section className="border-b border-slate-200 py-8">
              <h2 className="mb-5 text-2xl font-bold text-slate-900">
                Persyaratan
              </h2>

              <div className="flex flex-wrap gap-3">
                {job.workMode && (
                  <span className="rounded-md bg-slate-100 px-3 py-1 text-sm">
                    {workModeLabel[job.workMode]}
                  </span>
                )}

                {job.experienceLevel && (
                  <span className="rounded-md bg-slate-100 px-3 py-1 text-sm">
                    {experienceLevelLabel[job.experienceLevel]}
                  </span>
                )}

                {job.employmentType && (
                  <span className="rounded-md bg-slate-100 px-3 py-1 text-sm">
                    {employmentTypeLabel[job.employmentType]}
                  </span>
                )}

                {job.industry && (
                  <span className="rounded-md bg-slate-100 px-3 py-1 text-sm">
                    {job.industry}
                  </span>
                )}
              </div>
            </section>

            {/* Skills */}
            {(job.skills ?? []).length > 0 && (
              <section className="border-b border-slate-200 py-8">
                <h2 className="mb-5 text-2xl font-bold text-slate-900">
                  Skills
                </h2>

                <div className="flex flex-wrap gap-3">
                  {(job.skills ?? []).map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-blue-50 px-3 py-1 text-sm text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Benefits */}
            {(job.benefits ?? []).length > 0 && (
              <section className="border-b border-slate-200 py-8">
                <h2 className="mb-5 text-2xl font-bold text-slate-900">
                  Benefit Kerja
                </h2>

                <div className="flex flex-wrap gap-3">
                  {(job.benefits ?? []).map((benefit, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-green-50 px-3 py-1 text-sm text-green-700"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Deskripsi */}
            <section className="border-b border-slate-200 py-8">
              <h2 className="mb-5 text-2xl font-bold text-slate-900">
                Deskripsi Pekerjaan
              </h2>

              <div className="max-w-none whitespace-pre-wrap leading-8 text-slate-700">
                {job.description}
              </div>
            </section>

            {/* Kualifikasi */}
            <section className="border-b border-slate-200 py-8">
              <h2 className="mb-5 text-2xl font-bold text-slate-900">
                Kualifikasi & Persyaratan
              </h2>

              <div className="max-w-none whitespace-pre-wrap leading-8 text-slate-700">
                {job.requirements}
              </div>
            </section>

            {/* Tentang Perusahaan */}
            <section className="py-8">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Tentang Perusahaan
              </h2>

              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="flex-shrink-0">
                  {job.company?.logoUrl ? (
                    <img
                      src={job.company.logoUrl}
                      alt={job.company.name}
                      className="
            h-14
            w-14
            rounded-lg
            border
            border-slate-200
            bg-white
            object-contain
            p-1
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
            rounded-lg
            bg-blue-600
            text-lg
            font-bold
            text-white
          "
                    >
                      {job.company?.name?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Company Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {job.company?.name}
                  </h3>

                  {job.company?.website && (
                    <a
                      href={job.company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block text-sm text-blue-600 hover:underline"
                    >
                      {job.company.website}
                    </a>
                  )}

                  {job.company?.description && (
                    <p className="mt-4 max-w-4xl leading-8 text-slate-700">
                      {job.company.description}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
