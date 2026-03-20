"use client";

import { useRouter } from "next/navigation";

export function RiwayatCard({
  id,
  date,
  namaUsaha,
  skor,
}: {
  id: string;
  date: string;
  namaUsaha: string;
  skor: number;
}) {
  const router = useRouter();
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-4 flex items-start justify-between gap-3 shadow-sm">
      <div>
        <div className="text-xs text-gray-500">{date}</div>
        <div className="font-semibold text-gray-900">{namaUsaha}</div>
        <div className="text-sm text-gray-700 mt-1">
          Skor: <span className="font-display font-bold">{skor}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => router.push(`/hasil/${id}`)}
        className="h-10 rounded-md px-4 bg-gray-900 text-white font-semibold hover:bg-gray-800 active:scale-95"
      >
        Detail
      </button>
    </div>
  );
}

