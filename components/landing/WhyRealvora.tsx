import { Card } from "@/components/ui/Card";

export function WhyRealvora() {
  const features = [
    {
      icon: "🇮🇩",
      title: "Bahasa Indonesia",
      desc: "Semua output dalam Bahasa Indonesia yang mudah dipahami. Tidak ada istilah akuntansi yang membingungkan.",
      tone: "text-indigo-600",
    },
    {
      icon: "📊",
      title: "Konteks Lokal Indonesia",
      desc: "Dibandingkan dengan benchmark bisnis sejenis di Indonesia, bukan data global yang tidak relevan.",
      tone: "text-emerald-600",
    },
    {
      icon: "⚡",
      title: "5 Menit, 100% Gratis",
      desc: "Tidak perlu registrasi untuk mulai. Tidak perlu kartu kredit. Selamanya gratis untuk diagnosis dasar.",
      tone: "text-purple-600",
    },
    {
      icon: "🤖",
      title: "AI yang Benar-Benar Pintar",
      desc: "Powered by Google Gemini 2.5 Flash. Rekomendasi spesifik berdasarkan data bisnismu, bukan saran generik.",
      tone: "text-indigo-700",
    },
  ];

  return (
    <section id="fitur" className="bg-white py-16 md:py-28 px-4">
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Card
            key={f.title}
            className="p-5 md:p-6 hover:-translate-y-2 hover:shadow-sm hover:border-indigo-200"
          >
            <div className="flex flex-col items-start">
              <div className={`text-4xl md:text-5xl leading-none ${f.tone}`}>{f.icon}</div>
              <h3 className="mt-4 text-base md:text-lg font-display font-semibold text-gray-900">
                {f.title}
              </h3>
              <p className="mt-2 text-xs md:text-sm text-gray-600 leading-relaxed">
                {f.desc}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

