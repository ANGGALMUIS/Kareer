"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";

import Input from "@/components/ui/Input";

import Button from "@/components/ui/Button";

import {
  getCompanyProfile,
  updateCompanyProfile,
} from "@/services/company.service";

import { uploadCompanyLogo } from "@/services/upload.service";

export default function CompanySetupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [form, setForm] = useState({
    name: "",
    industry: "",
    description: "",
    website: "",
    address: "",
    logoUrl: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getCompanyProfile();

        if (response?.data) {
          setForm({
            name: response.data.name || "",
            industry: response.data.industry || "",
            description: response.data.description || "",
            website: response.data.website || "",
            address: response.data.address || "",
            logoUrl: response.data.logoUrl || "",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogoUpload = async (file: File) => {
    try {
      setUploadingLogo(true);

      const response = await uploadCompanyLogo(file);

      setForm((prev) => ({
        ...prev,
        logoUrl: response.data.logoUrl,
      }));

      toast.success("Logo berhasil diupload");
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

      await updateCompanyProfile({
        name: form.name,
        industry: form.industry,
        description: form.description,
        website: form.website,
        address: form.address,
        logoUrl: form.logoUrl,
      });

      toast.success("Profil perusahaan berhasil disimpan");

      router.push("/dashboard/company");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Gagal menyimpan profil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute role="COMPANY">
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h1 className="text-4xl font-bold">Lengkapi Profil Perusahaan</h1>

            <p className="mt-3 text-slate-500">
              Sebelum menggunakan dashboard perusahaan, lengkapi data perusahaan
              terlebih dahulu.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* LOGO */}

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
    h-28
    w-28
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

              {/* NAMA */}

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
                  placeholder="PT Kareer Indonesia"
                />
              </div>

              {/* INDUSTRY */}

              <div>
                <label className="mb-2 block font-medium">Industry</label>

                <Input
                  value={form.industry}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      industry: e.target.value,
                    })
                  }
                  placeholder="Technology"
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
                  placeholder="https://..."
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
                  placeholder="Semarang"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="mb-2 block font-medium">
                  Deskripsi Perusahaan
                </label>

                <textarea
                  rows={6}
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  placeholder="Ceritakan perusahaan Anda..."
                  className="
                    w-full
                    rounded-xl
                    border
                    p-4
                  "
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Menyimpan..." : "Simpan Profil Perusahaan"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
