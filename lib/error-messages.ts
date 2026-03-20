export const errorMessages: Record<
  string,
  {
    title: string;
    message: string;
    action?: string;
    showTimer?: boolean;
    showRetry?: boolean;
    severity?: "warning" | "danger" | "info";
  }
> = {
  RATE_LIMIT: {
    title: "Batas diagnosis harian tercapai",
    message:
      "Anda sudah melakukan 5 diagnosis hari ini. Kembali besok untuk diagnosis gratis berikutnya.",
    showTimer: true,
    action: "Daftar akun untuk lebih banyak diagnosis",
  },
  TIMEOUT: {
    title: "Analisis memakan waktu lebih lama",
    message: "AI sedang sibuk. Coba lagi dalam beberapa detik.",
    action: "Coba Lagi",
    showRetry: true,
  },
  GEMINI_ERROR: {
    title: "Layanan AI sementara tidak tersedia",
    message: "Coba lagi dalam beberapa menit.",
    action: "Coba Lagi",
    showRetry: true,
  },
  DB_ERROR: {
    title: "Hasil tidak tersimpan",
    message:
      "Hasil analisis ditampilkan tapi tidak tersimpan karena koneksi bermasalah.",
    severity: "warning",
  },
  OFFLINE: {
    title: "Anda sedang offline",
    message: "Periksa koneksi internet Anda, lalu coba lagi.",
  },
  FORM_INCOMPLETE: {
    title: "Form belum lengkap",
    message: "Isi semua field yang wajib sebelum lanjut.",
  },
  AUTH_REQUIRED: {
    title: "Login diperlukan",
    message: "Fitur ini memerlukan akun. Daftar gratis sekarang.",
  },
  NOT_FOUND: {
    title: "Hasil tidak ditemukan",
    message: "Link mungkin sudah kedaluwarsa atau tidak valid.",
  },
};

