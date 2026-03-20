// Benchmark sederhana (placeholder) untuk 8 kategori industri.
// Format teks ini dipakai sebagai konteks prompt Gemini.

export type BenchmarkMetric = {
  marginIdeal: number; // persen
  efisiensiIdeal: number; // persen (indikasi biaya)
  pertumbuhanIdeal: number; // persen (6 bulan)
  channelIdeal: string;
};

export const benchmarkData: Record<string, BenchmarkMetric> = {
  KULINER: {
    marginIdeal: 28,
    efisiensiIdeal: 75,
    pertumbuhanIdeal: 22,
    channelIdeal: "Toko fisik + delivery (GoFood/GrabFood) + Instagram/TikTok",
  },
  FASHION: {
    marginIdeal: 30,
    efisiensiIdeal: 72,
    pertumbuhanIdeal: 26,
    channelIdeal: "Marketplace + Instagram + TikTok Shop",
  },
  RETAIL: {
    marginIdeal: 25,
    efisiensiIdeal: 70,
    pertumbuhanIdeal: 18,
    channelIdeal: "Marketplace + WhatsApp katalog + toko fisik",
  },
  JASA: {
    marginIdeal: 35,
    efisiensiIdeal: 78,
    pertumbuhanIdeal: 20,
    channelIdeal: "Google Maps/SEO lokal + WhatsApp + konten edukasi",
  },
  TEKNOLOGI: {
    marginIdeal: 40,
    efisiensiIdeal: 82,
    pertumbuhanIdeal: 30,
    channelIdeal: "Website + outbound + LinkedIn/TikTok konten",
  },
  PERTANIAN: {
    marginIdeal: 20,
    efisiensiIdeal: 68,
    pertumbuhanIdeal: 15,
    channelIdeal: "Offline kemitraan + marketplace hasil panen",
  },
  KERAJINAN: {
    marginIdeal: 26,
    efisiensiIdeal: 71,
    pertumbuhanIdeal: 19,
    channelIdeal: "Instagram + website + marketplace produk",
  },
  LAINNYA: {
    marginIdeal: 25,
    efisiensiIdeal: 70,
    pertumbuhanIdeal: 18,
    channelIdeal: "Multi-channel (online + offline) sesuai target",
  },
};

function normalizeJenisUsaha(jenisUsaha: string) {
  const j = (jenisUsaha || "").toLowerCase();
  if (j.includes("kuliner") || j.includes("makanan") || j.includes("minuman"))
    return "KULINER";
  if (j.includes("fashion") || j.includes("pakaian")) return "FASHION";
  if (j.includes("retail") || j.includes("toko") || j.includes("dagangan"))
    return "RETAIL";
  if (j.includes("jasa")) return "JASA";
  if (j.includes("teknologi") || j.includes("digital") || j.includes("coding"))
    return "TEKNOLOGI";
  if (j.includes("pertanian") || j.includes("perkebunan")) return "PERTANIAN";
  if (j.includes("kerajinan") || j.includes("handmade")) return "KERAJINAN";
  return "LAINNYA";
}

export function getBenchmarkText(jenisUsaha: string): string {
  const key = normalizeJenisUsaha(jenisUsaha);
  const b = benchmarkData[key];

  return `
- Margin keuntungan ideal: ${b.marginIdeal}%
- Efisiensi biaya ideal (indikasi: biaya terhadap omset): ${b.efisiensiIdeal}%
- Pertumbuhan omset ideal (6 bulan): ${b.pertumbuhanIdeal}%
- Channel penjualan yang umum menang: ${b.channelIdeal}
`.trim();
}

