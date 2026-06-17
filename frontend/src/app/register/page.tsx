"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/api";

import { Briefcase, ArrowRight, Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      router.push("/login");
    } catch (error: any) {
      setError(error?.response?.data?.message || "Register gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-orange-500/20 blur-[140px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-pink-500/20 blur-[140px]" />

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
              from-orange-500
              via-pink-500
              to-red-500
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
                Mulai Karier
                <br />
                Hebatmu Hari Ini ✨
              </h1>

              <p className="mt-6 text-lg text-orange-100">
                Buat akun dan mulai melamar pekerjaan impian.
              </p>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm text-orange-100">
                Satu akun untuk melamar, interview, notifikasi, dan monitoring
                status lamaran secara real-time.
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex items-center justify-center p-8 lg:p-14">
            <div className="w-full max-w-md">
              <h2 className="text-4xl font-bold text-slate-900">
                Buat Akun 🎉
              </h2>

              <p className="mt-3 text-slate-500">
                Daftar dan mulai perjalanan kariermu.
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

              <form onSubmit={handleRegister} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Nama Lengkap
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
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

        focus:border-orange-500
        focus:ring-4
        focus:ring-orange-100
      "
                  />
                </div>

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

        focus:border-orange-500
        focus:ring-4
        focus:ring-orange-100
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

        focus:border-orange-500
        focus:ring-4
        focus:ring-orange-100
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
      from-orange-500
      to-red-500
      py-4
      font-semibold
      text-white
      transition-all

      hover:-translate-y-1
      hover:shadow-xl
    "
                >
                  {loading ? "Memproses..." : "Register"}
                </button>
              </form>

              <p className="mt-8 text-center text-slate-500">
                Sudah punya akun?{" "}
                <Link href="/login" className="font-semibold text-orange-600">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
