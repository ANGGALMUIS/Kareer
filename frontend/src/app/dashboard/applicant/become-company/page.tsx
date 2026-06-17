"use client";

import { useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

import { uploadProposal } from "@/services/upload.service";

import { createCompanyRequest } from "@/services/company-request.service";
import { toast } from "sonner";

export default function BecomeCompanyPage() {
  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    website: "",
    address: "",
    description: "",
    proposalUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleProposalUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const response = await uploadProposal(file);

      setForm((prev) => ({
        ...prev,
        proposalUrl: response.data.proposalUrl,
      }));

      toast.success("Proposal berhasil diupload");
    } catch (error) {
      console.error(error);

      toast.error("Gagal upload proposal");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createCompanyRequest(form);

      toast.success("Pengajuan berhasil dikirim");

      setForm({
        companyName: "",
        industry: "",
        website: "",
        address: "",
        description: "",
        proposalUrl: "",
      });
    } catch (error) {
      console.error(error);

      toast.error("Gagal mengirim pengajuan");
    } finally {
      setLoading(false);
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
          from-blue-600
          via-indigo-600
          to-purple-600
          p-10
          text-white
          shadow-xl
        "
        >
          <p className="text-blue-100">Company Upgrade</p>

          <h1 className="mt-2 text-5xl font-bold">Become Company</h1>

          <p className="mt-4 max-w-2xl text-blue-100">
            Ajukan perusahaan Anda untuk mulai mempublikasikan lowongan kerja,
            mengelola kandidat, dan membangun employer branding melalui Kareer.
          </p>
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
            <div className="text-4xl">📢</div>

            <h3 className="mt-4 font-bold text-lg">Publish Jobs</h3>

            <p className="mt-2 text-slate-500">
              Publikasikan lowongan pekerjaan dan jangkau ribuan kandidat.
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
            <div className="text-4xl">👥</div>

            <h3 className="mt-4 font-bold text-lg">Manage Applicants</h3>

            <p className="mt-2 text-slate-500">
              Kelola seluruh pelamar dari satu dashboard yang terintegrasi.
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
            <div className="text-4xl">📊</div>

            <h3 className="mt-4 font-bold text-lg">Analytics</h3>

            <p className="mt-2 text-slate-500">
              Pantau statistik lowongan dan performa rekrutmen perusahaan.
            </p>
          </div>
        </div>

        {/* STATUS */}

        <div
          className="
          mt-8
          rounded-3xl
          bg-white
          p-6
          shadow-sm
        "
        >
          <p className="text-sm text-slate-500">Status Pengajuan</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-700">
            Belum Mengajukan
          </h2>

          <p className="mt-2 text-slate-500">
            Lengkapi formulir berikut untuk mengirim pengajuan perusahaan.
          </p>
        </div>

        {/* FORM */}

        <div
          className="
          mt-8
          rounded-3xl
          bg-white
          p-8
          shadow-sm
        "
        >
          <h2 className="text-3xl font-bold">Data Perusahaan</h2>

          <p className="mt-2 text-slate-500">
            Lengkapi informasi perusahaan dengan benar untuk mempercepat proses
            verifikasi.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input
              name="companyName"
              placeholder="Nama Perusahaan"
              value={form.companyName}
              onChange={handleChange}
              className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              transition-all
              duration-300
              focus:border-blue-500
              focus:outline-none
              focus:ring-4
              focus:ring-blue-100
            "
            />

            <input
              name="industry"
              placeholder="Industri"
              value={form.industry}
              onChange={handleChange}
              className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              transition-all
              duration-300
              focus:border-blue-500
              focus:outline-none
              focus:ring-4
              focus:ring-blue-100
            "
            />

            <input
              name="website"
              placeholder="Website"
              value={form.website}
              onChange={handleChange}
              className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              transition-all
              duration-300
              focus:border-blue-500
              focus:outline-none
              focus:ring-4
              focus:ring-blue-100
            "
            />

            <input
              name="address"
              placeholder="Alamat Perusahaan"
              value={form.address}
              onChange={handleChange}
              className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              transition-all
              duration-300
              focus:border-blue-500
              focus:outline-none
              focus:ring-4
              focus:ring-blue-100
            "
            />

            <textarea
              rows={5}
              name="description"
              placeholder="Deskripsi Perusahaan"
              value={form.description}
              onChange={handleChange}
              className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              transition-all
              duration-300
              focus:border-blue-500
              focus:outline-none
              focus:ring-4
              focus:ring-blue-100
            "
            />

            {/* UPLOAD */}

            <div
              className="
              rounded-3xl
              border-2
              border-dashed
              border-slate-300
              bg-slate-50
              p-10
              text-center
              transition-all
              duration-300
              hover:border-blue-500
            "
            >
              <div className="text-5xl">📄</div>

              <h3 className="mt-4 text-xl font-bold">
                Upload Proposal Perusahaan
              </h3>

              <p className="mt-2 text-slate-500">Format PDF, DOC atau DOCX</p>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleProposalUpload}
                className="mt-6"
              />

              {uploading && (
                <p className="mt-4 text-blue-600">Uploading proposal...</p>
              )}

              {form.proposalUrl && (
                <p className="mt-4 font-medium text-green-600">
                  ✓ Proposal berhasil diupload
                </p>
              )}
            </div>

            {/* INFO */}

            <div
              className="
              rounded-2xl
              bg-blue-50
              p-5
            "
            >
              <h3 className="font-semibold text-blue-900">
                📌 Proses Verifikasi
              </h3>

              <ul className="mt-3 space-y-2 text-sm text-blue-800">
                <li>1. Lengkapi data perusahaan.</li>

                <li>2. Upload proposal perusahaan.</li>

                <li>3. Tim Kareer melakukan review.</li>

                <li>4. Akun Company aktif setelah disetujui admin.</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading || !form.proposalUrl}
              className="
              h-14
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-[1.02]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            >
              {loading ? "Mengirim..." : "Kirim Pengajuan"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
