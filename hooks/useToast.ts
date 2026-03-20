"use client";

import * as React from "react";
import toast from "react-hot-toast";

export function useToast() {
  return React.useCallback((msg: string) => toast(msg), []);
}

export function toastError(title?: string, message?: string) {
  toast.error(title ? `${title}: ${message ?? ""}` : message ?? "Terjadi kesalahan");
}

