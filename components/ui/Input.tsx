import * as React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
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
      />
    );
  },
);

