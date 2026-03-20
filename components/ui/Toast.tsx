"use client";

import { Toaster } from "react-hot-toast";

export function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          fontSize: 14,
        },
      }}
    />
  );
}

