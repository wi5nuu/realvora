"use client";

import { Navbar } from "@/components/layout/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 w-full flex flex-col justify-center items-center">
        {children}
      </main>
    </div>
  );
}
