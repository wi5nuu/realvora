"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { StepOne } from "@/components/diagnosis/StepOne";
import { StepTwo } from "@/components/diagnosis/StepTwo";
import { StepThree } from "@/components/diagnosis/StepThree";
import { StepFour } from "@/components/diagnosis/StepFour";
import { LoadingAnalysis } from "@/components/diagnosis/LoadingAnalysis";

import { errorMessages } from "@/lib/error-messages";

const schema = z
  .object({
    // Step 1
    namaUsaha: z.string().min(2, "Nama usaha wajib diisi"),
    jenisUsaha: z.string().min(1, "Jenis usaha wajib diisi"),
    usiaUsaha: z.string().min(1, "Usia usaha wajib diisi"),
    lokasi: z.string().min(1, "Provinsi wajib diisi"),
    jumlahKaryawan: z.string().min(1, "Jumlah karyawan wajib diisi"),

    // Step 2
    omset: z.number().min(0),
    biayaOperasional: z.number().min(0),
    modalAwal: z.number().min(0).optional(),
    sudahProfit: z.boolean(),
    lamaBelumProfit: z.string().optional(),
    adaHutangUsaha: z.boolean(),
    hutangUsaha: z.number().min(0),

    // Step 3
    channelPenjualan: z.array(z.string()).min(1, "Pilih minimal 1 channel"),
    transaksiPerHari: z.number().min(0).optional(),
    adaPencatatan: z.string().min(1, "Pilih sistem pencatatan"),
    statusLegalitas: z.array(z.string()).optional(),

    // Step 4
    kendalaUtama: z
      .array(z.string())
      .min(1, "Pilih minimal 1 kendala")
      .max(3, "Pilih maksimal 3 kendala utama"),
    target: z.string().min(20, "Target minimal 20 karakter").max(250),
    skorKepuasan: z.number().min(1).max(10),
  })
  .superRefine((data, ctx) => {
    if (!data.sudahProfit) {
      if (!data.lamaBelumProfit || data.lamaBelumProfit.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["lamaBelumProfit"],
          message: "Isi berapa lama belum profit",
        });
      }
    }
    if (data.adaHutangUsaha) {
      if (data.hutangUsaha <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["hutangUsaha"],
          message: "Jumlah hutang wajib > 0",
        });
      }
    }
  });

type FormValues = z.infer<typeof schema>;

function getStepProgress(step: number) {
  return step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : 100;
}

export function StepForm() {
  const router = useRouter();
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = React.useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      // Step 1
      namaUsaha: "",
      jenisUsaha: "",
      usiaUsaha: "",
      lokasi: "",
      jumlahKaryawan: "",

      // Step 2
      omset: 0,
      biayaOperasional: 0,
      modalAwal: 0,
      sudahProfit: true,
      lamaBelumProfit: "",
      adaHutangUsaha: false,
      hutangUsaha: 0,

      // Step 3
      channelPenjualan: [],
      transaksiPerHari: 0,
      adaPencatatan: "",
      statusLegalitas: [],

      // Step 4
      kendalaUtama: [],
      target: "",
      skorKepuasan: 5,
    },
  });

  const { trigger, getValues, handleSubmit } = methods;

  const validateStep = async (s: number) => {
    const fieldsByStep: Record<number, (keyof FormValues)[]> = {
      1: ["namaUsaha", "jenisUsaha", "usiaUsaha", "lokasi", "jumlahKaryawan"],
      2: [
        "omset",
        "biayaOperasional",
        "modalAwal",
        "sudahProfit",
        "lamaBelumProfit",
        "adaHutangUsaha",
        "hutangUsaha",
      ],
      3: ["channelPenjualan", "transaksiPerHari", "adaPencatatan", "statusLegalitas"],
      4: ["kendalaUtama", "target", "skorKepuasan"],
    };
    const ok = await trigger(fieldsByStep[s]);
    return ok;
  };

  const onNext = async () => {
    const ok = await validateStep(step);
    if (!ok) {
      toast.error(errorMessages.FORM_INCOMPLETE.message);
      return;
    }
    setStep((prev) => (prev < 4 ? ((prev + 1) as any) : prev));
  };

  const onPrev = () => setStep((prev) => (prev > 1 ? ((prev - 1) as any) : prev));

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const res = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok || data?.error) {
        const code = data?.error;
        const msg = errorMessages[code];
        toast.error(msg?.message ?? "Terjadi kesalahan. Coba lagi.");
        return;
      }

      if (data?.success) {
        if (data.id === "unsaved") {
          sessionStorage.setItem("unsaved_diagnosis", JSON.stringify(data));
        }
        router.push(`/hasil/${data.id}`);
      } else {
        toast.error("Gagal memproses diagnosis.");
      }
    } catch (_e) {
      toast.error("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <LoadingAnalysis /> : null}
      <FormProvider {...methods}>
        <div className="bg-gray-50 pb-28 md:pb-0">
          <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm -mx-4 px-4 pt-3 pb-2">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={onPrev}
                  className={[
                    "text-sm font-medium text-indigo-700 hover:underline underline-offset-4",
                    step === 1 ? "invisible" : "visible",
                  ].join(" ")}
                >
                  ← Kembali
                </button>
                <div className="text-sm font-display font-semibold text-gray-900">
                  Diagnosis Bisnis
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Step {step} dari 4
                </div>
              </div>
              <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 transition-all duration-500 ease-out"
                  style={{ width: `${getStepProgress(step)}%` }}
                />
              </div>
            </div>

            <div className="mt-6">
              {step === 1 ? <StepOne /> : null}
              {step === 2 ? <StepTwo /> : null}
              {step === 3 ? <StepThree /> : null}
              {step === 4 ? <StepFour /> : null}

              <div className="hidden md:flex items-center justify-between mt-8 gap-4">
                <button
                  type="button"
                  onClick={onPrev}
                  className={[
                    "h-11 min-h-11 px-6 rounded-md border border-gray-200 text-gray-800 font-semibold",
                    step === 1 ? "invisible" : "visible",
                  ].join(" ")}
                >
                  ← Kembali
                </button>
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={onNext}
                    className="h-11 min-h-11 px-8 rounded-md bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-semibold shadow-sm shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all"
                  >
                    Lanjut
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={loading}
                    className="h-11 min-h-11 px-8 rounded-md bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-semibold shadow-sm shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all"
                  >
                    Analisis Bisnisku Sekarang 🚀
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile sticky bottom navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-100 px-4 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
            <div className="flex items-center gap-3">
              {step === 1 ? (
                <div className="flex-1" />
              ) : (
                <button
                  type="button"
                  onClick={onPrev}
                  className="flex-1 h-11 rounded-md border border-gray-200 text-gray-800 font-semibold"
                >
                  ← Kembali
                </button>
              )}
              <button
                type="button"
                onClick={step === 4 ? handleSubmit(onSubmit) : onNext}
                disabled={loading}
                className={[
                  "flex-1 h-11 rounded-md text-white font-semibold shadow-sm shadow-indigo-500/25 transition-all active:scale-95",
                  "bg-gradient-to-r from-indigo-600 to-emerald-500",
                ].join(" ")}
              >
                {step === 4 ? "Analisis Sekarang 🚀" : "Lanjut"}
              </button>
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
}

