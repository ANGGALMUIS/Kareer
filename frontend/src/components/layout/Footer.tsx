import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}

          <div>
            <h2 className="text-3xl font-bold text-blue-400">Kareer</h2>

            <p className="mt-4 leading-relaxed text-slate-400">
              Portal lowongan kerja modern yang membantu kandidat dan perusahaan
              menemukan peluang terbaik di Indonesia.
            </p>
          </div>

          {/* Kandidat */}

          <div>
            <h3 className="mb-4 font-semibold">Kandidat</h3>

            <div className="space-y-3 text-slate-400">
              <Link href="/jobs" className="block transition hover:text-white">
                Lowongan
              </Link>

              <Link
                href="/applications"
                className="block transition hover:text-white"
              >
                Lamaran Saya
              </Link>

              <Link
                href="/saved-jobs"
                className="block transition hover:text-white"
              >
                Saved Jobs
              </Link>
            </div>
          </div>

          {/* Perusahaan */}

          <div>
            <h3 className="mb-4 font-semibold">Perusahaan</h3>

            <div className="space-y-3 text-slate-400">
              <Link
                href="/company/jobs"
                className="block transition hover:text-white"
              >
                Kelola Lowongan
              </Link>

              <Link
                href="/dashboard/company"
                className="block transition hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                href="/company/applications"
                className="block transition hover:text-white"
              >
                Pelamar
              </Link>
            </div>
          </div>

          {/* Bantuan */}

          <div>
            <h3 className="mb-4 font-semibold">Bantuan</h3>

            <div className="space-y-3 text-slate-400">
              <Link href="/about" className="block transition hover:text-white">
                Tentang Kami
              </Link>

              <Link
                href="/contact"
                className="block transition hover:text-white"
              >
                Kontak
              </Link>

              <Link href="/faq" className="block transition hover:text-white">
                FAQ
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-16 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Kareer. Semua hak dilindungi.
            </p>

            <div className="flex gap-6 text-sm text-slate-400">
              <span className="transition hover:text-white">Instagram</span>

              <span className="transition hover:text-white">LinkedIn</span>

              <span className="transition hover:text-white">GitHub</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
