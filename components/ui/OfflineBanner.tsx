"use client";

import * as React from "react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="sticky top-0 z-50 bg-danger text-white text-sm py-2 px-4 border-b border-white/20">
      Anda sedang offline. Periksa koneksi internet Anda, lalu coba lagi.
    </div>
  );
}

