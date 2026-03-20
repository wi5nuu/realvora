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

const schema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [resetOpen, setResetOpen] = React.useState(false);

  const [resetEmail, setResetEmail] = React.useState("");
  const [resetLoading, setResetLoading] = React.useState(false);

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
      email: "",
      password: "",
      remember: true,
    },
  });

  const remember = watch("remember");

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error("Email atau password salah. Coba lagi.");
        return;
      }

      router.push("/dashboard");
    } catch (_e) {
      toast.error("Email atau password salah. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const onReset = async () => {
    try {
      setResetLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(
        resetEmail,
      );
      if (error) {
        toast.error("Gagal mengirim email reset password.");
        return;
      }
      toast.success("Email reset password sudah dikirim.");
      setResetOpen(false);
    } catch (_e) {
      toast.error("Gagal mengirim email reset password.");
    } finally {
      setResetLoading(false);
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
              Dapatkan diagnosis bisnis UMKM Anda dalam 5 menit.
            </p>
            <div className="mt-10 bg-white/10 border border-white/10 rounded-lg p-6 text-white/90">
              <div className="text-sm font-semibold">Siap Mulai?</div>
              <div className="mt-2 text-2xl font-display font-bold">
                Analisis Gratis
              </div>
              <div className="mt-2 text-sm text-indigo-200">
                Tidak perlu kartu kredit.
              </div>
            </div>
          </div>

          <div className="bg-white px-4 pt-24 pb-8 md:px-10 md:pt-28 md:pb-12">
            <div className="max-w-md mx-auto">
              <h1 className="font-display text-3xl font-bold text-gray-900">
                Masuk
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Selamat datang kembali! Yuk lanjut diagnosis Anda.
              </p>

              <form
                className="mt-8 space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                      placeholder="Password"
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

                  {errors.password ? (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex items-center justify-between">
                  <Checkbox
                    checked={!!remember}
                    onCheckedChange={(v) =>
                      setValue("remember", v, { shouldValidate: true })
                    }
                    label="Ingat saya"
                  />
                </div>

                <Button type="submit" disabled={!isValid || loading} className="w-full mt-2">
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Masuk...
                    </span>
                  ) : (
                    "Masuk"
                  )}
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setResetOpen(true)}
                    className="text-indigo-700 underline underline-offset-4 hover:text-indigo-600"
                  >
                    Lupa password?
                  </button>
                  <Link
                    href="/register"
                    className="text-indigo-700 underline underline-offset-4 hover:text-indigo-600"
                  >
                    Belum punya akun? Daftar gratis
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal open={resetOpen} onOpenChange={setResetOpen} title="Reset Password">
        <div className="space-y-3">
          <Input
            placeholder="Masukkan email Anda"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <Button
            type="button"
            disabled={!resetEmail || resetLoading}
            className="w-full"
            onClick={onReset}
          >
            {resetLoading ? "Mengirim..." : "Kirim Email Reset"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

