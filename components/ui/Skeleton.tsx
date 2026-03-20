import * as React from "react";
import { twMerge } from "tailwind-merge";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        "animate-pulse rounded-md bg-gray-200/70 dark:bg-white/10",
        className,
      )}
    />
  );
}

