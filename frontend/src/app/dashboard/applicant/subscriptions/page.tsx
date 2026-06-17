"use client";

import { useEffect, useState } from "react";
import { getMySubscription } from "@/services/applicant-subscription.service";
import { toast } from "sonner";
import { uploadPaymentProof } from "@/services/upload.service";

import { createSubscription } from "@/services/applicant-subscription.service";

export default function SubscriptionPage() {
  const [uploading, setUploading] = useState(false);

  const [loading, setLoading] = useState(false);

 const [paymentProof, setPaymentProof] = useState("");

 const [subscription, setSubscription] = useState<any>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const response = await uploadPaymentProof(file);

      setPaymentProof(response.data.paymentProofUrl);
    } catch (error) {
      console.error(error);
      toast.error("Gagal upload bukti pembayaran");
    } finally {
      setUploading(false);
    }
  };

  const handleUpgrade = async () => {
    try {
      setLoading(true);

      await createSubscription({
        paymentProof,
      });

      toast.success("Pengajuan premium berhasil dikirim");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Gagal mengirim pengajuan");
    } finally {
      setLoading(false);
    }
  };

  const isPremium =
    subscription?.plan === "PREMIUM" && subscription?.status === "ACTIVE";

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      const response = await getMySubscription();

      setSubscription(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 pt-2 pb-10">
        {/* HERO */}

        <div
          className="
          overflow-hidden
          rounded-[32px]
          bg-gradient-to-r
          from-amber-500
          via-orange-500
          to-red-500
          p-10
          text-white
          shadow-xl
        "
        >
          <p className="text-orange-100">Premium Membership</p>

          <h1 className="mt-2 text-5xl font-bold">Applicant Premium ⭐</h1>

          <p className="mt-4 max-w-2xl text-orange-100">
            Tingkatkan peluang mendapatkan pekerjaan dengan fitur premium dan
            prioritas recruiter.
          </p>
        </div>

        {/* STATUS */}

        <div className="mt-8">
          <div
            className="
            rounded-3xl
            bg-white
            p-6
            shadow-sm
          "
          >
            <p className="text-sm text-slate-500">Membership Saat Ini</p>

            <h2
              className={`
              mt-2
              text-3xl
              font-bold
              ${isPremium ? "text-green-600" : "text-slate-700"}
            `}
            >
              {isPremium ? "PREMIUM ⭐" : "FREE"}
            </h2>
          </div>
        </div>

        {/* BENEFITS */}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
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
            <div className="text-3xl">🚀</div>

            <h3 className="mt-4 font-bold">Unlimited Applications</h3>

            <p className="mt-2 text-slate-500">
              Lamar sebanyak yang kamu mau tanpa batas.
            </p>
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
            <div className="text-3xl">🎯</div>

            <h3 className="mt-4 font-bold">Priority Recruiter</h3>

            <p className="mt-2 text-slate-500">
              Profilmu tampil lebih menonjol di recruiter.
            </p>
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
            <div className="text-3xl">⭐</div>

            <h3 className="mt-4 font-bold">Premium Badge</h3>

            <p className="mt-2 text-slate-500">
              Tampilkan badge premium pada profilmu.
            </p>
          </div>
        </div>

        {/* PAYMENT */}

        <div
          className="
          mt-8
          rounded-3xl
          bg-white
          p-8
          shadow-sm
        "
        >
          <h2 className="text-3xl font-bold">Upgrade Premium</h2>

          <p className="mt-2 text-slate-500">Biaya Rp50.000 / bulan</p>

          <div
            className="
            mt-6
            rounded-2xl
            bg-orange-50
            p-5
          "
          >
            <h3 className="font-semibold">Cara Upgrade</h3>

            <ol className="mt-3 space-y-2 text-slate-600">
              <li>1. Transfer pembayaran premium.</li>
              <li>2. Upload bukti pembayaran.</li>
              <li>3. Admin akan melakukan verifikasi.</li>
              <li>4. Akun premium aktif setelah disetujui.</li>
            </ol>
          </div>

          <div className="mt-6">
            <label className="mb-2 block font-medium">
              Upload Bukti Pembayaran
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="
              w-full
              rounded-xl
              border
              border-dashed
              border-slate-300
              bg-slate-50
              p-4
            "
            />

            {uploading && <p className="mt-3 text-blue-600">Uploading...</p>}

            {paymentProof && (
              <p className="mt-3 text-green-600">
                ✓ Bukti pembayaran berhasil diupload
              </p>
            )}
          </div>

          <button
            onClick={handleUpgrade}
            disabled={loading || !paymentProof}
            className="
            mt-8
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-orange-500
            to-red-500
            py-4
            text-lg
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-[1.02]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          >
            {loading ? "Mengirim..." : "Upgrade Premium Sekarang"}
          </button>
        </div>
      </div>
    </section>
  );
}
