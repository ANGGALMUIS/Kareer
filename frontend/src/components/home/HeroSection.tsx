"use client";

import Link from "next/link";
import { useState} from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import Container from "@/components/ui/Container";

export default function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    router.push(`/jobs?keyword=${encodeURIComponent(search)}`);
  };


  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white py-16 md:py-28">
      {/* Floating Background */}

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="
          absolute
          left-0
          top-0
          h-96
          w-96
          rounded-full
          bg-blue-400/20
          blur-3xl
        "
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
        }}
        className="
          absolute
          right-0
          top-20
          h-96
          w-96
          rounded-full
          bg-cyan-400/20
          blur-3xl
        "
      />

      <Container>
        <div className="relative mx-auto max-w-5xl text-center">
          {/* Badge */}

          <motion.div
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
          >
            <span
              className="
                inline-flex
                rounded-full
                border
                border-blue-200
                bg-white
                px-5
                py-2
                text-sm
                font-medium
                text-blue-700
                shadow-sm
              "
            >
              🚀 Portal Lowongan Kerja Modern Indonesia
            </span>
          </motion.div>

          {/* Title */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
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
mt-6
text-3xl
font-extrabold
leading-tight
tracking-tight
sm:text-5xl
md:text-7xl
"
          >
            Temukan
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Karier Impianmu
            </span>
          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 40,
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
              mt-8
              max-w-3xl
              text-base
              leading-relaxed
              text-gray-600
              md:text-xl
            "
          >
            Jelajahi ribuan peluang kerja dari perusahaan terbaik Indonesia.
            Bangun masa depan kariermu dengan proses pencarian kerja yang lebih
            cepat, modern, dan terpercaya.
          </motion.p>

          {/* Search Box */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
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
              mt-12
              flex
              max-w-4xl
              flex-col
              gap-3
              rounded-3xl
              bg-white
              p-4
              shadow-2xl
              ring-1
              ring-gray-100
              md:flex-row
            "
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Cari posisi, perusahaan, atau skill..."
              className="
    flex-1
    rounded-2xl
    border
    border-gray-200
    px-5
    py-4
    outline-none
    focus:border-blue-500
  "
            />

            <button
              onClick={handleSearch}
              className="
    rounded-2xl
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

          {/* CTA */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.9,
            }}
            className="
mt-8
flex
flex-col
gap-3
sm:flex-row
justify-center
"
          >
            <Link
              href="/jobs"
              className="
                rounded-xl
                bg-blue-600
                px-6
                py-3
                font-medium
                text-white
                transition-all
                hover:-translate-y-1
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
                border-gray-200
                bg-white
                px-6
                py-3
                font-medium
                transition-all
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              Daftar Sekarang
            </Link>
          </motion.div>

          {/* Stats */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.1,
            }}
            className="
mt-10
grid
grid-cols-1
gap-4
sm:grid-cols-3
"
          >
            <div>
              <h3 className="text-3xl font-bold text-blue-600">10.000+</h3>

              <p className="text-gray-500">Lowongan Aktif</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-600">500+</h3>

              <p className="text-gray-500">Perusahaan</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-600">25.000+</h3>

              <p className="text-gray-500">Kandidat</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
