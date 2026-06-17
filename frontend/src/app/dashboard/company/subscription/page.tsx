"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";
import { uploadPaymentProof } from "@/services/upload.service";
import { createPayment, getMyPayments } from "@/services/payment.service";
import { toast } from "sonner";
export default function SubscriptionPage() {
  const [payments, setPayments] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [paymentProofUrl, setPaymentProofUrl] = useState("");

  const [previewProof, setPreviewProof] = useState("");

  const [uploadingProof, setUploadingProof] = useState(false);

  const [form, setForm] = useState({
    plan: "BASIC",

    bankName: "",

    accountNumber: "",

    accountHolder: "",
  });

  const fetchPayments = async () => {
    try {
      const response = await getMyPayments();

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

  const handleSubmit = async () => {
    try {
      await createPayment({
        ...form,
        paymentProofUrl,
      });

      toast.success("Pengajuan pembayaran berhasil dibuat");

      fetchPayments();

      setForm({
        plan: "BASIC",
        bankName: "",
        accountNumber: "",
        accountHolder: "",
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Terjadi kesalahan");
    }
  };

  const activePlan =
    payments.find((p) => p.status === "APPROVED")?.plan || "FREE";

  const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  const handleProofUpload = async (file: File) => {
    try {
      setUploadingProof(true);

      setPreviewProof(URL.createObjectURL(file));

      const response = await uploadPaymentProof(file);

      setPaymentProofUrl(response.data.paymentProofUrl);

      toast.success("Bukti pembayaran berhasil diupload");
    } catch {
      toast.error("Gagal upload bukti pembayaran");
    } finally {
      setUploadingProof(false);
    }
  };

  return (
    <ProtectedRoute role="COMPANY">
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-1">
          {/* HERO */}
          <div
            className="
            rounded-[32px]
            bg-gradient-to-r
            from-blue-600
            via-blue-600
            to-violet-600
            p-10
            text-white
          "
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-white/80">Billing Workspace</p>

                <h1 className="mt-2 text-5xl font-bold">
                  💎 Subscription Center
                </h1>

                <p className="mt-4 text-white/90">
                  Kelola paket perusahaan dan pembayaran Anda.
                </p>
              </div>

              <div
                className="
                rounded-3xl
                bg-white/15
                px-8
                py-6
                backdrop-blur
              "
              >
                <p className="text-sm text-white/70">Paket Aktif</p>

                <p className="mt-2 text-4xl font-bold">{activePlan}</p>

                <p className="mt-1 text-sm text-white/70">Company Plan</p>
              </div>
            </div>
          </div>

          {/* PLAN CARDS */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div
              onClick={() =>
                setForm({
                  ...form,
                  plan: "BASIC",
                })
              }
              className={`
              cursor-pointer
              rounded-[32px]
              border
              p-8
              transition
              hover:shadow-lg
              ${
                form.plan === "BASIC"
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white"
              }
            `}
            >
              <h3 className="text-2xl font-bold">BASIC</h3>

              <p className="mt-3 text-5xl font-bold">Rp100K</p>

              <ul className="mt-6 space-y-3 text-slate-600">
                <li>✓ Maksimal 5 Lowongan</li>
                <li>✓ Kelola Kandidat</li>
                <li>✓ Interview Tracking</li>
              </ul>
            </div>

            <div
              onClick={() =>
                setForm({
                  ...form,
                  plan: "PREMIUM",
                })
              }
              className={`
              cursor-pointer
              rounded-[32px]
              border
              p-8
              transition
              hover:shadow-lg
              ${
                form.plan === "PREMIUM"
                  ? "border-violet-500 bg-violet-50"
                  : "border-slate-200 bg-white"
              }
            `}
            >
              <h3 className="text-2xl font-bold">PREMIUM</h3>

              <p className="mt-3 text-5xl font-bold">Rp250K</p>

              <ul className="mt-6 space-y-3 text-slate-600">
                <li>✓ Unlimited Lowongan</li>
                <li>✓ Unlimited Kandidat</li>
                <li>✓ Priority Review</li>
                <li>✓ Premium Badge</li>
              </ul>
            </div>
          </div>

          {/* PAYMENT FORM */}
          <div
            className="
            mt-8
            rounded-[32px]
            border
            border-slate-100
            bg-white
            p-8
            shadow-sm
          "
          >
            <h2 className="text-3xl font-bold">Informasi Pembayaran</h2>

            <p className="mt-2 text-slate-500">
              Lengkapi data pembayaran untuk upgrade paket.
            </p>

            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Nama Bank"
                value={form.bankName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bankName: e.target.value,
                  })
                }
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                p-4
              "
              />

              <input
                type="text"
                placeholder="Nomor Rekening"
                value={form.accountNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    accountNumber: e.target.value,
                  })
                }
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                p-4
              "
              />

              <input
                type="text"
                placeholder="Nama Pemilik Rekening"
                value={form.accountHolder}
                onChange={(e) =>
                  setForm({
                    ...form,
                    accountHolder: e.target.value,
                  })
                }
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                p-4
              "
              />

              <div
                className="
    rounded-3xl
    border-2
    border-dashed
    border-slate-300
    p-8
    text-center
  "
              >
                <p className="font-medium">Upload Bukti Pembayaran</p>

                <input
                  type="file"
                  accept="image/*"
                  className="mt-4"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      handleProofUpload(file);
                    }
                  }}
                />

                {uploadingProof && <p className="mt-3 text-sm">Uploading...</p>}

                {previewProof && (
                  <img
                    src={previewProof}
                    alt="Proof"
                    className="
        mx-auto
        mt-4
        h-48
        rounded-2xl
        border
      "
                  />
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="
                h-14
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-violet-600
                font-semibold
                text-white
              "
              >
                Kirim Pembayaran
              </button>
            </div>
          </div>

          {/* PAYMENT HISTORY */}
          <div
            className="
            mt-8
            rounded-[32px]
            border
            border-slate-100
            bg-white
            p-8
            shadow-sm
          "
          >
            <h2 className="text-3xl font-bold">Riwayat Pembayaran</h2>

            {loading ? (
              <div className="mt-6">Loading...</div>
            ) : (
              <div className="mt-6 space-y-4">
                {payments.length === 0 ? (
                  <p className="text-slate-500">
                    Belum ada riwayat pembayaran.
                  </p>
                ) : (
                  payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="
                      rounded-3xl
                      border
                      border-slate-100
                      bg-slate-50
                      p-6
                    "
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold">{payment.plan}</h3>

                          <p className="mt-1 text-slate-500">
                            Rp
                            {payment.amount.toLocaleString()}
                          </p>
                        </div>

                        <span
                          className={`
                          rounded-full
                          px-4
                          py-2
                          text-sm
                          font-semibold
                          ${
                            statusColor[
                              payment.status as keyof typeof statusColor
                            ]
                          }
                        `}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
            
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
