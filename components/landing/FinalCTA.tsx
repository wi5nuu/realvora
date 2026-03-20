import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-emerald-900 py-16 md:py-24 px-4">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="font-display text-white text-3xl md:text-5xl font-bold">
          Sudah Siap Diagnosis Bisnis Anda?
        </h2>
        <p className="mt-4 text-indigo-200">
          Gratis. 5 Menit. Hasilnya langsung bisa dijalankan.
        </p>

        <div className="mt-8 flex justify-center">
          <Link href="/diagnosis" className="w-full">
            <div
              className="w-full md:w-auto px-8 py-4 md:px-10 md:py-5 text-base md:text-lg rounded-md bg-white text-indigo-700 hover:bg-indigo-50
                         font-semibold transition-all hover:scale-105 active:scale-95 text-center cursor-pointer"
            >
              Mulai Diagnosis Gratis Sekarang →
            </div>
          </Link>
        </div>

        <div className="mt-4 text-sm text-indigo-300">
          Tidak perlu daftar. Langsung bisa mulai.
        </div>
      </div>
    </section>
  );
}

