"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/Input";

export function StepThree() {
  const { setValue } = useFormContext<any>();

  const channelPenjualan: string[] = useWatch({ name: "channelPenjualan" }) ?? [];
  const transaksiPerHari = useWatch({ name: "transaksiPerHari" });
  const adaPencatatan = useWatch({ name: "adaPencatatan" });
  const statusLegalitas: string[] =
    useWatch({ name: "statusLegalitas" }) ?? [];

  const CHANNELS = [
    { value: "Toko Fisik", label: "🏪 Toko Fisik" },
    { value: "Instagram", label: "📱 Instagram" },
    { value: "TikTok Shop", label: "🎵 TikTok Shop" },
    { value: "Tokopedia", label: "🛍️ Tokopedia" },
    { value: "Shopee", label: "🟠 Shopee" },
    { value: "WhatsApp", label: "💬 WhatsApp" },
    { value: "Website Sendiri", label: "🌐 Website Sendiri" },
    { value: "GoFood/GrabFood", label: "🚗 GoFood/GrabFood" },
    { value: "Lainnya", label: "📦 Lainnya" },
  ];

  const toggleArrayValue = (key: string, value: string) => {
    const arr = (key === "channelPenjualan"
      ? channelPenjualan
      : statusLegalitas) as string[];
    const exists = arr.includes(value);
    const next = exists ? arr.filter((v) => v !== value) : [...arr, value];
    setValue(key, next, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-gray-900">
          Bagaimana Anda berjualan? 📈
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Informasi ini membantu kami analisis strategi penjualan Anda
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">
          Channel penjualan (MULTI-SELECT) *
        </label>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
          {CHANNELS.map((c) => {
            const selected = channelPenjualan.includes(c.value);
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => toggleArrayValue("channelPenjualan", c.value)}
                className={[
                  "min-h-[56px] rounded-lg border px-3 py-3 text-sm font-semibold transition-all active:scale-95",
                  selected
                    ? "bg-indigo-50 border-2 border-indigo-500"
                    : "bg-white border-gray-200 hover:border-indigo-200",
                ].join(" ")}
              >
                {c.label}
              </button>
            );
          })}
        </div>

      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">
          Rata-rata transaksi per hari
        </label>
        <Input
          type="number"
          inputMode="numeric"
          placeholder="Contoh: 15"
          className="mt-2"
          value={transaksiPerHari ?? ""}
          onChange={(e) => {
            const v = Number(e.target.value || 0);
            setValue("transaksiPerHari", v, { shouldValidate: true });
          }}
        />
        <p className="mt-2 text-xs text-gray-500">
          Perkiraan jumlah pembeli/order per hari
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">
          Apakah punya sistem pencatatan keuangan? *
        </label>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { value: "Ya, pakai aplikasi", label: "Ya, pakai aplikasi" },
            {
              value: "Ya, manual/buku",
              label: "Ya, manual/buku",
            },
            { value: "Belum ada", label: "Belum ada" },
          ].map((r) => {
            const selected = adaPencatatan === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() =>
                  setValue("adaPencatatan", r.value, { shouldValidate: true })
                }
                className={[
                  "min-h-[56px] rounded-lg border px-3 py-3 text-sm font-semibold transition-all active:scale-95",
                  selected
                    ? "bg-indigo-50 border-2 border-indigo-500"
                    : "bg-white border-gray-200 hover:border-indigo-200",
                ].join(" ")}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">
          Status legalitas (opsional, multi)
        </label>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Punya NPWP",
            "Punya NIB/SIUP",
            "Sudah halal certified",
            "Tidak ada",
          ].map((v) => {
            const selected = statusLegalitas.includes(v);
            return (
              <button
                key={v}
                type="button"
                onClick={() => toggleArrayValue("statusLegalitas", v)}
                className={[
                  "min-h-[56px] rounded-lg border px-3 py-3 text-sm font-semibold transition-all active:scale-95 text-left",
                  selected
                    ? "bg-indigo-50 border-2 border-indigo-500"
                    : "bg-white border-gray-200 hover:border-indigo-200",
                ].join(" ")}
              >
                {v}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

