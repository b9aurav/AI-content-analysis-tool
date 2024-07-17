"use client";

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <main className="text-foreground bg-background w-screen h-screen overflow-auto">{children}</main>
    </NextUIProvider>
  );
}
