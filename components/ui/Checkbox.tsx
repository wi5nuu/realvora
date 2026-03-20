"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export type CheckboxProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
};

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  className,
}: CheckboxProps) {
  return (
    <label className={twMerge("inline-flex items-center gap-2 cursor-pointer", className)}>
      <input
        type="checkbox"
        className={clsx(
          "w-5 h-5 rounded-md border border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20",
          checked && "bg-indigo-600 border-indigo-600",
        )}
        checked={!!checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
      />
      {label ? <span className="text-sm text-gray-700">{label}</span> : null}
    </label>
  );
}

