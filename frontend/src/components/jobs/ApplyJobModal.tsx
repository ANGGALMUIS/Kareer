"use client";

import { Fragment, useState } from "react";

import { Dialog, Transition, TransitionChild } from "@headlessui/react";

import Button from "@/components/ui/Button";

interface Props {
  open: boolean;

  onClose: () => void;

  jobTitle: string;

  onSubmit: (
    coverLetter: string,
    assessmentAnswer: File | null,
  ) => Promise<void>;
}

export default function ApplyJobModal({
  open,
  onClose,
  jobTitle,
  onSubmit,
}: Props) {
  const [coverLetter, setCoverLetter] = useState("");

  const [assessmentAnswer, setAssessmentAnswer] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await onSubmit(coverLetter, assessmentAnswer);

      setCoverLetter("");

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className="
              flex
              min-h-full
              items-center
              justify-center
              p-4
            "
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="
                  w-full
                  max-w-2xl
                  rounded-3xl
                  bg-white
                  p-8
                  shadow-2xl
                "
              >
                <Dialog.Title
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  Lamar Pekerjaan
                </Dialog.Title>

                <p className="mt-2 text-gray-500">{jobTitle}</p>

                <div
                  className="
                    mt-6
                    rounded-2xl
                    bg-blue-50
                    p-4
                    text-sm
                    text-blue-700
                  "
                >
                  Tips: Jelaskan mengapa kamu cocok untuk posisi ini, pengalaman
                  yang relevan, dan apa yang bisa kamu kontribusikan kepada
                  perusahaan.
                </div>

                <textarea
                  rows={10}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tulis cover letter..."
                  className="
                    mt-6
                    w-full
                    rounded-2xl
                    border
                    p-4
                    outline-none
                    focus:border-blue-500
                  "
                />

                <div className="mt-6">
                  <label
                    className="
      mb-2
      block
      font-medium
    "
                  >
                    Jawaban Assessment
                  </label>

                  <input
                    type="file"
                    accept="
      .pdf,
      .doc,
      .docx,
      .zip,
      .ppt,
      .pptx,
      .xls,
      .xlsx
    "
                    onChange={(e) =>
                      setAssessmentAnswer(e.target.files?.[0] || null)
                    }
                    className="
      w-full
      rounded-2xl
      border
      p-3
    "
                  />

                  {assessmentAnswer && (
                    <p className="mt-2 text-sm text-green-600">
                      {assessmentAnswer.name}
                    </p>
                  )}
                </div>

                <div
                  className="
                    mt-6
                    flex
                    justify-end
                    gap-3
                  "
                >
                  <Button variant="outline" onClick={onClose}>
                    Batal
                  </Button>

                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Mengirim..." : "Kirim Lamaran"}
                  </Button>
                </div>
              </Dialog.Panel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
