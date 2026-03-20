"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/#cara-kerja", label: "Cara Kerja" },
  { href: "/#fitur", label: "Fitur" },
  { href: "/#tentang", label: "Tentang" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-40",
          "transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-gray-100"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-display font-bold bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent"
          >
            Realvora
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => {
              const isActive = l.href === "/" && pathname === "/";
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    "text-sm font-medium text-gray-700 transition-colors",
                    "hover:text-indigo-700",
                    isActive && "text-indigo-700 underline underline-offset-4",
                  ].join(" ")}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="secondary" className="border-indigo-600/30 bg-transparent text-indigo-700 hover:bg-indigo-50">
                Masuk
              </Button>
            </Link>
            <Link href="/diagnosis">
              <Button className="w-auto">
                Mulai Gratis
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-white/60 active:scale-95 transition-transform"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </header>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

