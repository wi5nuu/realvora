"use client";

import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

type FormValues = {
  namaUsaha: string;
  jenisUsaha: string;
  usiaUsaha: string;
  lokasi: string;
  jumlahKaryawan: string;
};

const PROVINCES = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Jambi",
  "Sumatera Selatan",
  "Bengkulu",
  "Lampung",
  "Kepulauan Bangka Belitung",
  "Kepulauan Riau",
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Banten",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Sulawesi Tengah",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Gorontalo",
  "Sulawesi Barat",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
  "Papua Pegunungan",
  "Papua Barat Daya",
  "Papua Selatan",
  "Papua Tengah",
];

export function StepOne() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();

  const jenisOptions = useMemo(
    () => [
      { value: "Kuliner", label: "🍽️ Kuliner (makanan & minuman)" },
      { value: "Fashion", label: "👗 Fashion & Pakaian" },
      { value: "Retail", label: "🛒 Retail & Toko" },
      { value: "Jasa", label: "🔧 Jasa & Layanan" },
      { value: "Teknologi", label: "💻 Teknologi & Digital" },
      { value: "Pertanian", label: "🌾 Pertanian & Perkebunan" },
      { value: "Kerajinan", label: "🎨 Kerajinan & Handmade" },
      { value: "Lainnya", label: "📦 Lainnya" },
    ],
    [],
  );

  const usia = watch("usiaUsaha");
  const karyawan = watch("jumlahKaryawan");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-gray-900">
          Ceritakan bisnis Anda 👋
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Informasi dasar untuk memahami jenis usaha Anda
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">Nama Usaha *</label>
        <Input
          {...register("namaUsaha")}
          placeholder="Contoh: Warung Makan Bu Sari"
          error={!!errors.namaUsaha}
          className="mt-2"
        />
        {errors.namaUsaha ? (
          <p className="mt-2 text-sm text-red-500">
            {String(errors.namaUsaha.message)}
          </p>
        ) : null}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">Jenis Usaha *</label>
        <Select
          {...register("jenisUsaha")}
          error={!!errors.jenisUsaha}
          className="mt-2"
        >
          <option value="">Pilih jenis usaha</option>
          {jenisOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
        {errors.jenisUsaha ? (
          <p className="mt-2 text-sm text-red-500">
            {String(errors.jenisUsaha.message)}
          </p>
        ) : null}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">Usia Usaha *</label>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            { value: "< 1 tahun", label: "< 1 tahun" },
            { value: "1-2 tahun", label: "1-2 tahun" },
            { value: "2-5 tahun", label: "2-5 tahun" },
            { value: "> 5 tahun", label: "> 5 tahun" },
          ].map((o) => {
            const selected = usia === o.value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => setValue("usiaUsaha", o.value, { shouldValidate: true })}
                className={[
                  "min-h-[56px] rounded-lg border px-3 py-3 text-sm font-semibold transition-all active:scale-95",
                  selected
                    ? "bg-indigo-50 border-indigo-500"
                    : "bg-white border-gray-200 hover:border-indigo-200",
                ].join(" ")}
              >
                {o.label}
              </button>
            );
          })}
        </div>
        {errors.usiaUsaha ? (
          <p className="mt-2 text-sm text-red-500">
            {String(errors.usiaUsaha.message)}
          </p>
        ) : null}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">Provinsi *</label>
        <Select {...register("lokasi")} error={!!errors.lokasi} className="mt-2">
          <option value="">Pilih provinsi</option>
          {PROVINCES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
        {errors.lokasi ? (
          <p className="mt-2 text-sm text-red-500">
            {String(errors.lokasi.message)}
          </p>
        ) : null}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">
          Jumlah Karyawan *
        </label>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            { value: "Solo (0)", label: "Solo (0)" },
            { value: "1-5 orang", label: "1-5 orang" },
            { value: "6-10 orang", label: "6-10 orang" },
            { value: "> 10 orang", label: "> 10 orang" },
          ].map((o) => {
            const selected = karyawan === o.value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() =>
                  setValue("jumlahKaryawan", o.value, { shouldValidate: true })
                }
                className={[
                  "min-h-[56px] rounded-lg border px-3 py-3 text-sm font-semibold transition-all active:scale-95",
                  selected
                    ? "bg-indigo-50 border-indigo-500"
                    : "bg-white border-gray-200 hover:border-indigo-200",
                ].join(" ")}
              >
                {o.label}
              </button>
            );
          })}
        </div>
        {errors.jumlahKaryawan ? (
          <p className="mt-2 text-sm text-red-500">
            {String(errors.jumlahKaryawan.message)}
          </p>
        ) : null}
      </div>
    </div>
  );
}

