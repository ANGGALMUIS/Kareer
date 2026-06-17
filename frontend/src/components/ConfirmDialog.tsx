"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface ConfirmDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  trigger: React.ReactNode;
}

export default function ConfirmDialog({
  title,
  description,
  onConfirm,
  trigger,
}: ConfirmDialogProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="
            fixed
            inset-0
            z-50
            bg-black/50
          "
        />

        <AlertDialog.Content
          className="
            fixed
            left-1/2
            top-1/2
            z-50
            w-full
            max-w-md
            -translate-x-1/2
            -translate-y-1/2
            rounded-3xl
            bg-white
            p-6
            shadow-xl
          "
        >
          <AlertDialog.Title
            className="
              text-xl
              font-bold
            "
          >
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description
            className="
              mt-3
              text-slate-500
            "
          >
            {description}
          </AlertDialog.Description>

          <div
            className="
              mt-6
              flex
              justify-end
              gap-3
            "
          >
            <AlertDialog.Cancel
              className="
                rounded-xl
                border
                px-4
                py-2
              "
            >
              Batal
            </AlertDialog.Cancel>

            <AlertDialog.Action
              onClick={onConfirm}
              className="
                rounded-xl
                bg-red-600
                px-4
                py-2
                text-white
              "
            >
              Ya, Lanjutkan
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
