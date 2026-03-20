"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, LogOut, LayoutDashboard, History, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { MobileDrawer } from "@/components/layout/MobileDrawer";

const DASHBOARD_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/riwayat", label: "Riwayat", icon: History },
  { href: "/diagnosis", label: "Diagnosis Baru", icon: Sparkles },
];

export function DashboardNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [initials, setInitials] = React.useState("US");
  
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const user = data?.session?.user;
      if (user) {
        const name = (user.user_metadata as any)?.full_name || user.email || "User";
        setInitials(name.substring(0, 2).toUpperCase());
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/dashboard"
              className="text-xl font-display font-bold text-gray-900 flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-emerald-500 flex items-center justify-center text-white text-xs">
                R
              </div>
              Realvora
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {DASHBOARD_LINKS.map((l) => {
                const isActive = pathname === l.href;
                const Icon = l.icon;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={[
                      "flex items-center gap-2 text-sm font-medium transition-colors border-b-2 py-5",
                      isActive 
                        ? "text-indigo-600 border-indigo-600" 
                        : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-200",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4" />
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
                {initials}
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Keluar"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>

          <button
            className="md:hidden p-2 -mr-2 rounded-lg text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* For mobile drawer, we will adapt the existing MobileDrawer or create a specific one but re-using MobileDrawer for now, although it has landing page links. */}
      {/* Since the user asked for a dash navbar, let's just make a very simple mobile menu overlay here for the dashboard. */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
             <div className="font-display font-bold text-xl text-gray-900">Realvora</div>
             <button onClick={() => setOpen(false)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">Tutup</button>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-2">
            {DASHBOARD_LINKS.map(l => (
               <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 text-gray-900 font-medium border border-gray-100">
                  <l.icon className="h-5 w-5 text-indigo-600" />
                  {l.label}
               </Link>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100 mt-auto">
             <button onClick={handleLogout} className="w-full flex justify-center items-center gap-2 p-4 rounded-lg text-red-600 bg-red-50 font-semibold border border-red-100">
                <LogOut className="h-5 w-5" />
                Keluar Akun
             </button>
          </div>
        </div>
      )}
    </>
  );
}
