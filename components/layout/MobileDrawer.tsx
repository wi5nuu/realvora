"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/#cara-kerja", label: "Cara Kerja" },
  { href: "/#fitur", label: "Fitur" },
  { href: "/#tentang", label: "Tentang" },
];

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close drawer"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      <div
        className="absolute right-0 top-0 h-full w-full max-w-[420px] bg-white/95 backdrop-blur-md border-l border-gray-100 shadow-sm
                   animate-[slideLeft_0.25s_ease-out_forwards]"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <div className="text-xl font-display font-bold bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
            Realvora
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 active:scale-95 transition-transform"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-5">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="rounded-md px-3 py-3 text-[15px] font-medium text-gray-800 hover:bg-indigo-50 active:bg-indigo-50"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="px-5 mt-6 grid gap-3 pb-[env(safe-area-inset-bottom)]">
          <Button
            onClick={onClose}
            as={Link as any}
            href="/login"
            variant="secondary"
            className="bg-transparent text-indigo-700 border-indigo-600/30 hover:bg-indigo-50"
          >
            Masuk
          </Button>
          <Button
            onClick={onClose}
            as={Link as any}
            href="/diagnosis"
            className="w-full"
          >
            Mulai Gratis
          </Button>
        </div>
      </div>
    </div>
  );
}

