import * as React from "react";
import { twMerge } from "tailwind-merge";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        "rounded-lg border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

