"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";
import { toast } from "sonner";
import {
  getApplicantProfile,
  updateApplicantProfile,
} from "@/services/applicant.service";
import { uploadCV } from "@/services/upload.service";
export default function ApplicantProfilePage() {
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    headline: "",
    bio: "",
    location: "",
    linkedinUrl: "",
    githubUrl: "",
    portfolioUrl: "",
    cvUrl: "",
    skills: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getApplicantProfile();

        if (response.data) {
          setForm({
            phone: response.data.phone || "",

            headline: response.data.headline || "",

            bio: response.data.bio || "",

            location: response.data.location || "",

            linkedinUrl: response.data.linkedinUrl || "",

            githubUrl: response.data.githubUrl || "",

            portfolioUrl: response.data.portfolioUrl || "",

            cvUrl: response.data.cvUrl || "",

            skills: response.data.skills?.join(", ") || "",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploadingCV(true);

      const response = await uploadCV(file);

      setForm({
        ...form,
        cvUrl: response.data.cvUrl,
      });

      toast.success("CV berhasil diupload");
    } catch (error) {
      console.error(error);

      toast.error("Gagal upload CV");
    } finally {
      setUploadingCV(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateApplicantProfile({
        ...form,

        skills: form.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      toast.success("Profil berhasil disimpan");
    } catch (error) {
      console.error(error);

      toast.error("Gagal menyimpan profil");
    } finally {
      setSaving(false);
    }
  };

  const profileCompletion = [
    form.phone,
    form.headline,
    form.bio,
    form.location,
    form.skills,
    form.linkedinUrl,
    form.githubUrl,
    form.portfolioUrl,
    form.cvUrl,
  ].filter(Boolean).length;

  const completionPercent = Math.round((profileCompletion / 9) * 100);

  const inputClass = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-white
  p-3
  text-slate-700
  shadow-sm
  transition-all
  duration-300
  focus:border-blue-500
  focus:outline-none
  focus:ring-4
  focus:ring-blue-100
`;

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-1 sm:px-1 md:px-6 py-1">
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

          <h1 className="mt-2 text-4xl font-bold">Profile Center</h1>

          <p className="mt-3 text-blue-100">
            Lengkapi profilmu agar recruiter lebih mudah mengenal pengalaman dan
            kemampuanmu.
          </p>
        </div>

        {/* PROFILE OVERVIEW */}

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div
            className="
            rounded-3xl
            bg-white
            p-6
            shadow-sm
          "
          >
            <div
              className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-blue-100
              text-3xl
              font-bold
              text-blue-600
            "
            >
              {form.headline?.charAt(0) || "A"}
            </div>

            <h2 className="mt-4 text-xl font-bold">
              {form.headline || "Applicant"}
            </h2>

            <p className="mt-2 text-slate-500">
              {form.location || "Lokasi belum diisi"}
            </p>
          </div>

          <div
            className="
            lg:col-span-2
            rounded-3xl
            bg-white
            p-6
            shadow-sm
          "
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Profile Completion</h2>

                <p className="mt-2 text-slate-500">
                  Lengkapi profil untuk meningkatkan peluang diterima recruiter.
                </p>
              </div>

              <div className="text-4xl font-bold text-blue-600">
                {completionPercent}%
              </div>
            </div>

            <div className="mt-6 h-4 rounded-full bg-slate-200">
              <div
                className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-blue-500
                to-indigo-600
                transition-all
                duration-1000
              "
                style={{
                  width: `${completionPercent}%`,
                }}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div
            className="
            h-96
            animate-pulse
            rounded-3xl
            bg-white
          "
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* PERSONAL */}

            <div
              className="
              rounded-3xl
              bg-white
              p-8
              shadow-sm
            "
            >
              <h2 className="mb-6 text-2xl font-bold">Personal Information</h2>

              <div className="grid gap-5 md:grid-cols-2">
                <input
                  name="phone"
                  placeholder="Nomor HP"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                />

                <input
                  name="location"
                  placeholder="Lokasi"
                  value={form.location}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div
              className="
    rounded-3xl
    bg-white
    p-8
    shadow-sm
  "
            >
              <h2 className="text-2xl font-bold">Informasi Profesional</h2>

              <p className="mt-2 text-sm text-slate-500">
                Informasi ini akan dilihat recruiter saat meninjau profil dan
                lamaran Anda.
              </p>

              <div className="mt-6 space-y-6">
                {/* POSISI */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Posisi yang Dicari
                  </label>

                  <input
                    name="headline"
                    value={form.headline}
                    onChange={handleChange}
                    placeholder="Contoh: Frontend Developer, UI/UX Designer, Digital Marketing"
                    className={inputClass}
                  />

                  <p className="mt-1 text-xs text-slate-500">
                    Isi dengan posisi pekerjaan yang ingin Anda lamar.
                  </p>
                </div>

                {/* BIO */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Ringkasan Profil
                  </label>

                  <textarea
                    rows={6}
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Jelaskan pengalaman, keahlian, pendidikan, sertifikasi, dan pencapaian yang relevan dengan karier Anda."
                    className={inputClass}
                  />

                  <p className="mt-1 text-xs text-slate-500">
                    Recruiter akan membaca bagian ini sebelum membuka CV Anda.
                  </p>
                </div>

                {/* SKILLS */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Keahlian / Skill
                  </label>

                  <input
                    name="skills"
                    value={form.skills}
                    onChange={handleChange}
                    placeholder="Contoh: React, Next.js, TypeScript, Figma, SEO"
                    className={inputClass}
                  />

                  <p className="mt-1 text-xs text-slate-500">
                    Pisahkan setiap skill menggunakan tanda koma (,).
                  </p>
                </div>
              </div>
            </div>

            {/* LINKS */}

            <div
              className="
              rounded-3xl
              bg-white
              p-8
              shadow-sm
            "
            >
              <h2 className="mb-6 text-2xl font-bold">Links & Portfolio</h2>

              <div className="space-y-5">
                <input
                  name="linkedinUrl"
                  placeholder="LinkedIn URL"
                  value={form.linkedinUrl}
                  onChange={handleChange}
                  className={inputClass}
                />

                <input
                  name="githubUrl"
                  placeholder="Github URL"
                  value={form.githubUrl}
                  onChange={handleChange}
                  className={inputClass}
                />

                <input
                  name="portfolioUrl"
                  placeholder="Portfolio URL"
                  value={form.portfolioUrl}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* CV */}

            <div
              className="
              rounded-3xl
              bg-white
              p-8
              shadow-sm
            "
            >
              <h2 className="mb-6 text-2xl font-bold">Curriculum Vitae</h2>

              <input
                type="file"
                accept=".pdf"
                onChange={handleCVUpload}
                className="
  w-full
  rounded-xl
  border
  border-dashed
  border-slate-300
  bg-slate-50
  p-4
  transition-all
  duration-300
  hover:border-blue-400
"
              />

              {uploadingCV && (
                <p className="mt-3 text-blue-600">Uploading CV...</p>
              )}

              {form.cvUrl && (
                <a
                  href={form.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  mt-4
                  inline-block
                  rounded-xl
                  bg-blue-100
                  px-4
                  py-2
                  text-blue-700
                "
                >
                  📄 Lihat CV Saat Ini
                </a>
              )}
            </div>

            {/* BUTTON */}

            <button
              disabled={saving}
              className="
              w-full
              rounded-2xl
              bg-blue-600
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-blue-700
            "
            >
              {saving ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
