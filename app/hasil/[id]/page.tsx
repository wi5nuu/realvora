"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { benchmarkData } from "@/lib/benchmark";

import { Skeleton } from "@/components/ui/Skeleton";
import { HealthScoreRing } from "@/components/hasil/HealthScoreRing";
import { SubScoreGrid } from "@/components/hasil/SubScoreGrid";
import { DiagnosisCards } from "@/components/hasil/DiagnosisCards";
import { RekomendasiList } from "@/components/hasil/RekomendasiList";
import { BenchmarkCardsMobile } from "@/components/hasil/BenchmarkCardsMobile";
import { BenchmarkChart } from "@/components/hasil/BenchmarkChart";
import { AIChat } from "@/components/hasil/AIChat";
import { ResultActions } from "@/components/hasil/ResultActions";

type DiagnosisRow = {
  id: string;
  nama_usaha: string;
  jenis_usaha: string;
  skor_total: number;
  skor_keuangan: number;
  skor_pertumbuhan: number;
  skor_operasional: number;
  skor_penjualan: number;
  status_kesehatan: string;
  ringkasan: string;
  diagnosis: any[];
  rekomendasi: any[];
  kalimat_motivasi: string;
  omset: number;
  biaya_operasional: number;
};

export default function HasilPage() {
  const params = useParams<{ id: string }>();
  const diagnosisId = params?.id;
  const router = useRouter();

  const [row, setRow] = React.useState<DiagnosisRow | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!diagnosisId) return;
    let alive = true;

    if (diagnosisId === "unsaved") {
      try {
        const stored = sessionStorage.getItem("unsaved_diagnosis");
        if (stored && alive) {
          const parsed = JSON.parse(stored);
          setRow({
            id: "unsaved",
            nama_usaha: parsed.nama_usaha,
            jenis_usaha: parsed.jenis_usaha,
            skor_total: parsed.skorTotal,
            skor_keuangan: parsed.skorKeuangan,
            skor_pertumbuhan: parsed.skorPertumbuhan,
            skor_operasional: parsed.skorOperasional,
            skor_penjualan: parsed.skorPenjualan,
            status_kesehatan: parsed.statusKesehatan,
            ringkasan: parsed.ringkasan,
            diagnosis: parsed.diagnosis,
            rekomendasi: parsed.rekomendasi,
            kalimat_motivasi: parsed.kalimatMotivasi,
            omset: parsed.omset ?? 0,
            biaya_operasional: parsed.biaya_operasional ?? 0,
          });
        } else {
          if (alive) setRow(null);
        }
      } catch (e) {
        if (alive) setRow(null);
      } finally {
        if (alive) setLoading(false);
      }
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("diagnoses")
          .select(
            "id,nama_usaha,jenis_usaha,skor_total,skor_keuangan,skor_pertumbuhan,skor_operasional,skor_penjualan,status_kesehatan,ringkasan,diagnosis,rekomendasi,kalimat_motivasi,omset,biaya_operasional",
          )
          .eq("id", diagnosisId)
          .single();
        if (error) throw error;
        if (alive) setRow(data as any);
      } catch (e) {
        // jika tidak login, RLS bisa menyembunyikan data; tetap tampil skeleton
        if (alive) setRow(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [diagnosisId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Skeleton className="h-10 w-2/3" />
          <div className="mt-8 grid gap-4">
            <Skeleton className="h-52 w-full" />
            <Skeleton className="h-56 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!row) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="rounded-lg bg-white border border-gray-100 p-6">
            <div className="font-display text-2xl font-bold text-gray-900">
              Hasil tidak ditemukan
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Link mungkin sudah kedaluwarsa atau tidak valid.
            </p>
            <button
              className="mt-6 px-6 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-semibold active:scale-95"
              onClick={() => router.push("/diagnosis")}
            >
              Kembali ke Diagnosis
            </button>
          </div>
        </div>
      </div>
    );
  }

  const benchmarkKey = (() => {
    const j = String(row.jenis_usaha || "").toLowerCase();
    if (j.includes("kuliner") || j.includes("makanan") || j.includes("minuman"))
      return "KULINER";
    if (j.includes("fashion") || j.includes("pakaian")) return "FASHION";
    if (j.includes("retail") || j.includes("toko") || j.includes("dagangan"))
      return "RETAIL";
    if (j.includes("jasa")) return "JASA";
    if (j.includes("teknologi") || j.includes("digital")) return "TEKNOLOGI";
    if (j.includes("pertanian") || j.includes("perkebunan")) return "PERTANIAN";
    if (j.includes("kerajinan") || j.includes("handmade")) return "KERAJINAN";
    return "LAINNYA";
  })();

  const bm = benchmarkData[benchmarkKey]!;

  const marginUserPct =
    row.omset > 0 ? ((row.omset - row.biaya_operasional) / row.omset) * 100 : 0;
  const efisiensiUserPct = row.omset > 0 ? ((row.omset - row.biaya_operasional) / row.omset) * 100 : 0;
  const pertumbuhanUserPct = bm.pertumbuhanIdeal * (row.skor_pertumbuhan / 100);
  const channelUserPct = row.skor_penjualan;
  const channelIdealPct = 80;

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="max-w-2xl mx-auto px-4 py-10 md:py-12">
        <div className="rounded-lg border border-gray-100 bg-white p-6 md:p-7">
          <div className="text-sm text-gray-500">
            {row.nama_usaha} • {row.jenis_usaha}
          </div>

          <div className="mt-4 flex justify-center">
            <HealthScoreRing score={row.skor_total} ringSummary={row.ringkasan} size="md" />
          </div>

          <div className="mt-6">
            <SubScoreGrid
              skorKeuangan={row.skor_keuangan}
              skorPertumbuhan={row.skor_pertumbuhan}
              skorOperasional={row.skor_operasional}
              skorPenjualan={row.skor_penjualan}
            />
          </div>

          <div className="mt-8">
            <div className="font-display text-2xl font-bold text-gray-900">
              Benchmark dibanding industri
            </div>

            <BenchmarkChart
              marginUserPct={marginUserPct}
              marginIdealPct={bm.marginIdeal}
              efisiensiUserPct={efisiensiUserPct}
              efisiensiIdealPct={bm.efisiensiIdeal}
              pertumbuhanUserPct={pertumbuhanUserPct}
              pertumbuhanIdealPct={bm.pertumbuhanIdeal}
              channelUserPct={channelUserPct}
              channelIdealPct={channelIdealPct}
            />

            <div className="md:hidden mt-4">
              <BenchmarkCardsMobile
                marginUserPct={marginUserPct}
                marginIdealPct={bm.marginIdeal}
                efisiensiUserPct={efisiensiUserPct}
                efisiensiIdealPct={bm.efisiensiIdeal}
                pertumbuhanUserPct={pertumbuhanUserPct}
                pertumbuhanIdealPct={bm.pertumbuhanIdeal}
                channelUserPct={channelUserPct}
                channelIdealPct={channelIdealPct}
              />
            </div>
          </div>

          <div className="mt-10">
            <div className="font-display text-2xl font-bold text-gray-900">
              3 Diagnosis Utama
            </div>
            <div className="mt-4">
              <DiagnosisCards diagnosis={row.diagnosis ?? []} />
            </div>
          </div>

          <div className="mt-10">
            <div className="font-display text-2xl font-bold text-gray-900">
              5 Rekomendasi Aksi
            </div>
            <div className="mt-4">
              <RekomendasiList rekomendasi={row.rekomendasi ?? []} />
            </div>
          </div>

          <div className="mt-10">
            <div className="font-display text-2xl font-bold text-gray-900">
              Tanya Realvora AI
            </div>
            <div className="mt-4">
              <AIChat diagnosisId={diagnosisId} />
            </div>
          </div>

          <ResultActions diagnosisId={diagnosisId} />
        </div>
      </div>
    </div>
  );
}

