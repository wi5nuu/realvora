import { Progress } from "@/components/ui/Progress";

const ITEMS = [
  { key: "keuangan", label: "Kesehatan Keuangan", icon: "💰" },
  { key: "pertumbuhan", label: "Potensi Pertumbuhan", icon: "📈" },
  { key: "operasional", label: "Efisiensi Operasional", icon: "⚙️" },
  { key: "penjualan", label: "Strategi Penjualan", icon: "🎯" },
] as const;

export function SubScoreGrid({
  skorKeuangan,
  skorPertumbuhan,
  skorOperasional,
  skorPenjualan,
}: {
  skorKeuangan: number;
  skorPertumbuhan: number;
  skorOperasional: number;
  skorPenjualan: number;
}) {
  const map: Record<string, number> = {
    keuangan: skorKeuangan,
    pertumbuhan: skorPertumbuhan,
    operasional: skorOperasional,
    penjualan: skorPenjualan,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {ITEMS.map((it) => (
        <div
          key={it.key}
          className="rounded-lg border border-gray-100 bg-white p-4"
        >
          <div className="flex items-center gap-2">
            <div className="text-xl">{it.icon}</div>
            <div className="text-sm font-semibold text-gray-900">
              {it.label}
            </div>
          </div>
          <div className="mt-2 text-3xl font-display font-bold text-gray-900">
            {map[it.key]}/100
          </div>
          <div className="mt-3">
            <Progress value={map[it.key]} />
          </div>
        </div>
      ))}
    </div>
  );
}

