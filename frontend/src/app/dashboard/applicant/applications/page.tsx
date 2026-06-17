"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

import { getMyApplications } from "@/services/application.service";

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyApplications();

        setApplications(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getSteps = (status: string) => {
    const steps = ["APPLIED", "REVIEW", "INTERVIEW", "ACCEPTED"];

    const currentIndex = steps.indexOf(status);

    return {
      steps,
      currentIndex,
    };
  };

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-7">
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

          <h1 className="mt-2 text-4xl font-bold">Lamaran Saya</h1>

          <p className="mt-3 text-blue-100">
            Pantau progres seluruh proses rekrutmen Anda.
          </p>
        </div>

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                h-40
                animate-pulse
                rounded-3xl
                bg-white
              "
              />
            ))}
          </div>
        )}

        {!loading && (
          <div className="space-y-6">
            {applications.map((application) => {
              const { steps, currentIndex } = getSteps(application.status);

              const statusColor =
                application.status === "REJECTED"
                  ? "bg-red-100 text-red-700"
                  : application.status === "ACCEPTED"
                    ? "bg-green-100 text-green-700"
                    : application.status === "INTERVIEW"
                      ? "bg-purple-100 text-purple-700"
                      : application.status === "REVIEW"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700";

              return (
                <div
                  key={application.id}
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
                  {/* HEADER */}

                  <div className="mb-8 flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {application.jobListing?.title}
                      </h2>

                      <p className="mt-1 text-slate-500">
                        {application.jobListing?.company?.name || "Perusahaan"}
                      </p>

                      <p className="mt-3 text-sm text-slate-400">
                        Dilamar pada{" "}
                        {new Date(application.appliedAt).toLocaleDateString(
                          "id-ID",
                        )}
                      </p>
                    </div>

                    <span
                      className={`
                      rounded-full
                      px-4
                      py-2
                      text-sm
                      font-medium
                      ${statusColor}
                    `}
                    >
                      {application.status}
                    </span>
                  </div>

                  {/* TRACKER */}

                  {application.status !== "REJECTED" && (
                    <div className="relative">
                      <div
                        className="
                        absolute
                        left-0
                        right-0
                        top-5
                        h-1
                        bg-slate-200
                      "
                      />

                      <div
                        className="
                        relative
                        flex
                        items-center
                        justify-between
                      "
                      >
                        {steps.map((step, index) => {
                          const label =
                            step === "APPLIED"
                              ? "Applied"
                              : step === "REVIEW"
                                ? "Review"
                                : step === "INTERVIEW"
                                  ? "Interview"
                                  : "Accepted";

                          return (
                            <div
                              key={step}
                              className="
                                flex
                                flex-col
                                items-center
                              "
                            >
                              <div
                                className={`
                                  flex
                                  h-12
                                  w-12
                                  items-center
                                  justify-center
                                  rounded-full
                                  text-sm
                                  font-bold
                                  transition-all
                                  duration-300
                                  ${
                                    index <= currentIndex
                                      ? "bg-blue-600 text-white shadow-lg"
                                      : "bg-slate-200 text-slate-500"
                                  }
                                `}
                              >
                                {index <= currentIndex ? "✓" : index + 1}
                              </div>

                              <span
                                className="
                                  mt-3
                                  text-xs
                                  font-medium
                                  text-slate-500
                                "
                              >
                                {label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {application.status === "REJECTED" && (
                    <div
                      className="
                      rounded-2xl
                      border
                      border-red-200
                      bg-red-50
                      p-4
                      text-red-700
                    "
                    >
                      ❌ Lamaran tidak dilanjutkan oleh perusahaan.
                    </div>
                  )}
                </div>
              );
            })}

            {applications.length === 0 && (
              <div
                className="
                rounded-3xl
                bg-white
                p-12
                text-center
                shadow-sm
              "
              >
                <div className="text-6xl">📄</div>

                <h2 className="mt-4 text-xl font-bold">Belum Ada Lamaran</h2>

                <p className="mt-2 text-slate-500">
                  Mulailah melamar pekerjaan untuk melihat progres rekrutmen
                  Anda.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
