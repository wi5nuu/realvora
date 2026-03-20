"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Slider } from "@/components/ui/Slider";
import { Textarea } from "@/components/ui/Textarea";
import * as React from "react";

const KENDALA = [
  { value: "Kekurangan modal", label: "💸 Kekurangan modal" },
  { value: "Sepi pembeli/pelanggan", label: "👥 Sepi pembeli/pelanggan" },
  { value: "Persaingan ketat", label: "⚔️ Persaingan ketat" },
  { value: "Kesulitan kelola karyawan", label: "👨‍💼 Kesulitan kelola karyawan" },
  { value: "Tidak paham digital", label: "📱 Tidak paham digital" },
  { value: "Masalah cashflow", label: "💰 Masalah cashflow" },
  { value: "Produk kurang dikenal", label: "🔖 Produk kurang dikenal" },
  { value: "Tidak paham laporan keuangan", label: "📊 Tidak paham laporan keuangan" },
  { value: "Produksi tidak efisien", label: "🏭 Produksi tidak efisien" },
  { value: "Masalah stok/inventory", label: "📦 Masalah stok/inventory" },
  { value: "Lainnya", label: "🌐 Lainnya" },
];

const SKOR_LABELS: Record<number, string> = {
  1: "😞 Tidak puas, butuh banyak perbaikan",
  2: "😞 Tidak puas, butuh banyak perbaikan",
  3: "😞 Tidak puas, butuh banyak perbaikan",
  4: "😐 Cukup, tapi masih banyak yang perlu ditingkatkan",
  5: "😐 Cukup, tapi masih banyak yang perlu ditingkatkan",
  6: "😐 Cukup, tapi masih banyak yang perlu ditingkatkan",
  7: "😊 Cukup puas, ingin lebih baik lagi",
  8: "😊 Cukup puas, ingin lebih baik lagi",
  9: "😊 Cukup puas, ingin lebih baik lagi",
  10: "😍 Sangat puas!",
};

export function StepFour() {
  const { setValue, watch } = useFormContext<any>();
  const kendalaUtama: string[] = useWatch({ name: "kendalaUtama" }) ?? [];
  const target: string = useWatch({ name: "target" }) ?? "";
  const skorKepuasan: number = useWatch({ name: "skorKepuasan" }) ?? 5;

  const [warning, setWarning] = React.useState<string | null>(null);

  const toggleKendala = (value: string) => {
    const exists = kendalaUtama.includes(value);
    if (exists) {
      const next = kendalaUtama.filter((v) => v !== value);
      setValue("kendalaUtama", next, { shouldValidate: true });
      setWarning(null);
      return;
    }
    if (kendalaUtama.length >= 3) {
      setWarning("Pilih maksimal 3 kendala utama");
      return;
    }
    const next = [...kendalaUtama, value];
    setValue("kendalaUtama", next, { shouldValidate: true });
    setWarning(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-gray-900">
          Apa yang ingin Anda perbaiki? 🎯
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Ceritakan kendala dan target bisnis Anda
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">
          Kendala terbesar saat ini (MULTI-SELECT, max 3) *
        </label>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
          {KENDALA.map((k) => {
            const selected = kendalaUtama.includes(k.value);
            return (
              <button
                key={k.value}
                type="button"
                onClick={() => toggleKendala(k.value)}
                className={[
                  "min-h-[56px] rounded-lg border px-3 py-3 text-sm font-semibold transition-all active:scale-95 text-left",
                  selected
                    ? "bg-indigo-50 border-2 border-indigo-500"
                    : "bg-white border-gray-200 hover:border-indigo-200",
                ].join(" ")}
              >
                {k.label}
              </button>
            );
          })}
        </div>
        {warning ? (
          <p className="mt-2 text-sm text-amber-700">{warning}</p>
        ) : null}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">
          Target bisnis 6 bulan ke depan *
        </label>
        <div className="mt-2">
          <Textarea
            placeholder="Contoh: Ingin meningkatkan omset 30% dan mulai jualan online di TikTok Shop"
            value={target}
            onChange={(e) => {
              const v = e.target.value.slice(0, 250);
              setValue("target", v, { shouldValidate: true });
            }}
          />
          <div className="mt-2 text-xs text-gray-500 text-right">
            {target.length}/250
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">
          Seberapa puas dengan kondisi bisnis saat ini? *
        </label>
        <div className="mt-4">
          <Slider
            min={1}
            max={10}
            step={1}
            value={skorKepuasan}
            onChange={(v) => setValue("skorKepuasan", v, { shouldValidate: true })}
          />
          <div className="mt-2 text-sm text-gray-700">{SKOR_LABELS[skorKepuasan] ?? ""}</div>
        </div>
      </div>
    </div>
  );
}

