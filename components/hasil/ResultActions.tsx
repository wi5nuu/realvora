"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase/client";

export function ResultActions({ diagnosisId }: { diagnosisId: string }) {
  const router = useRouter();
  const [session, setSession] = React.useState<any>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  const canUseUserActions = !!session;

  const onShare = async () => {
    try {
      const url = `${window.location.origin}/hasil/${diagnosisId}`;
      await navigator.clipboard.writeText(url);
      toast.success("Link berhasil disalin!");
    } catch (_e) {
      toast.error("Gagal menyalin link.");
    }
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-3 md:flex md:items-center md:justify-between">
        {canUseUserActions ? (
          <button
            type="button"
            onClick={() => toast.success("Hasil sudah tersimpan.")}
            className="h-11 md:h-12 rounded-md bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-semibold shadow-sm shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all px-5"
          >
            💾 Simpan Hasil
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => router.push("/diagnosis")}
          className="h-11 md:h-12 rounded-md border border-gray-200 bg-white text-gray-900 font-semibold hover:bg-gray-50 active:scale-95 transition-all px-5"
        >
          🔄 Diagnosis Ulang
        </button>

        <button
          type="button"
          onClick={onShare}
          className="h-11 md:h-12 rounded-md border border-gray-200 bg-white text-gray-900 font-semibold hover:bg-gray-50 active:scale-95 transition-all px-5"
        >
          📤 Bagikan
        </button>

        {canUseUserActions ? (
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="h-11 md:h-12 rounded-md bg-gray-900 text-white font-semibold hover:bg-gray-800 active:scale-95 transition-all px-5"
          >
            📊 Dashboard
          </button>
        ) : null}
      </div>
    </div>
  );
}

