"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

import {
  getAllCompanyRequests,
  approveCompanyRequest,
  rejectCompanyRequest,
} from "@/services/company-request.service";

export default function AdminCompanyRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const response = await getAllCompanyRequests();

      setRequests(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await approveCompanyRequest(id);

      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt("Alasan penolakan") || "";

    if (!reason) return;

    try {
      await rejectCompanyRequest(id, reason);

      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="space-y-8">
      {/* HERO */}
      <div
        className="
        relative
        overflow-hidden
        rounded-[32px]
        bg-gradient-to-r
        from-indigo-600
        via-blue-600
        to-cyan-500
        p-10
        text-white
        shadow-xl
      "
      >
        <div className="relative z-10">
          <p className="text-sm text-white/80">Admin Workspace</p>

          <h1 className="mt-2 text-5xl font-bold">Company Requests</h1>

          <p className="mt-4 max-w-2xl text-white/90">
            Kelola pengajuan perusahaan yang ingin bergabung sebagai recruiter
            di Kareer.
          </p>
        </div>

        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10" />
        <div className="absolute bottom-0 right-20 h-32 w-32 rounded-full bg-white/10" />
      </div>

      {/* SUMMARY */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Request</p>

          <h2 className="mt-3 text-5xl font-bold text-blue-600">
            {requests.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Pending</p>

          <h2 className="mt-3 text-5xl font-bold text-amber-500">
            {requests.filter((r) => r.status === "PENDING").length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Approved</p>

          <h2 className="mt-3 text-5xl font-bold text-green-600">
            {requests.filter((r) => r.status === "APPROVED").length}
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          Loading...
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-3xl bg-white p-16 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-slate-700">
            Belum Ada Pengajuan
          </h3>

          <p className="mt-2 text-slate-500">
            Saat ini belum ada perusahaan yang mengajukan verifikasi.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {requests.map((request) => (
            <div
              key={request.id}
              className="
              rounded-3xl
              bg-white
              p-8
              shadow-sm
              transition-all
              hover:shadow-md
            "
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                {/* LEFT */}
                <div className="flex-1">
                  <div className="mb-4 flex items-center gap-3">
                    <h2 className="text-3xl font-bold text-slate-900">
                      {request.companyName}
                    </h2>

                    <span
                      className={`rounded-full px-4 py-1 text-xs font-semibold ${
                        request.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : request.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>

                  {request.industry && (
                    <p className="text-slate-500">{request.industry}</p>
                  )}

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase text-slate-400">
                        Website
                      </p>

                      <p className="mt-1 font-medium">
                        {request.website || "-"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase text-slate-400">
                        Address
                      </p>

                      <p className="mt-1 font-medium">
                        {request.address || "-"}
                      </p>
                    </div>
                  </div>

                  {request.description && (
                    <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                      <p className="leading-relaxed text-slate-700">
                        {request.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* RIGHT */}
                <div className="flex min-w-[220px] flex-col gap-3">
                  {request.proposalUrl && (
                    <a
                      href={request.proposalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="
                      rounded-2xl
                      border
                      border-slate-200
                      px-5
                      py-3
                      text-center
                      font-medium
                      transition
                      hover:bg-slate-50
                    "
                    >
                      📄 Lihat Proposal
                    </a>
                  )}

                  {request.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="
                        rounded-2xl
                        bg-green-600
                        px-5
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-green-700
                      "
                      >
                        ✓ Approve
                      </button>

                      <button
                        onClick={() => handleReject(request.id)}
                        className="
                        rounded-2xl
                        bg-red-600
                        px-5
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-red-700
                      "
                      >
                        ✕ Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
