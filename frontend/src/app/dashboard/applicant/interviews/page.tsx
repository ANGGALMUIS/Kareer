"use client";

import { useEffect, useState } from "react";


import {
  Calendar,
  MapPin,
  Link as LinkIcon,
  Building2,
  Briefcase,
} from "lucide-react";

import { getMyInterviews } from "@/services/interview.service";

export default function ApplicantInterviewsPage() {
  const [interviews, setInterviews] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchInterviews = async () => {
    try {
      const response = await getMyInterviews();

      setInterviews(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-100 text-blue-700";

      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
  <section className="min-h-screen bg-slate-50">
    <div className="mx-auto max-w-6xl px-6 pt-2 pb-10">
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
        <p className="text-blue-100">
          Applicant Workspace
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Interview Center
        </h1>

        <p className="mt-3 text-blue-100">
          Kelola seluruh jadwal interview dan
          pantau proses rekrutmenmu.
        </p>
      </div>

      {/* STATS */}

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div
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
          <p className="text-sm text-slate-500">
            Total Interview
          </p>

          <h2 className="mt-3 text-4xl font-bold text-blue-600">
            {interviews.length}
          </h2>
        </div>

        <div
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
          <p className="text-sm text-slate-500">
            Scheduled
          </p>

          <h2 className="mt-3 text-4xl font-bold text-indigo-600">
            {
              interviews.filter(
                (i) =>
                  i.status ===
                  "SCHEDULED",
              ).length
            }
          </h2>
        </div>

        <div
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
          <p className="text-sm text-slate-500">
            Completed
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-600">
            {
              interviews.filter(
                (i) =>
                  i.status ===
                  "COMPLETED",
              ).length
            }
          </h2>
        </div>
      </div>

      {/* CONTENT */}

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                h-48
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
          {interviews.map(
            (interview) => (
              <div
                key={interview.id}
                className="
                  rounded-3xl
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Briefcase
                        size={22}
                        className="text-blue-600"
                      />

                      <h2 className="text-2xl font-bold">
                        {
                          interview
                            .application
                            ?.jobListing
                            ?.title
                        }
                      </h2>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-slate-600">
                      <Building2
                        size={18}
                      />

                      <span>
                        {
                          interview
                            .application
                            ?.jobListing
                            ?.company
                            ?.name
                        }
                      </span>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <Calendar
                          size={18}
                          className="mt-1 text-blue-600"
                        />

                        <div>
                          <p className="font-semibold">
                            Jadwal Interview
                          </p>

                          <p className="text-slate-600">
                            {new Date(
                              interview.scheduledAt,
                            ).toLocaleString(
                              "id-ID",
                              {
                                dateStyle:
                                  "full",
                                timeStyle:
                                  "short",
                              },
                            )}
                          </p>
                        </div>
                      </div>

                      {interview.location && (
                        <div className="flex items-start gap-3">
                          <MapPin
                            size={18}
                            className="mt-1 text-green-600"
                          />

                          <div>
                            <p className="font-semibold">
                              Lokasi
                            </p>

                            <p className="text-slate-600">
                              {
                                interview.location
                              }
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {interview.notes && (
                      <div
                        className="
                          mt-6
                          rounded-2xl
                          bg-slate-50
                          p-4
                        "
                      >
                        <h3 className="font-semibold">
                          Catatan Recruiter
                        </h3>

                        <p className="mt-2 whitespace-pre-wrap text-slate-600">
                          {
                            interview.notes
                          }
                        </p>
                      </div>
                    )}

                    {interview.meetingLink && (
                      <a
                        href={
                          interview.meetingLink
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="
                          mt-6
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          bg-blue-600
                          px-5
                          py-3
                          font-medium
                          text-white
                          transition-all
                          duration-300
                          hover:scale-105
                          hover:bg-blue-700
                        "
                      >
                        <LinkIcon
                          size={18}
                        />
                        🚀 Join Meeting
                      </a>
                    )}
                  </div>

                  <div>
                    <span
                      className={`
                        rounded-full
                        px-5
                        py-2
                        text-sm
                        font-bold
                        ${getStatusColor(
                          interview.status,
                        )}
                      `}
                    >
                      {
                        interview.status
                      }
                    </span>
                  </div>
                </div>
              </div>
            ),
          )}

          {interviews.length === 0 && (
            <div
              className="
                rounded-3xl
                bg-white
                p-12
                text-center
                shadow-sm
              "
            >
              <div className="text-6xl">
                📅
              </div>

              <h2 className="mt-4 text-2xl font-bold">
                Belum Ada Interview
              </h2>

              <p className="mt-3 text-slate-500">
                Ketika recruiter menjadwalkan
                interview, informasinya akan
                muncul di sini.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  </section>
);
}
