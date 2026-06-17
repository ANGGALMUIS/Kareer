import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import FloatingWhatsapp from "@/components/common/FloatingWhatsapp";
import AuthInitializer from "@/components/AuthInitializer";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Kareer",
  description: "Portal Lowongan Kerja Modern",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <AuthInitializer />

        <LayoutWrapper>{children}</LayoutWrapper>

        <FloatingWhatsapp />

        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
