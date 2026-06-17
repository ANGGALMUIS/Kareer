"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ProtectedRoute from "@/components/ProtectedRoute";

import {
  getCompanyApplications,
  updateApplicationStatus,
  exportCompanyApplications,
  notifyCvViewed,
  notifyAssessmentViewed,
} from "@/services/application.service";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import {
  createInterview,
  updateInterview,
  deleteInterview,
} from "@/services/interview.service";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useDebounce } from "use-debounce";

export default function CompanyApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const [exporting, setExporting] = useState(false);

  const [showInterviewModal, setShowInterviewModal] = useState(false);

  const [savingInterview, setSavingInterview] = useState(false);

  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const [isEditingInterview, setIsEditingInterview] = useState(false);

  const [interviewForm, setInterviewForm] = useState({
    date: "",
    time: "",
    type: "ONLINE",
    location: "",
    meetingLink: "",
    notes: "",
  });

  const fetchApplications = async (
    currentPage = page,
    keyword = search,
    status = statusFilter,
  ) => {
    setLoading(true);
    try {
      const response = await getCompanyApplications(
        currentPage,
        10,
        keyword,
        status,
      );

      setApplications(response.data || []);

      setPagination(
        response.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1,
        },
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(page, debouncedSearch, statusFilter);
  }, [page, debouncedSearch, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  const handleStatus = async (applicationId: string, status: string) => {
    try {
      await updateApplicationStatus(applicationId, status);

      fetchApplications();
    } catch (error) {
      console.error(error);

      toast.error("Gagal update status");
    }
  };

  const openInterviewModal = (application: any, edit = false) => {
    setSelectedApplication(application);

    setIsEditingInterview(edit);

    if (edit && application.interview) {
      const date = new Date(application.interview.scheduledAt);

      setInterviewForm({
        date: date.toISOString().split("T")[0],
        time: date.toTimeString().slice(0, 5),

        type: application.interview.meetingLink ? "ONLINE" : "OFFLINE",

        location: application.interview.location || "",

        meetingLink: application.interview.meetingLink || "",

        notes: application.interview.notes || "",
      });
    } else {
      setInterviewForm({
        date: "",
        time: "",
        type: "ONLINE",
        location: "",
        meetingLink: "",
        notes: "",
      });
    }

    setShowInterviewModal(true);
  };

  const handleSaveInterview = async () => {
    setSavingInterview(true);
    try {
      if (!interviewForm.date || !interviewForm.time) {
        toast.error("Tanggal dan jam wajib diisi");

        return;
      }

      const scheduledAt = new Date(
        `${interviewForm.date}T${interviewForm.time}`,
      ).toISOString();

      if (interviewForm.type === "ONLINE" && !interviewForm.meetingLink) {
        toast.error("Meeting link wajib diisi");

        return;
      }

      if (interviewForm.type === "OFFLINE" && !interviewForm.location) {
        toast.error("Lokasi interview wajib diisi");

        return;
      }

      if (isEditingInterview && selectedApplication?.interview) {
        await updateInterview(selectedApplication.interview.id, {
          scheduledAt,
          location: interviewForm.location,
          meetingLink: interviewForm.meetingLink,
          notes: interviewForm.notes,
        });

        toast.success("Interview berhasil diperbarui");
      } else {
        await createInterview({
          applicationId: selectedApplication.id,

          scheduledAt,

          location: interviewForm.location,

          meetingLink: interviewForm.meetingLink,

          notes: interviewForm.notes,
        });

        await updateApplicationStatus(selectedApplication.id, "INTERVIEW");

        toast.success("Interview berhasil dijadwalkan");
      }

      setShowInterviewModal(false);

      fetchApplications();
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setSavingInterview(false);
    }
  };

  const handleDeleteInterview = async (interviewId: string) => {
    try {
      await deleteInterview(interviewId);

      toast.success("Interview berhasil dibatalkan");

      fetchApplications();
    } catch (error) {
      console.error(error);

      toast.error("Gagal membatalkan interview");
    }
  };

  const handleViewCv = async (applicationId: string, cvUrl: string) => {
    try {
      await notifyCvViewed(applicationId);

      window.open(cvUrl, "_blank");
    } catch (error) {
      console.error(error);

      toast.error("Gagal mengirim notifikasi");

      window.open(cvUrl, "_blank");
    }
  };

  const handleViewAssessment = async (
    applicationId: string,
    fileUrl: string,
  ) => {
    try {
      await notifyAssessmentViewed(applicationId);

      window.open(fileUrl, "_blank");
    } catch (error) {
      console.error(error);

      toast.error("Gagal mengirim notifikasi");

      window.open(fileUrl, "_blank");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return "bg-slate-100 text-slate-700";

      case "REVIEW":
        return "bg-yellow-100 text-yellow-700";

      case "INTERVIEW":
        return "bg-blue-100 text-blue-700";

      case "ACCEPTED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const exportToExcel = async () => {
    setExporting(true);
    try {
      const response = await exportCompanyApplications();

      const applicants = response.data || [];

      const excelData = applicants.map((application: any) => ({
        Nama: application.user?.name || "-",

        Email: application.user?.email || "-",

        Posisi: application.jobListing?.title || "-",

        Status: application.status,

        Headline: application.user?.applicantProfile?.headline || "-",

        AppliedAt: new Date(application.appliedAt).toLocaleString("id-ID"),
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const file = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(file, `all-applicants-${Date.now()}.xlsx`);
    } catch (error) {
      console.error(error);

      toast.error("Gagal export data pelamar");
    } finally {
      setExporting(false);
    }
  };

  const sortedApplications = [...applications].sort((a, b) => {
    const order = {
      SUBMITTED: 1,
      REVIEW: 2,
      INTERVIEW: 3,
      ACCEPTED: 4,
      REJECTED: 5,
    };

    return (
      order[a.status as keyof typeof order] -
      order[b.status as keyof typeof order]
    );
  });

  return (
    <ProtectedRoute role="COMPANY">
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-1">
          <div
            className="
    relative
    overflow-hidden
    rounded-[32px]
    bg-gradient-to-r
    from-purple-600
    via-blue-600
    to-indigo-700
    p-10
    text-white
  "
          >
            <div
              className="
      absolute
      right-0
      top-0
      h-64
      w-64
      rounded-full
      bg-white/10
      blur-3xl
    "
            />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-purple-100">Recruitment Workspace</p>

                <h1 className="mt-2 text-5xl font-bold">👥 Pelamar</h1>

                <p className="mt-4 max-w-xl text-purple-100">
                  Kelola seluruh kandidat yang melamar, pantau proses seleksi,
                  dan jadwalkan interview.
                </p>
              </div>

              <button
                onClick={exportToExcel}
                disabled={exporting}
                className="
        rounded-2xl
        bg-white
        px-6
        py-3
        font-semibold
        text-indigo-700
      "
              >
                {exporting ? "Exporting..." : "Export Excel"}
              </button>
            </div>
          </div>

          <div className="-mt-1 grid gap-6 md:grid-cols-4 py-6">
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
              <p className="text-sm text-blue-600">Total Kandidat</p>

              <h2 className="mt-2 text-4xl font-bold">{pagination.total}</h2>
            </div>

            <div className="rounded-3xl border border-yellow-100 bg-yellow-50 p-6 shadow-sm">
              <p className="text-sm text-yellow-700">Review</p>

              <h2 className="mt-2 text-4xl font-bold">
                {applications.filter((a) => a.status === "REVIEW").length}
              </h2>
            </div>

            <div className="rounded-3xl border border-purple-100 bg-purple-50 p-6 shadow-sm">
              <p className="text-sm text-purple-700">Interview</p>

              <h2 className="mt-2 text-4xl font-bold">
                {applications.filter((a) => a.status === "INTERVIEW").length}
              </h2>
            </div>

            <div className="rounded-3xl border border-green-100 bg-green-50 p-6 shadow-sm">
              <p className="text-sm text-green-700">Accepted</p>

              <h2 className="mt-2 text-4xl font-bold">
                {applications.filter((a) => a.status === "ACCEPTED").length}
              </h2>
            </div>
          </div>

          <div
            className="
    rounded-[32px]
    border
    border-slate-100
    bg-white
    p-6
    mt-0
    shadow-sm
  "
          >
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="🔍 Cari kandidat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
        flex-1
        rounded-2xl
        border
        border-slate-200
        px-5
        py-3
        outline-none
        focus:border-blue-500
      "
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="
        rounded-2xl
        border
        border-slate-200
        px-5
        py-3
      "
              >
                <option value="ALL">Semua Status</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="REVIEW">Review</option>
                <option value="INTERVIEW">Interview</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Menampilkan {applications.length} kandidat
            </p>
          </div>

          {loading && (
            <div className="mt-8 space-y-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
          h-72
          animate-pulse
          rounded-3xl
          bg-white
        "
                />
              ))}
            </div>
          )}

          {!loading && (
            <div className="mt-8 space-y-5">
              {sortedApplications.map((application) => (
                <div
                  key={application.id}
                  className="
          rounded-3xl
          bg-white
          p-6
          shadow-sm
        "
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                    <div className="flex-1">
                      <Link
                        href={`/applicants/${application.user?.id}`}
                        className="
                text-xl
                font-bold
                text-blue-600
                hover:underline
              "
                      >
                        {application.user?.name || "Kandidat"}
                      </Link>

                      <p className="mt-1 text-slate-500">
                        {application.jobListing?.title}
                      </p>

                      {application.user?.applicantProfile?.headline && (
                        <p className="mt-2 text-sm text-slate-600">
                          {application.user.applicantProfile.headline}
                        </p>
                      )}

                      <div className="mt-4">
                        <span
                          className={`
                  rounded-full
                  px-3
                  py-1
                  text-sm
                  font-medium
                  ${getStatusColor(application.status)}
                `}
                        >
                          {application.status}
                        </span>
                      </div>

                      {application.coverLetter && (
                        <div className="mt-5">
                          <h3 className="font-medium">Cover Letter</h3>

                          <p className="mt-2 text-slate-600">
                            {application.coverLetter}
                          </p>
                        </div>
                      )}

                      {application.user?.applicantProfile?.cvUrl && (
                        <button
                          onClick={() =>
                            handleViewCv(
                              application.id,
                              application.user.applicantProfile.cvUrl,
                            )
                          }
                          className="
    mt-4
    inline-block
    text-blue-600
    hover:underline
  "
                        >
                          Lihat CV
                        </button>
                      )}

                      {application.assessmentAnswerUrl && (
                        <button
                          onClick={() =>
                            handleViewAssessment(
                              application.id,
                              application.assessmentAnswerUrl,
                            )
                          }
                          className="
    mt-2
    block
    text-purple-600
    hover:underline
  "
                        >
                          Download Assessment Answer
                        </button>
                      )}

                      {application.interview && (
                        <div
                          className="
                  mt-6
                  rounded-2xl
                  border
                  border-blue-200
                  bg-blue-50
                  p-5
                "
                        >
                          <h3
                            className="
                    font-semibold
                    text-blue-700
                  "
                          >
                            Interview Terjadwal
                          </h3>

                          <p className="mt-3 text-sm">
                            <strong>Jadwal:</strong>{" "}
                            {new Date(
                              application.interview.scheduledAt,
                            ).toLocaleString("id-ID")}
                          </p>

                          {application.interview.meetingLink ? (
                            <>
                              <p className="mt-2 text-sm">
                                <strong>Tipe:</strong> Online
                              </p>

                              <a
                                href={application.interview.meetingLink}
                                target="_blank"
                                rel="noreferrer"
                                className="
        mt-2
        block
        text-sm
        text-blue-600
        hover:underline
      "
                              >
                                Join Meeting
                              </a>
                            </>
                          ) : (
                            <>
                              <p className="mt-2 text-sm">
                                <strong>Tipe:</strong> Offline
                              </p>

                              <p className="mt-2 text-sm">
                                <strong>Lokasi:</strong>{" "}
                                {application.interview.location}
                              </p>
                            </>
                          )}

                          {application.interview.notes && (
                            <p className="mt-3 text-sm text-slate-600">
                              {application.interview.notes}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {application.status === "SUBMITTED" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatus(application.id, "REVIEW")
                            }
                            className="
          rounded-xl
          bg-yellow-500
          px-4
          py-2
          text-white
        "
                          >
                            Review Assessment
                          </button>

                          <button
                            onClick={() =>
                              handleStatus(application.id, "REJECTED")
                            }
                            className="
          rounded-xl
          bg-red-600
          px-4
          py-2
          text-white
        "
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {application.status === "REVIEW" && (
                        <div className="flex w-44 flex-col gap-2">
                          <button
                            onClick={() => openInterviewModal(application)}
                            className="
      w-full
      rounded-xl
      bg-blue-600
      py-2
      text-white
      transition
      hover:bg-blue-700
    "
                          >
                            Schedule Interview
                          </button>

                          <button
                            onClick={() =>
                              handleStatus(application.id, "REJECTED")
                            }
                            className="
      w-full
      rounded-xl
      bg-red-600
      py-2
      text-white
      transition
      hover:bg-red-700
    "
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {application.status === "INTERVIEW" &&
                        application.interview?.status === "SCHEDULED" && (
                          <button
                            onClick={() =>
                              openInterviewModal(application, true)
                            }
                            className="
        rounded-xl
        bg-blue-600
        px-4
        py-2
        text-white
      "
                          >
                            Edit Interview
                          </button>
                        )}

                      {application.status === "INTERVIEW" &&
                        application.interview?.status === "COMPLETED" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatus(application.id, "ACCEPTED")
                              }
                              className="
          rounded-xl
          bg-green-600
          px-4
          py-2
          text-white
        "
                            >
                              Accept
                            </button>

                            <button
                              onClick={() =>
                                handleStatus(application.id, "REJECTED")
                              }
                              className="
          rounded-xl
          bg-red-600
          px-4
          py-2
          text-white
        "
                            >
                              Reject
                            </button>
                          </>
                        )}

                      {application.status === "ACCEPTED" && (
                        <span
                          className="
        rounded-xl
        bg-green-100
        px-4
        py-2
        text-center
        font-medium
        text-green-700
      "
                        >
                          Kandidat Diterima
                        </span>
                      )}

                      {application.status === "INTERVIEW" &&
                        application.interview?.status === "CANCELLED" && (
                          <button
                            onClick={() =>
                              handleStatus(application.id, "REJECTED")
                            }
                            className="
        rounded-xl
        bg-red-600
        px-4
        py-2
        text-white
      "
                          >
                            Reject
                          </button>
                        )}

                      {application.status === "REJECTED" && (
                        <span
                          className="
        rounded-xl
        bg-red-100
        px-4
        py-2
        text-center
        font-medium
        text-red-700
      "
                        >
                          Kandidat Ditolak
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {applications.length === 0 && (
                <div
                  className="
          rounded-3xl
          bg-white
          p-10
          text-center
        "
                >
                  Belum ada pelamar.
                </div>
              )}
            </div>
          )}

          {pagination.totalPages > 1 && (
            <div
              className="
      mt-8
      flex
      items-center
      justify-center
      gap-3
    "
            >
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="
        rounded-xl
        border
        px-4
        py-2
        disabled:opacity-50
      "
              >
                Previous
              </button>

              <span className="font-medium">
                Page {pagination.page}
                {" / "}
                {pagination.totalPages}
              </span>

              <button
                disabled={page === pagination.totalPages}
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, pagination.totalPages))
                }
                className="
        rounded-xl
        border
        px-4
        py-2
        disabled:opacity-50
      "
              >
                Next
              </button>
            </div>
          )}

          {showInterviewModal && (
            <div
              className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/50
      backdrop-blur-sm
      p-4
    "
            >
              <div
                className="
        w-full
        max-w-xl
        rounded-3xl
        bg-white
        p-8
        shadow-2xl
      "
              >
                <h2 className="text-2xl font-bold text-slate-900">
                  {isEditingInterview
                    ? "Edit Interview"
                    : "Jadwalkan Interview"}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Tentukan jadwal interview kandidat.
                </p>

                <div className="mt-6 space-y-4">
                  <input
                    type="date"
                    value={interviewForm.date}
                    onChange={(e) =>
                      setInterviewForm({
                        ...interviewForm,
                        date: e.target.value,
                      })
                    }
                    className="
            w-full
            rounded-2xl
            border
            border-slate-200
            p-3
          "
                  />

                  <input
                    type="time"
                    value={interviewForm.time}
                    onChange={(e) =>
                      setInterviewForm({
                        ...interviewForm,
                        time: e.target.value,
                      })
                    }
                    className="
            w-full
            rounded-2xl
            border
            border-slate-200
            p-3
          "
                  />

                  <select
                    value={interviewForm.type}
                    onChange={(e) =>
                      setInterviewForm({
                        ...interviewForm,
                        type: e.target.value,
                      })
                    }
                    className="
            w-full
            rounded-2xl
            border
            border-slate-200
            p-3
          "
                  >
                    <option value="ONLINE">🌐 Online Interview</option>

                    <option value="OFFLINE">🏢 Offline Interview</option>
                  </select>

                  {interviewForm.type === "ONLINE" && (
                    <input
                      type="text"
                      placeholder="Meeting Link (Google Meet / Zoom)"
                      value={interviewForm.meetingLink}
                      onChange={(e) =>
                        setInterviewForm({
                          ...interviewForm,
                          meetingLink: e.target.value,
                        })
                      }
                      className="
              w-full
              rounded-2xl
              border
              border-slate-200
              p-3
            "
                    />
                  )}

                  {interviewForm.type === "OFFLINE" && (
                    <input
                      type="text"
                      placeholder="Lokasi Interview"
                      value={interviewForm.location}
                      onChange={(e) =>
                        setInterviewForm({
                          ...interviewForm,
                          location: e.target.value,
                        })
                      }
                      className="
              w-full
              rounded-2xl
              border
              border-slate-200
              p-3
            "
                    />
                  )}

                  <textarea
                    placeholder="Catatan Interview"
                    value={interviewForm.notes}
                    onChange={(e) =>
                      setInterviewForm({
                        ...interviewForm,
                        notes: e.target.value,
                      })
                    }
                    className="
            h-32
            w-full
            rounded-2xl
            border
            border-slate-200
            p-3
          "
                  />
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    onClick={() => setShowInterviewModal(false)}
                    className="
            rounded-2xl
            border
            border-slate-200
            px-5
            py-3
          "
                  >
                    Batal
                  </button>

                  <button
                    onClick={handleSaveInterview}
                    disabled={savingInterview}
                    className="
            rounded-2xl
            bg-blue-600
            px-5
            py-3
            font-medium
            text-white
            hover:bg-blue-700
            disabled:opacity-50
          "
                  >
                    {savingInterview
                      ? "Saving..."
                      : isEditingInterview
                        ? "Update Interview"
                        : "Simpan Interview"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}
