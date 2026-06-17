"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

interface Application {
  id: string;

  status: string;

  coverLetter: string;

  appliedAt: string;

  jobListing: {
    id: string;
    title: string;
    location?: string | null;
  };
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/applications/my");

        setApplications(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return "bg-blue-100 text-blue-700";

      case "REVIEW":
        return "bg-yellow-100 text-yellow-700";

      case "INTERVIEW":
        return "bg-purple-100 text-purple-700";

      case "ACCEPTED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold">Lamaran Saya</h1>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-xl border bg-gray-100"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">Lamaran Saya</h1>

      {applications.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          Anda belum melamar pekerjaan.
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {application.jobListing.title}
                </h2>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                    application.status,
                  )}`}
                >
                  {application.status}
                </span>
              </div>

              <p className="mt-3 text-gray-600">Cover Letter:</p>

              <p className="mt-1 text-gray-700">{application.coverLetter}</p>

              <p className="mt-4 text-sm text-gray-500">
                Dilamar pada:{" "}
                {new Date(application.appliedAt).toLocaleDateString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
