"use client";

import { useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

import { changePassword, changeEmail } from "@/services/auth.service";
import { toast } from "sonner";

export default function CompanySettingsPage() {
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [loadingEmail, setLoadingEmail] = useState(false);

  const [loadingPassword, setLoadingPassword] = useState(false);

  const handleChangeEmail = async () => {
    try {
      setLoadingEmail(true);

      await changeEmail(email);

      toast.success("Email berhasil diperbarui");

      setEmail("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Gagal update email");
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setLoadingPassword(true);

      await changePassword({
        currentPassword,
        newPassword,
      });

      toast.success("Password berhasil diperbarui");

      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Gagal update password");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <ProtectedRoute role="COMPANY">
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-1 sm:px-1 md:px-6 py-1">
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
                <p className="text-white/80">Account Workspace</p>

                <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold">
                  🔐 Settings
                </h1>

                <p
                  className="
    mt-3
    max-w-xl
    text-sm
    sm:text-base
    text-purple-100
  "
                >
                  Kelola email dan keamanan akun perusahaan.
                </p>
              </div>

              <div
                className="
        rounded-3xl
        bg-white/15
        px-7
        py-5
        backdrop-blur
      "
              >
                <p className="text-sm text-white/70">Account Type</p>

                <p className="mt-1 text-2xl font-bold">COMPANY</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2"></div>

          {/* EMAIL */}

          <div
            className="
              mt-1
rounded-[32px]
border
border-slate-100
bg-white
p-8
shadow-sm
            "
          >
            <h2 className="text-2xl font-bold">📧 Update Email</h2>

            <p className="mt-2 text-slate-500">
              Perbarui email yang digunakan untuk login.
            </p>

            <input
              type="email"
              placeholder="Email baru"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
  mt-5
  h-14
  w-full
  rounded-2xl
  border
  border-slate-200
  px-4
"
            />

            <button
              onClick={handleChangeEmail}
              disabled={loadingEmail}
              className="
  mt-5
  h-14
  rounded-2xl
  bg-gradient-to-r
  from-blue-600
  to-violet-600
  px-8
  font-semibold
  text-white
"
            >
              {loadingEmail ? "Saving..." : "Update Email"}
            </button>
          </div>

          {/* PASSWORD */}

          <div
            className="
              mt-6
              rounded-[32px]
border
border-slate-100
              bg-white
              p-6
              shadow-sm
            "
          >
            <h2 className="text-2xl font-bold">🔒 Security Settings</h2>

            <p className="mt-2 text-slate-500">
              Gunakan password yang kuat untuk menjaga keamanan akun.
            </p>

            <input
              type="password"
              placeholder="Password Baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="
                mt-4
                w-full
                rounded-xl
                border
                border-slate-200
                p-3
              "
            />

            <button
              onClick={handleChangePassword}
              disabled={loadingPassword}
              className="
  mt-4
  h-14
  w-full
  rounded-2xl
  border
  border-slate-200
  px-4
"
            >
              {loadingPassword ? "Saving..." : "Update Password"}
            </button>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
