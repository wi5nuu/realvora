"use client";

import * as React from "react";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      <DashboardNavbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
