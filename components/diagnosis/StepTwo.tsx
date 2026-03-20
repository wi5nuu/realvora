"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { Switch } from "@/components/ui/Switch";

export function StepTwo() {
  const { register, setValue, watch, formState } = useFormContext<any>();

  const omset = useWatch({ name: "omset" });
  const biayaOperasional = useWatch({ name: "biayaOperasional" });
  const sudahProfit = useWatch({ name: "sudahProfit" });
  const adaHutang = useWatch({ name: "adaHutangUsaha" });
  const hutangUsaha = useWatch({ name: "hutangUsaha" });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-gray-900">
          Data keuangan bisnis Anda 💰
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Data ini digunakan untuk analisis kesehatan finansial. Perkiraan
          sudah cukup, tidak harus tepat.
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">
          Omset rata-rata per bulan *
        </label>
        <div className="mt-3">
          <Slider
            min={0}
            max={500_000_000}
            step={1_000_000}
            value={Number(omset) || 0}
            onChange={(v) => setValue("omset", v, { shouldValidate: true })}
          />
          <div className="flex items-center justify-between mt-2">
            <div className="text-sm font-semibold text-gray-800">
              Rp{" "}
              {Number(omset || 0).toLocaleString("id-ID", {
                maximumFractionDigits: 0,
              })}{" "}
              / bulan
            </div>
          </div>
          <Input
            type="number"
            inputMode="numeric"
            {...register("omset", { valueAsNumber: true })}
            error={!!formState.errors.omset}
            className="mt-3"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { label: "< 5jt", value: 4_000_000 },
              { label: "5-20jt", value: 15_000_000 },
              { label: "20-50jt", value: 35_000_000 },
              { label: "50-100jt", value: 80_000_000 },
              { label: "> 100jt", value: 150_000_000 },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                onClick={() =>
                  setValue("omset", b.value, { shouldValidate: true })
                }
                className="min-h-11 px-4 py-3 rounded-md border border-gray-200 bg-white hover:border-indigo-200 active:scale-95 text-sm font-semibold"
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">
          Total biaya operasional per bulan *
        </label>
        <div className="mt-3">
          <Slider
            min={0}
            max={500_000_000}
            step={1_000_000}
            value={Number(biayaOperasional) || 0}
            onChange={(v) =>
              setValue("biayaOperasional", v, { shouldValidate: true })
            }
          />
          <Input
            type="number"
            inputMode="numeric"
            {...register("biayaOperasional", { valueAsNumber: true })}
            error={!!formState.errors.biayaOperasional}
            className="mt-3"
          />
          <p className="mt-2 text-xs text-gray-500">
            Termasuk sewa, gaji, bahan baku, listrik, dll
          </p>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">
          Modal awal usaha
        </label>
        <Input
          type="number"
          inputMode="numeric"
          placeholder="Rp 0 jika tidak ingat / tidak relevan"
          {...register("modalAwal", { valueAsNumber: true })}
          error={!!formState.errors.modalAwal}
          className="mt-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">
          Status profit saat ini *
        </label>
        <div className="mt-3">
          <Switch
            checked={!!sudahProfit}
            onCheckedChange={(v) => {
              setValue("sudahProfit", v, { shouldValidate: true });
            }}
            label={sudahProfit ? "Sudah Profit ✓" : "Belum Profit ✗"}
          />
        </div>

        {!sudahProfit ? (
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-800">
              Sudah berapa lama belum profit?
            </label>
            <Input
              placeholder="Contoh: 6 bulan"
              {...register("lamaBelumProfit")}
              error={!!formState.errors.lamaBelumProfit}
              className="mt-2"
            />
          </div>
        ) : null}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">
          Ada hutang usaha? *
        </label>
        <div className="mt-3">
          <Switch
            checked={!!adaHutang}
            onCheckedChange={(v) => {
              setValue("adaHutangUsaha", v, { shouldValidate: true });
              if (!v) setValue("hutangUsaha", 0, { shouldValidate: true });
            }}
            label={adaHutang ? "Ya" : "Tidak"}
          />
        </div>

        {!!adaHutang ? (
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-800">
              Jumlah hutang usaha
            </label>
            <Slider
              min={0}
              max={500_000_000}
              step={1_000_000}
              value={Number(hutangUsaha) || 0}
              onChange={(v) => setValue("hutangUsaha", v, { shouldValidate: true })}
              className="mt-3"
            />
            <Input
              type="number"
              inputMode="numeric"
              {...register("hutangUsaha", { valueAsNumber: true })}
              className="mt-3"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

