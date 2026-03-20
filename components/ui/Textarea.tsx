import * as React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={twMerge(
          clsx(
            "w-full rounded-md border bg-white px-4 py-3 text-base outline-none transition-colors min-h-[120px]",
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

