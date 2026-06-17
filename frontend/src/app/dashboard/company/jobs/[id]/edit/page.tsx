"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import {
  CreateJobPayload,
  getJobById,
  updateJob,
} from "@/services/job.service";

export default function EditJobPage() {
  const router = useRouter();

  const params = useParams();

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

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

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(params.id as string);

        const job = response.data;

        setForm({
          title: job.title,
          description: job.description,
          requirements: job.requirements,

          location: job.location || "",

          salaryMin: job.salaryMin || undefined,

          salaryMax: job.salaryMax || undefined,

          employmentType: job.employmentType || "FULL_TIME",

          workMode: job.workMode || "ONSITE",

          experienceLevel: job.experienceLevel || "JUNIOR",

          industry: job.industry || "",

          skills: job.skills || [],

          benefits: job.benefits || [],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  const addSkill = () => {
    if (!skillInput.trim()) return;

    setForm((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), skillInput],
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

    setForm((prev) => ({
      ...prev,
      benefits: [...(prev.benefits || []), benefitInput],
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

      await updateJob(params.id as string, form);

      toast.success("Lowongan berhasil diperbarui");

      router.push("/dashboard/company/jobs");
    } catch (error: any) {
      toast.success(error?.response?.data?.message || "Gagal memperbarui lowongan");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="p-10">Memuat data...</div>;
  }

  return (
    <ProtectedRoute role="COMPANY">
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h1 className="text-4xl font-bold">Edit Lowongan</h1>

            <p className="mt-3 text-slate-500">
              Perbarui informasi lowongan pekerjaan.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-8">
              {/* INFORMASI DASAR */}

              <div>
                <h2 className="mb-4 text-xl font-semibold">Informasi Dasar</h2>

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
                    placeholder="Industry"
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

              <div>
                <h2 className="mb-4 text-xl font-semibold">Deskripsi</h2>

                <textarea
                  rows={8}
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border p-4"
                />
              </div>

              {/* REQUIREMENTS */}

              <div>
                <h2 className="mb-4 text-xl font-semibold">Requirements</h2>

                <textarea
                  rows={8}
                  value={form.requirements}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      requirements: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border p-4"
                />
              </div>

              {/* DETAIL */}

              <div>
                <h2 className="mb-4 text-xl font-semibold">Detail</h2>

                <div className="grid gap-4 md:grid-cols-3">
                  <select
                    value={form.employmentType}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        employmentType: e.target.value,
                      })
                    }
                    className="rounded-xl border p-3"
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
                    className="rounded-xl border p-3"
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
                    className="rounded-xl border p-3"
                  >
                    <option value="FRESH_GRADUATE">Fresh Graduate</option>

                    <option value="JUNIOR">Junior</option>

                    <option value="MID_LEVEL">Mid Level</option>

                    <option value="SENIOR">Senior</option>
                  </select>
                </div>
              </div>

              {/* GAJI */}

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  type="number"
                  value={form.salaryMin || ""}
                  placeholder="Salary Min"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      salaryMin: Number(e.target.value),
                    })
                  }
                />

                <Input
                  type="number"
                  value={form.salaryMax || ""}
                  placeholder="Salary Max"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      salaryMax: Number(e.target.value),
                    })
                  }
                />
              </div>

              {/* SKILLS */}

              <div>
                <h2 className="mb-4 text-xl font-semibold">Skills</h2>

                <div className="flex gap-3">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Tambah skill"
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
                      className="rounded-full bg-blue-100 px-3 py-2 text-sm text-blue-700"
                    >
                      {skill} ✕
                    </button>
                  ))}
                </div>
              </div>

              {/* BENEFITS */}

              <div>
                <h2 className="mb-4 text-xl font-semibold">Benefits</h2>

                <div className="flex gap-3">
                  <Input
                    value={benefitInput}
                    onChange={(e) => setBenefitInput(e.target.value)}
                    placeholder="Tambah benefit"
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
                      className="rounded-full bg-green-100 px-3 py-2 text-sm text-green-700"
                    >
                      {benefit} ✕
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
