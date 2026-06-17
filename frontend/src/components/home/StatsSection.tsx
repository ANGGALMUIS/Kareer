"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import Container from "@/components/ui/Container";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white py-28">
      {/* Floating Background */}

      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              inline-flex
              rounded-full
              bg-blue-100
              px-4
              py-2
              text-sm
              font-medium
              text-blue-700
            "
          >
            🚀 Portal Lowongan Kerja Modern Indonesia
          </motion.span>

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="
              mt-8
              text-5xl
              font-extrabold
              leading-tight
              md:text-7xl
            "
          >
            Temukan
            <span className="text-blue-600"> Karier Impianmu</span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              text-gray-600
            "
          >
            Jelajahi ribuan peluang kerja dari perusahaan terbaik Indonesia dan
            bangun masa depan kariermu bersama Kareer.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.6,
            }}
            className="
              mx-auto
              mt-10
              flex
              max-w-3xl
              flex-col
              gap-3
              rounded-2xl
              bg-white
              p-4
              shadow-2xl
              md:flex-row
            "
          >
            <input
              placeholder="Cari posisi, perusahaan, atau skill..."
              className="
                flex-1
                rounded-xl
                border
                border-gray-200
                px-4
                py-4
                outline-none
              "
            />

            <button
              className="
                rounded-xl
                bg-blue-600
                px-8
                py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:bg-blue-700
              "
            >
              Cari Lowongan
            </button>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
            }}
            className="
              mt-10
              flex
              justify-center
              gap-8
              text-sm
              text-gray-500
            "
          >
            <span>10.000+ Lowongan</span>

            <span>500+ Perusahaan</span>

            <span>25.000+ Kandidat</span>
          </motion.div>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/jobs"
              className="
                rounded-xl
                bg-blue-600
                px-6
                py-3
                font-medium
                text-white
                transition
                hover:bg-blue-700
              "
            >
              Lihat Lowongan
            </Link>

            <Link
              href="/register"
              className="
                rounded-xl
                border
                px-6
                py-3
                font-medium
                transition
                hover:bg-gray-50
              "
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
