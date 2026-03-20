"use client";

export function OverviewCards({
  skorTerakhir,
  totalDiagnosis,
  skorTerbaik,
  streak,
}: {
  skorTerakhir: number | null;
  totalDiagnosis: number;
  skorTerbaik: number | null;
  streak?: number | null;
}) {
  const format = (n: number | null) => (n === null ? "-" : n);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="rounded-lg border border-gray-200 shadow-sm bg-white p-5">
        <div className="text-sm text-gray-500">Skor Terakhir</div>
        <div className="mt-1 text-3xl font-display font-bold text-indigo-600">
          {format(skorTerakhir)}
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 shadow-sm bg-white p-5">
        <div className="text-sm text-gray-500">Total Diagnosis</div>
        <div className="mt-1 text-3xl font-display font-bold text-gray-900">
          {totalDiagnosis}
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 shadow-sm bg-white p-5">
        <div className="text-sm text-gray-500">Skor Terbaik</div>
        <div className="mt-1 text-3xl font-display font-bold text-emerald-600">
          {format(skorTerbaik)}
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 shadow-sm bg-white p-4 md:p-5">
        <div className="text-sm text-gray-500">Streak</div>
        <div className="mt-1 text-3xl font-display font-bold text-purple-600">
          {streak ?? 0}
        </div>
        <div className="mt-1 text-xs text-gray-500">hari berturut-turut</div>
      </div>
    </div>
  );
}

