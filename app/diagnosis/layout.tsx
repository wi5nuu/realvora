"use client";

import { DashboardNavbar } from "@/components/layout/DashboardNavbar";

export default function DiagnosisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNavbar />
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}
