"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

const schema = z
  .object({
    fullName: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Konfirmasi password minimal 8 karakter"),
    agree: z.boolean().refine((v) => v === true, "Wajib menyetujui syarat & ketentuan"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

function getPasswordStrength(password: string) {
  const len = password.length;
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const hasMixed = /[a-z]/.test(password) && /[A-Z]/.test(password);

  if (len < 6) {
    return { percent: 33, label: "Lemah", tone: "bg-red-500" };
  }
  if (len >= 6 && len <= 8 && hasMixed) {
    return { percent: 66, label: "Sedang", tone: "bg-yellow-500" };
  }
  if (len >= 8 && hasNumber && hasSymbol) {
    return { percent: 100, label: "Kuat", tone: "bg-emerald-500" };
  }
  // fallback: jika panjang cukup tapi belum memenuhi kondisi "kuat"
  return { percent: 66, label: "Sedang", tone: "bg-yellow-500" };
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [termsOpen, setTermsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });

  const password = watch("password");
  const strength = getPasswordStrength(password || "");

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: { data: { full_name: values.fullName } },
      });

      if (error) {
        toast.error("Pendaftaran gagal. Email mungkin sudah digunakan.");
        return;
      }

      // Jika project Supabase tidak butuh konfirmasi email, user akan langsung ter-login.
      if (data?.user) {
        router.push("/dashboard");
      } else {
        toast.success("Pendaftaran berhasil! Silakan login.");
        router.push("/login");
      }
    } catch (_e) {
      toast.error("Pendaftaran gagal. Email mungkin sudah digunakan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <div className="flex-1">
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gradient-to-br from-indigo-900 to-emerald-900 px-6 pt-24 pb-12 hidden md:flex flex-col justify-center">
            <div className="text-3xl font-display font-bold bg-gradient-to-r from-indigo-500 to-emerald-300 bg-clip-text text-transparent">
              Realvora
            </div>
            <p className="mt-4 text-indigo-200 text-sm leading-relaxed max-w-md">
              Diagnostik kesehatan bisnis untuk UMKM Indonesia, cepat dan
              gratis.
            </p>
            <ul className="mt-6 space-y-3 text-indigo-100 text-sm">
              <li>1) Business Health Score 0-100</li>
              <li>2) 3 diagnosis masalah utama</li>
              <li>3) 5 rekomendasi aksi konkret</li>
            </ul>
            <div className="mt-10 bg-white/10 border border-white/10 rounded-lg p-6 text-white/90">
              <div className="text-sm font-semibold">Preview Hasil</div>
              <div className="mt-2 text-4xl font-display font-bold">78/100</div>
              <div className="mt-2 text-sm text-indigo-200">
                Ringkasan: margin cukup kuat, efisiensi masih perlu ditingkatkan.
              </div>
            </div>
          </div>

          <div className="bg-white px-4 pt-24 pb-8 md:px-10 md:pt-28 md:pb-12">
            <div className="max-w-md mx-auto">
              <div className="text-center md:text-left">
                <h1 className="font-display text-3xl font-bold text-gray-900">
                  Daftar Gratis
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Buat akun Anda untuk menyimpan hasil diagnosis.
                </p>
              </div>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Input
                    placeholder="Masukkan nama lengkap Anda"
                    {...register("fullName")}
                    error={!!errors.fullName}
                  />
                  {errors.fullName ? (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <Input
                    placeholder="email@contoh.com"
                    type="email"
                    {...register("email")}
                    error={!!errors.email}
                  />
                  {errors.email ? (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <div className="relative">
                    <Input
                      placeholder="Buat password (min. 8 karakter)"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      error={!!errors.password}
                      className="pr-12"
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-gray-100 active:scale-95"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                  </div>

                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Password strength: {strength.label}</span>
                      <span>{strength.percent}%</span>
                    </div>
                    <div className="h-2 mt-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full ${strength.tone}`}
                        style={{ width: `${strength.percent}%` }}
                      />
                    </div>
                  </div>

                  {errors.password ? (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <div className="relative">
                    <Input
                      placeholder="Konfirmasi password"
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      error={!!errors.confirmPassword}
                      className="pr-12"
                    />
                    <button
                      type="button"
                      aria-label="Toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-gray-100 active:scale-95"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword ? (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={watch("agree")}
                    onCheckedChange={(v) => {
                      // Update RHF value
                      setValue("agree", v, { shouldValidate: true });
                    }}
                    label={undefined}
                  />
                  <div className="text-sm text-gray-700 leading-relaxed">
                    <div>
                      Setuju dengan{" "}
                      <button
                        type="button"
                        onClick={() => setTermsOpen(true)}
                        className="text-indigo-700 underline underline-offset-4 hover:text-indigo-600"
                      >
                        Syarat & Ketentuan
                      </button>
                    </div>
                    {errors.agree ? (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.agree.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!isValid || loading}
                  className="w-full mt-2"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Mendaftarkan...
                    </span>
                  ) : (
                    "Daftar Sekarang"
                  )}
                </Button>

                <div className="mt-4 text-sm text-gray-600 text-center">
                  Sudah punya akun?{" "}
                  <Link href="/login" className="text-indigo-700 underline underline-offset-4">
                    Masuk sekarang
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal open={termsOpen} onOpenChange={setTermsOpen} title="Syarat & Ketentuan">
        <p>
          Ini adalah draft untuk kebutuhan lomba. Pastikan untuk menyesuaikan
          detail kebijakan sebelum deploy ke produksi.
        </p>
      </Modal>
    </div>
  );
}

