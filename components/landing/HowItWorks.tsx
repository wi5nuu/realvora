import { Badge } from "@/components/ui/Badge";

export function HowItWorks() {
  const steps = [
    {
      title: "📋 Isi Form Bisnis",
      desc: "Jawab 10 pertanyaan simpel tentang bisnis Anda. Butuh sekitar 5 menit. Tidak perlu data akuntansi rumit.",
      tone: "indigo",
    },
    {
      title: "🤖 AI Menganalisis",
      desc: "Realvora AI membandingkan data bisnismu dengan benchmark 50+ jenis usaha di Indonesia secara real-time.",
      tone: "emerald",
    },
    {
      title: "📊 Dapat Raport Bisnis",
      desc: "Terima Business Health Score, 3 diagnosis masalah, dan 5 rekomendasi aksi yang bisa dimulai hari ini.",
      tone: "purple",
    },
  ] as const;

  return (
    <section
      id="cara-kerja"
      className="bg-gray-50 py-16 md:py-28 px-4"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start gap-3 mb-10">
          <Badge tone="indigo" className="mb-1">
            Cara Kerja
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            3 Langkah Mudah
          </h2>
          <p className="text-gray-600">
            Tidak perlu keahlian akuntansi. Cukup jawab pertanyaan.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:flex items-center gap-8">
            {steps.map((s, idx) => (
              <div
                key={s.title}
                className="flex-1"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="animate-fade-in">
                  <div
                    className="rounded-lg border border-gray-100 bg-white p-6"
                  >
                    <div className="text-lg font-semibold text-gray-900">
                      {s.title}
                    </div>
                    <p className="text-gray-600 mt-2">{s.desc}</p>
                  </div>
                </div>
                {idx < steps.length - 1 ? (
                  <div className="absolute left-1/3 top-1/2 h-px bg-gray-200 w-full" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="md:hidden flex flex-col gap-5">
            {steps.map((s, idx) => (
              <div
                key={s.title}
                className="relative"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute left-2 top-7 h-full w-px bg-indigo-200" />
                <div className="ml-8 animate-fade-in">
                  <div className="rounded-lg border border-gray-100 bg-white p-5 md:p-6 shadow-sm">
                    <div className="text-base md:text-lg font-semibold text-gray-900">
                      {s.title}
                    </div>
                    <p className="text-sm md:text-base text-gray-600 mt-2">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

