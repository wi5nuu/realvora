function StatusPill({ ratio }: { ratio: number }) {
  let tone =
    ratio < 0.8
      ? { bg: "bg-red-50", border: "border-red-500/20", text: "text-red-700" }
      : ratio < 0.95
        ? { bg: "bg-amber-50", border: "border-amber-500/20", text: "text-amber-700" }
        : { bg: "bg-emerald-50", border: "border-emerald-500/20", text: "text-emerald-700" };

  let label = ratio < 0.8 ? "Di Bawah Rata-rata 🔴" : ratio < 0.95 ? "Mendekati Ideal 🟡" : "Di Atas Ideal 🟢";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold border ${tone.bg} ${tone.border} ${tone.text}`}>
      {label}
    </span>
  );
}

export function BenchmarkCardsMobile({
  marginUserPct,
  marginIdealPct,
  efisiensiUserPct,
  efisiensiIdealPct,
  pertumbuhanUserPct,
  pertumbuhanIdealPct,
  channelUserPct,
  channelIdealPct,
}: {
  marginUserPct: number;
  marginIdealPct: number;
  efisiensiUserPct: number;
  efisiensiIdealPct: number;
  pertumbuhanUserPct: number;
  pertumbuhanIdealPct: number;
  channelUserPct: number;
  channelIdealPct: number;
}) {
  const MetricCard = ({
    title,
    user,
    ideal,
  }: {
    title: string;
    user: number;
    ideal: number;
  }) => {
    const ratio = ideal <= 0 ? 0 : user / ideal;
    const pct = Math.max(0, Math.min(100, (user / ideal) * 100));
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-5">
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <div className="mt-3">
          <div className="text-xs text-gray-500">
            Anda: {user.toFixed(0)}% • Ideal: {ideal.toFixed(0)}%
          </div>
          <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className={[
                "h-full rounded-full transition-[width]",
                ratio < 0.8
                  ? "bg-red-500"
                  : ratio < 0.95
                    ? "bg-amber-500"
                    : "bg-emerald-500",
              ].join(" ")}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-3">
            <StatusPill ratio={ratio} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      <MetricCard
        title="Margin Keuntungan"
        user={marginUserPct}
        ideal={marginIdealPct}
      />
      <MetricCard
        title="Efisiensi Biaya"
        user={efisiensiUserPct}
        ideal={efisiensiIdealPct}
      />
      <MetricCard
        title="Pertumbuhan (6 bulan)"
        user={pertumbuhanUserPct}
        ideal={pertumbuhanIdealPct}
      />
      <MetricCard
        title="Kesiapan Channel"
        user={channelUserPct}
        ideal={channelIdealPct}
      />
    </div>
  );
}

