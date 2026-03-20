import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HealthScoreRing } from "@/components/hasil/HealthScoreRing";

export function Hero() {
  return (
    <section className="relative bg-[var(--bg-dark-base)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-indigo-600 blur-3xl opacity-[0.15] animate-pulse-slow"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="absolute top-24 left-1/3 w-72 h-72 rounded-full bg-emerald-500 blur-3xl opacity-[0.15] animate-pulse-slow"
          style={{ animationDelay: "400ms" }}
        />
        <div
          className="absolute bottom-0 -right-24 w-80 h-80 rounded-full bg-purple-600 blur-3xl opacity-[0.15] animate-pulse-slow"
          style={{ animationDelay: "800ms" }}
        />
      </div>

      <div className="mx-auto max-w-7xl pt-24 pb-12 px-4 lg:pt-32 lg:pb-20 lg:px-8 relative">
        <div className="min-h-screen flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-5">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium animate-fade-in">
                  ✨ Platform AI #1 untuk UMKM Indonesia
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-display leading-tight text-white animate-slide-up"
                style={{ animationDelay: "100ms" }}
              >
                Diagnosis Bisnis Anda
                <br />
                Dalam{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
                  5 Menit
                </span>
              </h1>

              <p
                className="mt-4 text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 animate-slide-up"
                style={{ animationDelay: "200ms" }}
              >
                Realvora menggunakan kecerdasan buatan untuk menganalisis{" "}
                kesehatan bisnis UMKM Anda dan memberikan rekomendasi konkret
                yang bisa langsung diimplementasikan hari ini.
              </p>

              <div
                className="mt-8 flex flex-col items-stretch gap-3 md:gap-4 md:flex-row md:justify-center lg:justify-start animate-slide-up"
                style={{ animationDelay: "300ms" }}
              >
                <Link href="/diagnosis" className="w-full md:w-auto">
                  <Button className="w-full md:w-auto px-6 py-3 md:px-8 md:py-4 rounded-md">
                    Mulai Diagnosis Gratis →
                  </Button>
                </Link>
                <Link href="/#demo" className="w-full md:w-auto">
                  <Button
                    variant="secondary"
                    className="w-full md:w-auto px-6 py-3 md:px-8 md:py-4 rounded-md border border-white/20 text-white bg-transparent hover:bg-white/10"
                  >
                    Lihat Demo ↓
                  </Button>
                </Link>
              </div>

              
            </div>

            <div className="hidden md:block w-full lg:w-[520px]">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600/10 to-emerald-500/10 rounded-lg blur-xl" />

                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-center">
                    <HealthScoreRing
                      score={78}
                      ringSummary="Margin cukup kuat, tapi efisiensi biaya masih bisa ditingkatkan."
                    />
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { label: "Margin", value: "28%" },
                      { label: "Efisiensi", value: "76%" },
                      { label: "Channel", value: "+18%" },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg bg-white/5 border border-white/10 p-3"
                      >
                        <div className="text-sm text-gray-200">
                          {m.label}
                        </div>
                        <div className="text-xl font-display font-bold text-white mt-1">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="demo" className="sr-only" />
        </div>
      </div>
    </section>
  );
}

