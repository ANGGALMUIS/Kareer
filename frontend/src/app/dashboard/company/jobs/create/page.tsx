"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { createJob, CreateJobPayload } from "@/services/job.service";

export default function CreateJobPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [assessmentFile, setAssessmentFile] = useState<File | null>(null);
  const [salaryMinDisplay, setSalaryMinDisplay] = useState("");
  const [salaryMaxDisplay, setSalaryMaxDisplay] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");

  const [form, setForm] = useState<CreateJobPayload>({
    title: "",
    description: "",
    requirements: "",

    location: "",

    salaryMin: undefined,
    salaryMax: undefined,

    employmentType: "FULL_TIME",
    workMode: "ONSITE",
    experienceLevel: "JUNIOR",

    industry: "",

    skills: [],
    benefits: [],
  });

  const formatRupiah = (value: string) => {
    const number = value.replace(/\D/g, "");

    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;

    const skills = skillInput
      .split(/[,;\n]/)
      .map((item) => item.trim())
      .filter(Boolean);

    setForm((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), ...skills],
    }));

    setSkillInput("");
  };

  const removeSkill = (index: number) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills?.filter((_, i) => i !== index),
    }));
  };

  const addBenefit = () => {
    if (!benefitInput.trim()) return;

    const benefits = benefitInput
      .split(/[,;\n]/)
      .map((item) => item.trim())
      .filter(Boolean);

    setForm((prev) => ({
      ...prev,
      benefits: [...(prev.benefits || []), ...benefits],
    }));

    setBenefitInput("");
  };

  const removeBenefit = (index: number) => {
    setForm((prev) => ({
      ...prev,
      benefits: prev.benefits?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          return;
        }

        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
          return;
        }

        formData.append(key, String(value));
      });

      if (assessmentFile) {
        formData.append("assessmentFile", assessmentFile);
      }

      await createJob(formData as any);

      toast.success("Lowongan berhasil dipublikasikan", {
        description: "Lowongan sekarang dapat dilihat oleh pelamar.",
      });

      router.push("/dashboard/company/jobs");
    } catch (error: any) {
      toast.error("Gagal membuat lowongan", {
        description:
          error?.response?.data?.message || "Terjadi kesalahan pada sistem",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute role="COMPANY">
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-8">
          {/* HEADER */}

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900">
              Buat Lowongan Baru
            </h1>

            <p className="mt-2 text-slate-500">
              Lengkapi informasi pekerjaan yang ingin dipublikasikan.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* INFORMASI DASAR */}

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Informasi Dasar</h2>

              <div className="space-y-4">
                <Input
                  placeholder="Judul Lowongan"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Lokasi"
                  value={form.location}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      location: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Industri"
                  value={form.industry || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      industry: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* DESKRIPSI */}

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">
                Deskripsi Pekerjaan
              </h2>

              <textarea
                rows={8}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                p-4
                focus:border-blue-500
                focus:outline-none
              "
                placeholder="Deskripsi pekerjaan"
              />
            </div>

            {/* REQUIREMENTS */}

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Persyaratan</h2>

              <textarea
                rows={8}
                value={form.requirements}
                onChange={(e) =>
                  setForm({
                    ...form,
                    requirements: e.target.value,
                  })
                }
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                p-4
                focus:border-blue-500
                focus:outline-none
              "
                placeholder="Persyaratan pekerjaan"
              />
            </div>

            {/* DETAIL */}

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Detail Pekerjaan</h2>

              <div className="grid gap-4 md:grid-cols-3">
                <select
                  value={form.employmentType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      employmentType: e.target.value,
                    })
                  }
                  className="rounded-2xl border border-slate-200 p-3"
                >
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="INTERNSHIP">Magang</option>
                  <option value="CONTRACT">Kontrak</option>
                  <option value="FREELANCE">Freelance</option>
                </select>

                <select
                  value={form.workMode}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      workMode: e.target.value,
                    })
                  }
                  className="rounded-2xl border border-slate-200 p-3"
                >
                  <option value="ONSITE">Onsite</option>
                  <option value="HYBRID">Hybrid</option>
                  <option value="REMOTE">Remote</option>
                </select>

                <select
                  value={form.experienceLevel}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      experienceLevel: e.target.value,
                    })
                  }
                  className="rounded-2xl border border-slate-200 p-3"
                >
                  <option value="FRESH_GRADUATE">Fresh Graduate</option>
                  <option value="JUNIOR">Junior</option>
                  <option value="MID_LEVEL">Mid Level</option>
                  <option value="SENIOR">Senior</option>
                </select>
              </div>
            </div>

            {/* GAJI */}

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">Rentang Gaji</h2>

              <p className="mb-6 text-sm text-slate-500">
                Masukkan nominal gaji tanpa simbol Rp.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  type="text"
                  placeholder="Contoh: 5.000.000"
                  value={salaryMinDisplay}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, "");

                    setSalaryMinDisplay(formatRupiah(rawValue));

                    setForm({
                      ...form,
                      salaryMin: rawValue ? Number(rawValue) : undefined,
                    });
                  }}
                />

                <Input
                  type="text"
                  placeholder="Contoh: 10.000.000"
                  value={salaryMaxDisplay}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, "");

                    setSalaryMaxDisplay(formatRupiah(rawValue));

                    setForm({
                      ...form,
                      salaryMax: rawValue ? Number(rawValue) : undefined,
                    });
                  }}
                />
              </div>
            </div>

            {/* SKILL & BENEFIT */}

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold">Skills</h2>

                <div className="flex gap-3">
                  <Input
                    placeholder="Tambah skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                  />

                  <Button type="button" onClick={addSkill}>
                    Tambah
                  </Button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {form.skills?.map((skill, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="
                      rounded-full
                      bg-blue-100
                      px-3
                      py-2
                      text-sm
                      text-blue-700
                    "
                    >
                      {skill} ✕
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold">Benefits</h2>

                <div className="flex gap-3">
                  <Input
                    placeholder="Tambah benefit"
                    value={benefitInput}
                    onChange={(e) => setBenefitInput(e.target.value)}
                  />

                  <Button type="button" onClick={addBenefit}>
                    Tambah
                  </Button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {form.benefits?.map((benefit, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="
                        rounded-full
                        bg-green-100
                        px-3
                        py-2
                        text-sm
                        text-green-700
                      "
                    >
                      {benefit} ✕
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ASSESSMENT */}

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">
                Assessment (Opsional)
              </h2>

              <div
                className="
                rounded-2xl
                border-2
                border-dashed
                border-slate-300
                bg-slate-50
                p-6
              "
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.zip,.ppt,.pptx,.xls,.xlsx"
                  onChange={(e) =>
                    setAssessmentFile(e.target.files?.[0] || null)
                  }
                  className="w-full"
                />

                <p className="mt-2 text-sm text-slate-500">
                  Upload soal assessment untuk pelamar
                </p>

                {assessmentFile && (
                  <p className="mt-3 text-green-600">✓ {assessmentFile.name}</p>
                )}
              </div>
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="
              h-14
              w-full
              rounded-2xl
              bg-blue-600
              font-semibold
              text-white
              transition
              hover:bg-blue-700
            "
            >
              {loading ? "Mempublikasikan..." : "Publikasikan Lowongan"}
            </button>
          </form>
        </div>
      </section>
    </ProtectedRoute>
  );
}
