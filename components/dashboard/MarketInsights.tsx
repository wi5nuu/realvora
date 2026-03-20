"use client";

import { TrendingUp, TrendingDown, AlertCircle, BarChart3, ChevronRight } from "lucide-react";

const INSIGHTS = [
  {
    id: 1,
    type: "positive",
    title: "Sektor dengan Pertumbuhan Tercepat",
    description: "F&B (Khususnya Kopi Susu & Cemilan Pedas) mencatat kenaikan rata-rata transaksi harian sebesar +14% bulan ini.",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    id: 2,
    type: "info",
    title: "Tren Adopsi Digital",
    description: "Penggunaan platform e-commerce & Live Streaming terbukti meningkatkan margin UMKM Retail Fashion hingga 22% pada kuartal terakhir.",
    icon: BarChart3,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    id: 3,
    type: "warning",
    title: "Peringatan Persaingan (Red Ocean)",
    description: "Sektor Jasa Cuci Sepatu di area perkotaan memiliki tingkat kejenuhan tinggi. Rekomendasi: Fokus pada loyalitas pelanggan (Promo Langganan).",
    icon: AlertCircle,
    color: "text-amber-600",
    bg: "bg-amber-50"
  }
];

export function MarketInsights() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            Pintar Pasar (Market Insights)
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Data tren UMKM terbaru bulan ini berbasis agregat industri.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {INSIGHTS.map((insight) => {
          const Icon = insight.icon;
          return (
            <div key={insight.id} className="flex gap-4 p-4 rounded-md bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className={`mt-0.5 w-10 h-10 shrink-0 rounded-md flex items-center justify-center ${insight.bg} ${insight.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{insight.title}</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-md transition-colors">
        Lihat Laporan Lengkap <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
