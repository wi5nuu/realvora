"use client";

import * as React from "react";

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~339

function getTone(score: number) {
  if (score <= 39) {
    return { stroke: "#EF4444", status: "KRITIS ⚠️" };
  }
  if (score <= 59) {
    return { stroke: "#F59E0B", status: "PERLU PERHATIAN 🔶" };
  }
  if (score <= 79) {
    return { stroke: "#3B82F6", status: "CUKUP SEHAT 🔵" };
  }
  return { stroke: "#10B981", status: "SANGAT SEHAT 💚" };
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export type HealthScoreRingProps = {
  score: number;
  ringSummary?: string;
  size?: "sm" | "md";
};

export function HealthScoreRing({
  score,
  ringSummary,
  size = "md",
}: HealthScoreRingProps) {
  const target = clamp(Math.round(score), 0, 100);
  const tone = getTone(target);

  const [displayScore, setDisplayScore] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1500;
    const from = 0;
    const to = target;

    const tick = (now: number) => {
      const t = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayScore(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  const offset = CIRCUMFERENCE - (target / 100) * CIRCUMFERENCE;

  const containerSize = size === "sm" ? 160 : 200;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        style={{ width: containerSize, height: containerSize }}
      >
        <svg
          className="absolute inset-0"
          viewBox="0 0 120 120"
          width={containerSize}
          height={containerSize}
        >
          <circle
            cx={60}
            cy={60}
            r={RADIUS}
            stroke="#E5E7EB"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx={60}
            cy={60}
            r={RADIUS}
            stroke={tone.stroke}
            strokeWidth="10"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            style={
              {
                // used by tailwind animation keyframes
                ["--target-offset" as any]: offset,
              } as React.CSSProperties
            }
            className="transition-[stroke-dashoffset] duration-500 animate-progress-ring"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold font-display text-gray-900">
            {displayScore}
          </div>
          <div className="text-xs text-gray-500 font-medium">/100</div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <div className="text-sm font-semibold text-gray-800">{tone.status}</div>
        {ringSummary ? (
          <p className="mt-1 text-xs text-gray-500 leading-relaxed">
            {ringSummary}
          </p>
        ) : null}
      </div>
    </div>
  );
}

