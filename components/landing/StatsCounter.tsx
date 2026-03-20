"use client";

import * as React from "react";
import { Building2, TrendingDown, Clock, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";

type Stat = {
  value: number;
  format: (n: number) => string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

function useInView<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  threshold = 0.3,
) {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function useCountUp(target: number, startWhen: boolean, durationMs = 1200) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (!startWhen) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, startWhen, durationMs]);
  return value;
}

function StatItem({
  s,
  idx,
  inView,
}: {
  s: Stat;
  idx: number;
  inView: boolean;
}) {
  const anim = useCountUp(s.value, inView, 1300);
  const formatted =
    s.value === 100 ? s.format(s.value) : s.format(anim);
  const Icon = s.icon;

  return (
    <div className="text-center">
      <div
        className="p-4 rounded-md transition-colors hover:bg-indigo-50"
        style={{ transitionDelay: `${idx * 60}ms` }}
      >
        <Icon className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
        <div className="text-3xl md:text-4xl font-bold font-display text-indigo-600">
          {formatted}
        </div>
        <div className="text-sm text-gray-500 mt-1">{s.label}</div>
      </div>
    </div>
  );
}

export function StatsCounter() {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef);

  const stats: Stat[] = [
    {
      value: 66,
      format: (n) => `${n} Juta`,
      label: "UMKM di Indonesia",
      icon: Building2,
    },
    {
      value: 60,
      format: (n) => `${n}%`,
      label: "Tutup dalam 3 tahun pertama",
      icon: TrendingDown,
    },
    {
      value: 5,
      format: (n) => `${n} Menit`,
      label: "Waktu diagnosis Realvora",
      icon: Clock,
    },
    {
      value: 100,
      format: (_n) => "Gratis",
      label: "Tidak perlu kartu kredit",
      icon: Sparkles,
    },
  ];

  return (
    <section
      className="bg-white border-t-4 border-t-indigo-600 py-16 px-4 md:py-20"
    >
      <div ref={wrapperRef} className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, idx) => (
            <StatItem key={s.label} s={s} idx={idx} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

