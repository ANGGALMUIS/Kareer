"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";
import { toast } from "sonner";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import {
  getCompanyProfile,
  updateCompanyProfile,
} from "@/services/company.service";

import { uploadCompanyLogo } from "@/services/upload.service";

export default function CompanyProfilePage() {
  const [loading, setLoading] = useState(false);

  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [company, setCompany] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    industry: "",
    description: "",
    website: "",
    address: "",
    logoUrl: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getCompanyProfile();

      const companyData = response.data;

      setCompany(companyData);

      setForm({
        name: companyData?.name || "",
        industry: companyData?.industry || "",
        description: companyData?.description || "",
        website: companyData?.website || "",
        address: companyData?.address || "",
        logoUrl: companyData?.logoUrl || "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoUpload = async (file: File) => {
    try {
      setUploadingLogo(true);

      const response = await uploadCompanyLogo(file);

      setForm((prev) => ({
        ...prev,
        logoUrl: response.data.logoUrl,
      }));
    } catch (error) {
      console.error(error);

      toast.error("Gagal upload logo");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateCompanyProfile(form);

      toast.success("Profil berhasil diperbarui");

      fetchProfile();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Gagal menyimpan profil");
    } finally {
      setLoading(false);
    }
  };

  const verificationColor = () => {
    switch (company?.verificationStatus) {
      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <ProtectedRoute role="COMPANY">
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-1">
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Company Workspace</p>

                <h1 className="mt-2 text-5xl font-bold">
                  🏢 Profil Perusahaan
                </h1>

                <p className="mt-4 text-white/90">
                  Kelola identitas dan informasi perusahaan Anda.
                </p>
              </div>

              {company && (
                <span className="rounded-full bg-white/20 px-5 py-2 font-semibold">
                  {company.verificationStatus}
                </span>
              )}
            </div>
          </div>

          <div
            className="
    mt-5
    rounded-[32px]
    border
    border-slate-100
    bg-white
    p-8
    shadow-sm
  "
          >
            <form onSubmit={handleSubmit}>
              {/* LOGO */}
              <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                <div>
                  <label className="mb-3 block font-medium">
                    Logo Perusahaan
                  </label>

                  {form.logoUrl && (
                    <img
                      src={form.logoUrl}
                      alt="Company Logo"
                      className="
                      mb-4
                      h-32
                      w-32
                      rounded-2xl
                      border
                      object-cover
                    "
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        handleLogoUpload(file);
                      }
                    }}
                  />

                  {uploadingLogo && (
                    <p className="mt-2 text-sm text-slate-500">
                      Uploading logo...
                    </p>
                  )}

                  
                </div>

                <div className="space-y-6">
                  {/* COMPANY NAME */}

                  <div>
                    <label className="mb-2 block font-medium">
                      Nama Perusahaan
                    </label>

                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* INDUSTRY */}

                  <div>
                    <label className="mb-2 block font-medium">Industri</label>

                    <Input
                      value={form.industry}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          industry: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* WEBSITE */}

                  <div>
                    <label className="mb-2 block font-medium">Website</label>

                    <Input
                      value={form.website}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          website: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* ADDRESS */}

                  <div>
                    <label className="mb-2 block font-medium">Alamat</label>

                    <Input
                      value={form.address}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* DESCRIPTION */}

                  <div>
                    <label className="mb-2 block font-medium">Deskripsi</label>

                    <textarea
                      rows={6}
                      value={form.description}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          description: e.target.value,
                        })
                      }
                      className="
                    w-full
                    rounded-xl
                    border
                    p-4
                  "
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="
    h-14
    w-full
    rounded-2xl
    bg-gradient-to-r
    from-blue-600
    to-violet-600
    text-white
    font-semibold
    mt-10
  "
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
