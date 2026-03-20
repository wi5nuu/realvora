"use client";

import { useRouter } from "next/navigation";

function scoreTone(score: number) {
  if (score < 40) return { cls: "text-red-600 bg-red-50 border-red-200", label: "Kritis" };
  if (score < 60)
    return { cls: "text-amber-700 bg-amber-50 border-amber-200", label: "Perlu Perhatian" };
  if (score < 80) return { cls: "text-blue-700 bg-blue-50 border-blue-200", label: "Cukup Sehat" };
  return { cls: "text-emerald-700 bg-emerald-50 border-emerald-200", label: "Sangat Sehat" };
}

export function ProgressListMobile({
  data,
}: {
  data: Array<{ id: string; date: string; skor: number; nama_usaha: string }>;
}) {
  const router = useRouter();
  return (
    <div className="md:hidden space-y-3">
      {data.map((d) => {
        const tone = scoreTone(d.skor);
        return (
          <div
            key={d.id}
            className={`rounded-lg border ${tone.cls} bg-white p-4 flex items-start justify-between gap-3 shadow-sm`}
          >
            <div>
              <div className="text-xs text-gray-500">{d.date}</div>
              <div className="font-semibold text-gray-900">{d.nama_usaha}</div>
              <div className="text-sm font-semibold mt-1">
                Skor: <span className="font-display">{d.skor}</span> • {tone.label}
              </div>
            </div>
            <button
              type="button"
              onClick={() => router.push(`/hasil/${d.id}`)}
              className="h-10 rounded-md px-4 border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 text-sm font-semibold"
            >
              Lihat
            </button>
          </div>
        );
      })}
    </div>
  );
}

