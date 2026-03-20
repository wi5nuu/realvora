import * as React from "react";
import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const year = 2026;
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="text-xl font-display font-bold bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
              Realvora
            </div>
            <p className="text-sm text-gray-300">
              Real insight. Real growth. Real impact.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-white">Produk</div>
            <Link href="/#cara-kerja" className="block text-sm text-gray-300 hover:underline">
              Cara Kerja
            </Link>
            <Link href="/#fitur" className="block text-sm text-gray-300 hover:underline">
              Fitur
            </Link>
            <Link href="/#faq" className="block text-sm text-gray-300 hover:underline">
              FAQ
            </Link>
          </div>

          <div className="space-y-2 hidden md:block">
            <div className="text-sm font-semibold text-white">Perusahaan</div>
            <Link href="/#tentang" className="block text-sm text-gray-300 hover:underline">
              Tentang Kami
            </Link>
            <Link href="/#tentang" className="block text-sm text-gray-300 hover:underline">
              Tim
            </Link>
            <Link href="/#blog" className="block text-sm text-gray-300 hover:underline">
              Blog
            </Link>
            <Link href="/#kontak" className="block text-sm text-gray-300 hover:underline">
              Kontak
            </Link>
          </div>

          <div className="space-y-2 hidden md:block">
            <div className="text-sm font-semibold text-white">Legal</div>
            <Link href="/#kebijakan" className="block text-sm text-gray-300 hover:underline">
              Kebijakan Privasi
            </Link>
            <Link href="/#syarat" className="block text-sm text-gray-300 hover:underline">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-gray-300">
          <div>© {year} Realvora. Dibuat dengan ❤️ di Indonesia</div>
          <div className="mt-2">
            Platform ini merupakan karya lomba TechSprint Innovation Cup 2026
          </div>
        </div>
      </div>
    </footer>
  );
}

