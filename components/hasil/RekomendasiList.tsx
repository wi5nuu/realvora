"use client";

export function RekomendasiList({
  rekomendasi,
}: {
  rekomendasi: Array<{
    judul: string;
    langkah: string;
    waktu: string;
    dampak?: string;
    kategori: "KEUANGAN" | "MARKETING" | "OPERASIONAL" | "DIGITAL";
  }>;
}) {
  const catBadge = (kategori: string) => {
    const tone =
      kategori === "KEUANGAN"
        ? "bg-indigo-50 border-indigo-500/30 text-indigo-700"
        : kategori === "MARKETING"
          ? "bg-emerald-50 border-emerald-500/30 text-emerald-700"
          : kategori === "OPERASIONAL"
            ? "bg-amber-50 border-amber-500/30 text-amber-700"
            : "bg-purple-50 border-purple-500/30 text-purple-700";

    return (
      <span
        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tone}`}
      >
        {kategori}
      </span>
    );
  };

  const item = (r: any, idx: number) => (
    <div key={r.judul} className="rounded-lg border border-gray-100 p-5 bg-white">
      <div className="flex items-start gap-4">
        <div className="text-3xl font-display font-bold text-indigo-600">
          {idx + 1}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 items-center">
            {catBadge(r.kategori)}
            <div className="text-lg font-display font-semibold text-gray-900">
              {r.judul}
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-700 leading-relaxed">
            {r.langkah}
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="text-xs font-semibold text-gray-900 bg-gray-50 border border-gray-100 rounded-md px-3 py-2">
              ⏱️ {r.waktu}
            </div>
            <div className="text-xs font-semibold text-gray-900 bg-gray-50 border border-gray-100 rounded-md px-3 py-2">
              📈 {r.dampak ?? "Potensi meningkat sesuai kondisi Anda"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Mobile accordion */}
      <div className="md:hidden space-y-3">
        {rekomendasi.map((r, idx) => (
          <details key={r.judul} className="group">
            <summary className="cursor-pointer list-none">
              <div className="rounded-lg border border-gray-100 bg-white p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-display font-bold text-indigo-600">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {r.judul}
                    </div>
                    <div className="text-xs text-gray-500">{r.kategori}</div>
                  </div>
                </div>
                <div className="text-gray-400 group-open:rotate-180 transition-transform">
                  ▾
                </div>
              </div>
            </summary>
            <div className="mt-3">{item(r, idx)}</div>
          </details>
        ))}
      </div>

      {/* Desktop expanded */}
      <div className="hidden md:block">
        <div className="grid gap-4">
          {rekomendasi.map((r, idx) => item(r, idx))}
        </div>
      </div>
    </div>
  );
}

