"use client";

import * as React from "react";
import { Progress } from "@/components/ui/Progress";

const MESSAGES = [
  "Menganalisis data bisnis Anda...",
  "Membandingkan dengan 50+ benchmark industri Indonesia...",
  "AI sedang membaca pola keuangan bisnis Anda...",
  "Menyiapkan rekomendasi yang personal...",
  "Menghitung Business Health Score Anda...",
  "Hampir selesai, tinggal sebentar lagi...",
];

export function LoadingAnalysis() {
  const [progress, setProgress] = React.useState(0);
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 3000;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(95 * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const msgInterval = window.setInterval(() => {
      setIdx((v) => (v + 1) % MESSAGES.length);
    }, 1800);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(msgInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="w-[92%] max-w-md text-center">
        <div className="text-4xl font-display font-bold text-indigo-600 animate-pulse">
          Realvora
        </div>

        <div className="mt-6">
          <Progress value={progress} />
          <div className="text-sm text-gray-700 mt-2 font-semibold">
            {progress}%{" "}
          </div>
        </div>

        <div
          className="mt-6 text-gray-800 text-sm leading-relaxed transition-opacity duration-300"
        >
          {MESSAGES[idx]}
        </div>

        <div className="mt-6 text-xs text-gray-500">
          Rata-rata waktu analisis: 5-10 detik
        </div>
      </div>
    </div>
  );
}

