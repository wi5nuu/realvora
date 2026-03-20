import type { Metadata } from "next";
import "./globals.css";
import { Toast } from "@/components/ui/Toast";
import { OfflineBanner } from "@/components/ui/OfflineBanner";

export const metadata: Metadata = {
  title: "Realvora",
  description: "Realvora — Smart Digital Solution for Real World Problems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col overflow-x-hidden antialiased">
        <OfflineBanner />
        <Toast />
        {children}
      </body>
    </html>
  );
}
