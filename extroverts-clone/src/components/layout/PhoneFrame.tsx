import React from "react";

/**
 * Constrains all screens to a phone-like max width, centered on
 * tablet/desktop so the app never stretches edge-to-edge.
 */
export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh justify-center bg-bg-base">
      <div className="relative flex min-h-dvh w-full max-w-[420px] flex-col px-5 sm:border-x sm:border-border-default/60">
        {children}
      </div>
    </div>
  );
}
