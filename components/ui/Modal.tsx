"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";

export function Modal({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        className="absolute inset-0 bg-black/40"
        onClick={() => onOpenChange(false)}
        aria-label="Close modal"
      />

      <div
        className={twMerge(
          "relative mx-auto mt-16 w-[92%] max-w-lg rounded-lg bg-white border border-gray-100 shadow-sm p-5",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            {title ? (
              <h3 className="font-display text-xl font-bold text-gray-900">
                {title}
              </h3>
            ) : null}
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 rounded-md hover:bg-gray-100 active:scale-95 transition-transform"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-700 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

