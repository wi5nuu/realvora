"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={twMerge(
          clsx(
            "w-full h-12 min-h-12 rounded-md border bg-white px-4 py-3 text-base outline-none transition-colors",
            "border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
            error && "border-red-500 focus:ring-red-500/20",
          ),
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = "Select";

