"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";

export function Slider({
  value,
  onChange,
  min,
  max,
  step,
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  className?: string;
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step ?? 1000}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={twMerge(
        "w-full accent-indigo-600 cursor-pointer h-6",
        className,
      )}
      aria-label="slider"
    />
  );
}

