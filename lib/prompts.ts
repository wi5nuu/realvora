export function getDiagnosisPrompt(data: any, benchmark: string): string {
  const omset = Number(data.omset ?? 0);
  const biayaOperasional = Number(data.biayaOperasional ?? 0);

  const marginPersen =
    omset > 0 ? (((omset - biayaOperasional) / omset) * 100).toFixed(1) : "0";

  return `
Anda adalah konsultan bisnis senior Indonesia dengan 20 tahun pengalaman
membantu UMKM. Analisis data bisnis berikut dengan cermat.

═══════════════════════════════════════
DATA BISNIS:
═══════════════════════════════════════
Nama Usaha    : ${data.namaUsaha}
Jenis Usaha   : ${data.jenisUsaha}
Usia Usaha    : ${data.usiaUsaha}
Lokasi        : ${data.lokasi}
Karyawan      : ${data.jumlahKaryawan}

KEUANGAN:
Omset/bulan   : Rp ${Number(data.omset).toLocaleString("id-ID")}
Biaya/bulan   : Rp ${Number(data.biayaOperasional).toLocaleString("id-ID")}
Margin saat ini: ${marginPersen}%
Status profit  : ${
    data.sudahProfit ? "Sudah profit" : "Belum profit"
  }
Hutang usaha   : ${
    Number(data.hutangUsaha ?? 0) > 0
      ? "Rp " + Number(data.hutangUsaha).toLocaleString("id-ID")
      : "Tidak ada"
  }

OPERASIONAL:
Channel penjualan : ${Array.isArray(data.channelPenjualan) ? data.channelPenjualan.join(", ") : data.channelPenjualan}
Transaksi/hari    : ${data.transaksiPerHari || "Tidak diisi"}
Pencatatan keuangan: ${data.adaPencatatan}

MASALAH & TARGET:
Kendala utama : ${
    Array.isArray(data.kendalaUtama) ? data.kendalaUtama.join(", ") : data.kendalaUtama
  }
Target 6 bulan: ${data.target}
Kepuasan diri : ${data.skorKepuasan}/10

═══════════════════════════════════════
BENCHMARK INDUSTRI ${String(data.jenisUsaha).toUpperCase()} DI INDONESIA:
═══════════════════════════════════════
${benchmark}

═══════════════════════════════════════
INSTRUKSI:
═══════════════════════════════════════
Berikan analisis mendalam dan kembalikan HANYA JSON valid berikut
(tanpa teks lain, tanpa markdown, tanpa backtick):

{
  "skorTotal": <integer 0-100, perhitungkan semua aspek>,
  "skorKeuangan": <integer 0-100>,
  "skorPertumbuhan": <integer 0-100>,
  "skorOperasional": <integer 0-100>,
  "skorPenjualan": <integer 0-100>,
  "statusKesehatan": <"Kritis" | "Perlu Perhatian" | "Cukup Sehat" | "Sangat Sehat">,
  "ringkasan": "<2-3 kalimat ringkasan kondisi bisnis, SEBUTKAN ANGKA NYATA dari data user>",
  "diagnosis": [
    {
      "judul": "<judul masalah spesifik, max 8 kata>",
      "penjelasan": "<2-3 kalimat penjelasan menggunakan angka dari data user DAN perbandingan benchmark>",
      "dampak": "<1-2 kalimat dampak jika tidak ditangani>",
      "severity": <"KRITIS" | "PERLU_PERHATIAN" | "OPTIMASI">
    }
  ],
  "rekomendasi": [
    {
      "judul": "<judul aksi konkret, max 8 kata>",
      "langkah": "<langkah spesifik yang BISA DILAKUKAN HARI INI atau minggu ini, bukan saran umum>",
      "waktu": "<'minggu ini' | 'bulan ini' | '3 bulan ke depan'>",
      "dampak": "<estimasi dampak positif dengan angka jika memungkinkan>",
      "kategori": <"KEUANGAN" | "MARKETING" | "OPERASIONAL" | "DIGITAL">
    }
  ],
  "kalimatMotivasi": "<1 kalimat motivasi personal dan spesifik untuk bisnis ini>"
}

ATURAN KETAT:
- diagnosis: TEPAT 3 item, urut dari paling kritis
- rekomendasi: TEPAT 5 item, urut dari prioritas tertinggi
- Sebutkan angka Rp dan % nyata dari data user di setiap poin
- Bandingkan dengan benchmark yang diberikan
- Bahasa: hangat, mudah dipahami ibu warung, tidak menggurui
- JANGAN gunakan istilah: depresiasi, amortisasi, neraca, EBITDA
- GUNAKAN istilah: keuntungan, modal balik, untung bersih
- Rekomendasi harus KONKRET dan ACTIONABLE bukan "tingkatkan penjualan"
`;
}

