"use client";

import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { ExternalLink, MapPin, FileText, Mail, Phone } from "lucide-react";

import { getPublicApplicant } from "@/services/applicant.service";

export default function ApplicantProfilePage() {
  const params = useParams();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getPublicApplicant(params.id as string);

        setProfile(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [params.id]);

  if (loading) {
    return <div className="mx-auto max-w-5xl px-6 py-20">Loading...</div>;
  }

  if (!profile) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-20">
        Kandidat tidak ditemukan.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* HEADER */}

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {profile.user?.image ? (
              <Image
                src={profile.user.image}
                alt={profile.user?.name || "Profile"}
                width={112}
                height={112}
                className="h-28 w-28 rounded-full object-cover"
              />
            ) : (
              <div
                className="
                  flex
                  h-28
                  w-28
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-200
                  text-3xl
                  font-bold
                "
              >
                {profile.user?.name?.charAt(0)}
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-4xl font-bold">{profile.user?.name}</h1>

              {profile.headline && (
                <p className="mt-2 text-lg text-slate-600">
                  {profile.headline}
                </p>
              )}

              <div className="mt-4 space-y-2">
                {profile.location && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={16} />
                    <span>{profile.location}</span>
                  </div>
                )}

                {profile.user?.email && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <Mail size={16} />
                    <span>{profile.user.email}</span>
                  </div>
                )}

                {profile.phone && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <Phone size={16} />
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT */}

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Tentang Saya</h2>

          <p className="mt-4 whitespace-pre-wrap leading-relaxed text-slate-600">
            {profile.bio || "Kandidat belum menambahkan deskripsi diri."}
          </p>
        </div>

        {/* SKILLS */}

        {profile.skills?.length > 0 && (
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Skills</h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {profile.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="
                      rounded-full
                      bg-blue-100
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-blue-700
                    "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* PROFESSIONAL LINKS */}

        {(profile.linkedinUrl || profile.githubUrl || profile.portfolioUrl) && (
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Link Profesional</h2>

            <div className="mt-6 space-y-4">
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex
                    items-center
                    gap-3
                    text-blue-600
                    hover:underline
                  "
                >
                  <ExternalLink size={18} />
                  LinkedIn
                </a>
              )}

              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex
                    items-center
                    gap-3
                    hover:underline
                  "
                >
                  <ExternalLink size={18} />
                  GitHub
                </a>
              )}

              {profile.portfolioUrl && (
                <a
                  href={profile.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex
                    items-center
                    gap-3
                    text-purple-600
                    hover:underline
                  "
                >
                  <ExternalLink size={18} />
                  Portfolio
                </a>
              )}
            </div>
          </div>
        )}

        {/* CV */}

        {profile.cvUrl && (
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Curriculum Vitae</h2>

            <Link
              href={profile.cvUrl}
              target="_blank"
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-white
                transition
                hover:bg-blue-700
              "
            >
              <FileText size={18} />
              Lihat CV
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
