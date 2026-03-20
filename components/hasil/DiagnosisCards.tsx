export function DiagnosisCards({
  diagnosis,
}: {
  diagnosis: Array<{
    judul: string;
    penjelasan: string;
    dampak: string;
    severity: "KRITIS" | "PERLU_PERHATIAN" | "OPTIMASI";
  }>;
}) {
  const severityStyle = (sev: string) => {
    switch (sev) {
      case "KRITIS":
        return "border-l-4 border-red-500 bg-red-50";
      case "PERLU_PERHATIAN":
        return "border-l-4 border-amber-500 bg-amber-50";
      default:
        return "border-l-4 border-blue-500 bg-blue-50";
    }
  };

  const severityBadge = (sev: string) => {
    switch (sev) {
      case "KRITIS":
        return (
          <span className="inline-flex rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs font-semibold text-red-700">
            KRITIS
          </span>
        );
      case "PERLU_PERHATIAN":
        return (
          <span className="inline-flex rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700">
            PERLU PERHATIAN
          </span>
        );
      default:
        return (
          <span className="inline-flex rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-700">
            OPTIMASI
          </span>
        );
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {diagnosis.map((d) => (
        <div
          key={d.judul}
          className={`rounded-lg border border-gray-100 p-5 ${severityStyle(
            d.severity,
          )}`}
        >
          <div className="flex items-start justify-between gap-3">
            {severityBadge(d.severity)}
            <div className="text-gray-600 font-bold text-lg">{d.severity === "KRITIS" ? "!" : "i"}</div>
          </div>
          <div className="mt-3 text-lg font-display font-semibold text-gray-900">
            {d.judul}
          </div>
          <div className="mt-2 text-sm text-gray-700 leading-relaxed">
            {d.penjelasan}
          </div>
          <div className="mt-3 text-sm text-gray-700">
            <span className="font-semibold">Dampak jika tidak ditangani:</span>{" "}
            {d.dampak}
          </div>
        </div>
      ))}
    </div>
  );
}

