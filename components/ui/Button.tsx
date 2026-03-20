import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonOwnProps = {
  variant?: "primary" | "secondary";
  className?: string;
};

type ButtonProps<TAs extends React.ElementType> = ButtonOwnProps &
  Omit<React.ComponentPropsWithoutRef<TAs>, keyof ButtonOwnProps>;

export const Button = React.forwardRef(function Button<
  TAs extends React.ElementType = "button",
>(
  { as, className, variant = "primary", disabled, ...props }: ButtonProps<TAs> & { as?: TAs },
  ref: React.ForwardedRef<any>,
) {
  const Component = (as ?? "button") as React.ElementType;

  return (
    <Component
      ref={ref}
      disabled={disabled}
      className={twMerge(
        clsx(
          "min-h-11 inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-all",
          "hover:scale-105 active:scale-95",
          disabled && "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100",
          variant === "primary" &&
            "bg-gradient-to-r from-indigo-600 to-emerald-500 text-white shadow-sm shadow-indigo-500/25 hover:from-indigo-500 hover:to-emerald-400",
          variant === "secondary" &&
            "border border-white/20 bg-transparent text-white hover:bg-white/10",
        ),
        className,
      )}
      {...props}
    />
  );
});


