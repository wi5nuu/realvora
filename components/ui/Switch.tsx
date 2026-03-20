"use client";

import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function Switch({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <span className="relative inline-flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className="sr-only"
        />
        <span
          className={twMerge(
            clsx(
              "w-12 h-7 rounded-full transition-colors",
              checked ? "bg-emerald-500" : "bg-gray-200",
            ),
          )}
        />
        <span
          className={twMerge(
            clsx(
              "absolute left-1 top-1 w-5 h-5 rounded-full bg-white transition-transform",
              checked && "translate-x-5",
            ),
          )}
        />
      </span>
      {label ? <span className="text-sm text-gray-700">{label}</span> : null}
    </label>
  );
}

