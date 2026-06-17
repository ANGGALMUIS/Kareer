"use client";

import FadeUp from "./FadeUp";

import Container from "@/components/ui/Container";

export default function WhyKareerSection() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <h2 className="mb-14 text-center text-4xl font-bold">
          Kenapa Memilih Kareer?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <FadeUp>
            <div className="rounded-3xl bg-white p-8 shadow-md">
              <h3 className="text-xl font-bold">Lowongan Terverifikasi</h3>

              <p className="mt-4 text-gray-600">
                Semua perusahaan diverifikasi sebelum dapat mempublikasikan
                lowongan.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="rounded-3xl bg-white p-8 shadow-md">
              <h3 className="text-xl font-bold">Lamar Dalam Hitungan Detik</h3>

              <p className="mt-4 text-gray-600">
                Proses melamar cepat dan sederhana.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="rounded-3xl bg-white p-8 shadow-md">
              <h3 className="text-xl font-bold">Peluang Karier Terbaik</h3>

              <p className="mt-4 text-gray-600">
                Ribuan peluang kerja dari berbagai industri.
              </p>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
