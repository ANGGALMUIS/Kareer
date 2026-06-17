"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

import {
  getAllPayments,
  approvePayment,
  rejectPayment,
} from "@/services/payment.service";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const response = await getAllPayments();

      setPayments(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleApprove = async (paymentId: string) => {
    try {
      await approvePayment(paymentId);

      fetchPayments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (paymentId: string) => {
    const reason = prompt("Alasan penolakan") || "";

    if (!reason) return;

    try {
      await rejectPayment(paymentId, reason);

      fetchPayments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="space-y-8">
      {/* HERO */}
      <div className="rounded-[32px] bg-green-600 p-10 text-white shadow-xl">
        <p className="text-sm text-white/80">Admin Workspace</p>

        <h1 className="mt-2 text-5xl font-bold">Payment Approval</h1>

        <p className="mt-4 max-w-2xl text-white/90">
          Kelola pembayaran recruiter premium.
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Payment</p>

          <h2 className="mt-3 text-5xl font-bold text-blue-600">
            {payments.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Pending</p>

          <h2 className="mt-3 text-5xl font-bold text-amber-500">
            {payments.filter((item) => item.status === "PENDING").length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Approved</p>

          <h2 className="mt-3 text-5xl font-bold text-green-600">
            {payments.filter((item) => item.status === "APPROVED").length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Revenue</p>

          <h2 className="mt-3 text-3xl font-bold text-purple-600">
            Rp{" "}
            {payments
              .filter((item) => item.status === "APPROVED")
              .reduce((total, item) => total + item.amount, 0)
              .toLocaleString()}
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
          Loading...
        </div>
      ) : payments.length === 0 ? (
        <div className="rounded-3xl bg-white p-16 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-slate-700">
            Belum Ada Pembayaran
          </h3>

          <p className="mt-2 text-slate-500">
            Saat ini belum ada pembayaran masuk.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {payments.map((payment) => (
            <div
              key={payment.id}
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
                      {payment.company?.name}
                    </h2>

                    <span
                      className={`rounded-full px-4 py-1 text-xs font-semibold ${
                        payment.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : payment.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase text-slate-400">Paket</p>

                      <p className="mt-1 font-semibold text-blue-600">
                        {payment.plan}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase text-slate-400">
                        Nominal
                      </p>

                      <p className="mt-1 font-semibold text-green-600">
                        Rp {payment.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex min-w-[240px] flex-col gap-3">
                  {payment.paymentProof && (
                    <a
                      href={payment.paymentProof}
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
                      📄 Lihat Bukti Transfer
                    </a>
                  )}

                  {payment.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleApprove(payment.id)}
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
                        ✓ Approve Payment
                      </button>

                      <button
                        onClick={() => handleReject(payment.id)}
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
                        ✕ Reject Payment
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
