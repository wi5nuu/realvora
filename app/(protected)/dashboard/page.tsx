"use client";

import * as React from "react";
import { supabase } from "@/lib/supabase/client";
import { Skeleton } from "@/components/ui/Skeleton";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { ProgressListMobile } from "@/components/dashboard/ProgressListMobile";
import { RiwayatCard } from "@/components/dashboard/RiwayatCard";
import { MarketInsights } from "@/components/dashboard/MarketInsights";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  const [loading, setLoading] = React.useState(true);
  const [userName, setUserName] = React.useState<string>("");
  const [scores, setScores] = React.useState<any[]>([]);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData.session?.user;
        const fullName = (user?.user_metadata as any)?.full_name;
        if (alive) setUserName(fullName || user?.email || "");

        const { data, error } = await supabase
          .from("diagnoses")
          .select("id, nama_usaha, skor_total, created_at")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (alive) setScores(data ?? []);
      } catch (_e) {
        if (alive) setScores([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-2/3" />
          <div className="mt-6">
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const total = scores.length;
  const last = scores[0]?.skor_total ?? null;
  const best = scores.length
    ? Math.max(...scores.map((s) => Number(s.skor_total ?? 0)))
    : null;

  const progressData = scores.slice(0, 7).map((s) => ({
    date: new Date(s.created_at).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    }),
    skor: Number(s.skor_total ?? 0),
    nama_usaha: s.nama_usaha,
  }));

  const progressListData = scores.slice(0, 6).map((s) => ({
    id: s.id,
    date: new Date(s.created_at).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    skor: Number(s.skor_total ?? 0),
    nama_usaha: s.nama_usaha,
  }));

  return (
    <div className="px-4 py-6 md:py-10 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Selamat datang kembali, {userName}! 👋
            </h1>
            <p className="mt-1 md:mt-2 text-sm text-gray-600 max-w-xl">
              Pantau perkembangan kesehatan bisnis Anda secara real-time dan intip tren pasar terkini.
            </p>
          </div>
          <Link
            href="/diagnosis"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            Diagnosis Baru
          </Link>
        </div>

        <div className="mt-8">
          <OverviewCards
            skorTerakhir={last}
            totalDiagnosis={total}
            skorTerbaik={best}
            streak={0}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
            <ProgressChart data={progressData} />
            <div className="md:hidden">
              <ProgressListMobile data={progressListData} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <MarketInsights />
          </div>
        </div>

        <div className="mt-10">
          <div className="font-display text-2xl font-bold text-gray-900">
            Riwayat Terbaru
          </div>

          <div className="mt-4 space-y-3">
            {scores.slice(0, 5).map((s) => (
              <RiwayatCard
                key={s.id}
                id={s.id}
                skor={Number(s.skor_total ?? 0)}
                date={new Date(s.created_at).toLocaleDateString("id-ID")}
                namaUsaha={s.nama_usaha}
              />
            ))}
          </div>

          {scores.length === 0 ? (
            <div className="mt-6 rounded-lg border border-gray-200 shadow-sm bg-white p-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-gray-900">
                  Belum ada data
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Mulai diagnosis pertamamu untuk melihat skor dan riwayat.
                </div>
              </div>
              <Link
                href="/diagnosis"
                className="inline-flex px-5 py-2.5 rounded-md bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold text-sm shadow-sm"
              >
                Mulai Diagnosis
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

