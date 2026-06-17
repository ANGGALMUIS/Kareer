"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";

import { Briefcase, ArrowRight, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const { setAuth } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.data.token;

      const user = response.data.data.user;

      setAuth(token, user);

      if (user.role === "ADMIN") {
        router.push("/dashboard/admin");
      }

      if (user.role === "COMPANY") {
        router.push("/dashboard/company");
      }

      if (user.role === "APPLICANT") {
        router.push("/dashboard/applicant");
      }
    } catch (error: any) {
      setError(error?.response?.data?.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[140px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-[140px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] lg:grid-cols-2">
          {/* LEFT */}

          <div
            className="
              hidden
              lg:flex
              flex-col
              justify-between
              bg-gradient-to-br
              from-blue-600
              via-indigo-600
              to-purple-600
              p-12
              text-white
            "
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
                  <Briefcase size={24} />
                </div>

                <span className="text-2xl font-bold">Kareer</span>
              </div>

              <h1 className="mt-16 text-5xl font-bold leading-tight">
                Temukan Karier
                <br />
                Impianmu 🚀
              </h1>

              <p className="mt-6 text-lg text-blue-100">
                Platform rekrutmen modern untuk kandidat dan perusahaan
                Indonesia.
              </p>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm text-blue-100">
                Sudah digunakan untuk melamar pekerjaan, interview, dan
                monitoring proses rekrutmen secara real-time.
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex items-center justify-center p-8 lg:p-14">
            <div className="w-full max-w-md">
              <h2 className="text-4xl font-bold text-slate-900">
                Selamat Datang 👋
              </h2>

              <p className="mt-3 text-slate-500">
                Masuk ke akun Kareer untuk melanjutkan perjalanan kariermu.
              </p>

              {error && (
                <div
                  className="
                    mt-6
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-red-700
                  "
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="
        w-full
        rounded-2xl
        border
        border-slate-300
        bg-white
        px-4
        py-4
        text-slate-800
        outline-none
        transition-all

        focus:border-blue-500
        focus:ring-4
        focus:ring-blue-100
      "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="
        w-full
        rounded-2xl
        border
        border-slate-300
        bg-white
        px-4
        py-4
        text-slate-800
        outline-none
        transition-all

        focus:border-blue-500
        focus:ring-4
        focus:ring-blue-100
      "
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="
      mt-2
      w-full
      rounded-2xl
      bg-gradient-to-r
      from-blue-600
      to-indigo-600
      py-4
      font-semibold
      text-white
      transition-all

      hover:-translate-y-1
      hover:shadow-xl
    "
                >
                  {loading ? "Memproses..." : "Login"}
                </button>
              </form>
              <p className="mt-8 text-center text-slate-500">
                Belum punya akun?{" "}
                <Link href="/register" className="font-semibold text-blue-600">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
