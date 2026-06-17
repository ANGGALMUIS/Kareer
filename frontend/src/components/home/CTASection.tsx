"use client";

import Link from "next/link";

import Container from "@/components/ui/Container";

export default function CTASection() {
  return (
    <section className="py-28">
      <Container>
        <div
          className="
            rounded-[40px]
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            px-10
            py-20
            text-center
            text-white
          "
        >
          <h2 className="text-5xl font-bold">Siap Memulai Karier Baru?</h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Temukan ribuan peluang kerja dan bangun masa depan kariermu bersama
            Kareer.
          </p>

          <Link
            href="/register"
            className="
              mt-10
              inline-block
              rounded-2xl
              bg-white
              px-8
              py-4
              font-semibold
              text-blue-600
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Daftar Sekarang
          </Link>
        </div>
      </Container>
    </section>
  );
}
