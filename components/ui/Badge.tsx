import * as React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "indigo" | "emerald" | "purple" | "neutral";
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  const toneClasses =
    tone === "indigo"
      ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
      : tone === "emerald"
        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
        : tone === "purple"
          ? "bg-purple-500/10 border border-purple-500/20 text-purple-300"
          : "bg-gray-500/10 border border-gray-500/20 text-gray-500";

  return (
    <span
      className={twMerge(
        clsx("inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium", toneClasses, className),
      )}
      {...props}
    />
  );
}

