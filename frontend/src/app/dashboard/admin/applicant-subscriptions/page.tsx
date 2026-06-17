"use client";

import { useEffect, useState } from "react";

import {
  getAllSubscriptions,
  approveSubscription,
  rejectSubscription,
} from "@/services/applicant-subscription.service";

export default function AdminApplicantSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      const response = await getAllSubscriptions();

      setSubscriptions(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const activeSubscriptions = subscriptions.filter(
    (item) => item.status === "ACTIVE",
  ).length;

  const applicantRevenue = activeSubscriptions * 50000;
  
  const handleApprove = async (id: string) => {
    try {
      await approveSubscription(id);

      fetchSubscriptions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectSubscription(id);

      fetchSubscriptions();
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
        from-orange-500
        via-amber-500
        to-yellow-500
        p-10
        text-white
        shadow-xl
      "
      >
        <div className="relative z-10">
          <p className="text-sm text-white/80">Admin Workspace</p>

          <h1 className="mt-2 text-5xl font-bold">Applicant Premium</h1>

          <p className="mt-4 max-w-2xl text-white/90">
            Kelola langganan premium applicant dan verifikasi pembayaran
            membership.
          </p>
        </div>

        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10" />
        <div className="absolute bottom-0 right-20 h-32 w-32 rounded-full bg-white/10" />
      </div>

      {/* SUMMARY */}
      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Subscription</p>

          <h2 className="mt-3 text-5xl font-bold text-blue-600">
            {subscriptions.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Applicant Revenue</p>

          <h2 className="mt-3 text-3xl font-bold text-emerald-600">
            Rp {applicantRevenue.toLocaleString()}
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            Rp 50.000 / Applicant Premium
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Active</p>

          <h2 className="mt-3 text-5xl font-bold text-green-600">
            {subscriptions.filter((item) => item.status === "ACTIVE").length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Rejected</p>

          <h2 className="mt-3 text-5xl font-bold text-red-500">
            {subscriptions.filter((item) => item.status === "REJECTED").length}
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
          Loading...
        </div>
      ) : subscriptions.length === 0 ? (
        <div className="rounded-3xl bg-white p-16 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-slate-700">
            Belum Ada Subscription
          </h3>

          <p className="mt-2 text-slate-500">
            Saat ini belum ada pengajuan premium.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
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
                      {subscription.user?.name}
                    </h2>

                    <span
                      className={`rounded-full px-4 py-1 text-xs font-semibold ${
                        subscription.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : subscription.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {subscription.status}
                    </span>
                  </div>

                  <p className="text-slate-500">{subscription.user?.email}</p>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase text-slate-400">
                        Membership Plan
                      </p>

                      <p className="mt-1 font-semibold text-orange-600">
                        {subscription.plan}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase text-slate-400">
                        Subscription Status
                      </p>

                      <p className="mt-1 font-semibold">
                        {subscription.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex min-w-[240px] flex-col gap-3">
                  {subscription.paymentProof && (
                    <a
                      href={subscription.paymentProof}
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
                      📄 Lihat Bukti Pembayaran
                    </a>
                  )}

                  {subscription.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleApprove(subscription.id)}
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
                        ✓ Approve Premium
                      </button>

                      <button
                        onClick={() => handleReject(subscription.id)}
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
