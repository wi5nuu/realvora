"use client";

import * as React from "react";
import { supabase } from "@/lib/supabase/client";
import { Progress } from "@/components/ui/Progress";

type DiagnosisRow = {
  id: string;
  created_at: string;
  nama_usaha: string;
  jenis_usaha: string;
  skor_total: number;
};

function scoreStatus(score: number) {
  if (score < 40) return { label: "Kritis", tone: "text-red-700 bg-red-50 border-red-200" };
  if (score < 60) return { label: "Perlu Perhatian", tone: "text-amber-700 bg-amber-50 border-amber-200" };
  if (score < 80) return { label: "Sehat", tone: "text-blue-700 bg-blue-50 border-blue-200" };
  return { label: "Sangat Sehat", tone: "text-emerald-700 bg-emerald-50 border-emerald-200" };
}

export default function RiwayatPage() {
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState<DiagnosisRow[]>([]);

  const [q, setQ] = React.useState("");
  const [filter, setFilter] = React.useState<"Semua" | "Kritis" | "Perlu Perhatian" | "Sehat">("Semua");
  const [sort, setSort] = React.useState<"Terbaru" | "Terlama" | "Skor Tertinggi" | "Skor Terendah">("Terbaru");
  const [page, setPage] = React.useState(1);

  const pageSize = 10;

  React.useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("diagnoses")
          .select("id,created_at,nama_usaha,jenis_usaha,skor_total")
          .order("created_at", { ascending: false })
          .limit(200);
        if (error) throw error;
        if (alive) setRows(data as any);
      } catch (_e) {
        if (alive) setRows([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const derived = React.useMemo(() => {
    const search = q.trim().toLowerCase();
    let items = rows.slice();

    if (search) {
      items = items.filter((r) =>
        String(r.nama_usaha).toLowerCase().includes(search),
      );
    }

    if (filter !== "Semua") {
      items = items.filter((r) => scoreStatus(r.skor_total).label === filter);
    }

    if (sort === "Terbaru") {
      items.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    } else if (sort === "Terlama") {
      items.sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at));
    } else if (sort === "Skor Tertinggi") {
      items.sort((a, b) => Number(b.skor_total) - Number(a.skor_total));
    } else if (sort === "Skor Terendah") {
      items.sort((a, b) => Number(a.skor_total) - Number(b.skor_total));
    }

    return items;
  }, [rows, q, filter, sort]);

  const totalPages = Math.max(1, Math.ceil(derived.length / pageSize));
  const current = derived.slice((page - 1) * pageSize, page * pageSize);

  React.useEffect(() => {
    setPage(1);
  }, [q, filter, sort]);

  if (loading) {
    return (
      <div className="px-4 py-6 md:py-10 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-1/2 rounded-md bg-gray-200 animate-pulse" />
          <div className="mt-6 h-24 rounded-lg bg-gray-200 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 md:py-10 w-full">
      <div className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Riwayat Diagnosis
          </h1>
          <p className="mt-1 md:mt-2 text-sm text-gray-600">
            Cari dan pantau kembali hasil evaluasi bisnis Anda sebelumnya.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-800">
              Cari nama usaha...
            </label>
            <input
              className="w-full h-12 min-h-12 rounded-md border border-gray-200 bg-white px-4 mt-2 outline-none focus:ring-2 focus:ring-indigo-500/20"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari nama usaha..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-800">Filter</label>
            <select
              className="w-full h-12 min-h-12 rounded-md border border-gray-200 bg-white px-4 mt-2 outline-none focus:ring-2 focus:ring-indigo-500/20"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option>Semua</option>
              <option>Kritis</option>
              <option>Perlu Perhatian</option>
              <option>Sehat</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-800">Sort</label>
            <select
              className="w-full h-12 min-h-12 rounded-md border border-gray-200 bg-white px-4 mt-2 outline-none focus:ring-2 focus:ring-indigo-500/20"
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
            >
              <option>Terbaru</option>
              <option>Terlama</option>
              <option>Skor Tertinggi</option>
              <option>Skor Terendah</option>
            </select>
          </div>
        </div>

        {derived.length === 0 ? (
          <div className="mt-10 rounded-lg border border-gray-100 bg-white p-6 text-sm text-gray-600">
            Belum ada riwayat diagnosis
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="mt-6 md:hidden space-y-3">
              {current.map((r) => {
                const st = scoreStatus(r.skor_total);
                return (
                  <div key={r.id} className="rounded-lg border border-gray-100 bg-white p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs text-gray-500">
                          {new Date(r.created_at).toLocaleDateString("id-ID")}
                        </div>
                        <div className="font-semibold text-gray-900">{r.nama_usaha}</div>
                        <div className="text-sm text-gray-600 mt-1">{r.jenis_usaha}</div>
                      </div>
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${st.tone}`}>
                        {st.label}
                      </span>
                    </div>
                    <div className="mt-3">
                      <Progress value={r.skor_total} />
                      <div className="mt-2 text-sm font-semibold text-gray-900">
                        Skor: {r.skor_total}
                      </div>
                    </div>
                    <div className="mt-4">
                      <a
                        href={`/hasil/${r.id}`}
                        className="inline-flex items-center justify-center h-11 rounded-md bg-gray-900 text-white font-semibold w-full hover:bg-gray-800 active:scale-95"
                      >
                        Detail
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block mt-6 rounded-lg border border-gray-100 bg-white overflow-hidden">
              <div className="overflow-x-auto scroll-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-gray-600">
                      <th className="px-5 py-4">Tanggal</th>
                      <th className="px-5 py-4">Nama Usaha</th>
                      <th className="px-5 py-4">Jenis</th>
                      <th className="px-5 py-4">Skor</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {current.map((r) => {
                      const st = scoreStatus(r.skor_total);
                      return (
                        <tr key={r.id} className="border-t border-gray-100">
                          <td className="px-5 py-4 text-gray-700">
                            {new Date(r.created_at).toLocaleDateString("id-ID")}
                          </td>
                          <td className="px-5 py-4 text-gray-900 font-semibold">
                            {r.nama_usaha}
                          </td>
                          <td className="px-5 py-4 text-gray-700">{r.jenis_usaha}</td>
                          <td className="px-5 py-4 font-semibold">{r.skor_total}</td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${st.tone}`}>
                              {st.label}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <a
                              href={`/hasil/${r.id}`}
                              className="inline-flex items-center justify-center h-10 rounded-md px-4 bg-gray-900 text-white font-semibold hover:bg-gray-800 active:scale-95"
                            >
                              Detail
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="h-11 px-5 rounded-md border border-gray-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 active:scale-95"
              >
                ← Prev
              </button>
              <div className="text-sm text-gray-600">
                Halaman {page} dari {totalPages}
              </div>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="h-11 px-5 rounded-md border border-gray-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 active:scale-95"
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

