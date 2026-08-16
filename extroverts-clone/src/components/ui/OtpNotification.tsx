"use client";

import { useEffect, useState } from "react";
import { MOCK_OTP } from "@/lib/mockApi";

interface Props {
  email: string;
  /** ms after mount before the notification slides in (simulated delivery) */
  delay?: number;
}

/**
 * Simulated email notification that slides in like a phone push
 * notification, showing the OTP "sent" to the user's inbox — mirrors
 * the Appwrite verification email in the reference app, and lets a
 * demo viewer discover the code without reading docs.
 */
export default function OtpNotification({ email, delay = 1600 }: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  // Auto-hide after a while, but keep it re-openable
  useEffect(() => {
    if (!visible || dismissed) return;
    const t = setTimeout(() => setDismissed(true), 12000);
    return () => clearTimeout(t);
  }, [visible, dismissed]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(MOCK_OTP);
    } catch {
      /* clipboard unavailable — user can read the code anyway */
    }
  };

  return (
    <>
      {/* Slide-in notification */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 top-3 z-[60] w-[calc(100%-24px)] max-w-[400px] -translate-x-1/2 transition-all duration-500 ${
          visible && !dismissed
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-6 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-neutral-700 bg-[#1C1C1E]/95 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between px-4 pt-3">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#EA4335] text-[10px] font-bold text-white">
                M
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                Mail · now · simulated (frontend-only demo)
              </span>
            </div>
            <button
              aria-label="Dismiss notification"
              onClick={() => setDismissed(true)}
              className="p-1 text-neutral-500 hover:text-white"
            >
              ✕
            </button>
          </div>
          <button onClick={copyCode} className="w-full px-4 pb-3.5 pt-1.5 text-left">
            <p className="text-[14px] font-semibold text-white">
              OTP for Extroverts Login
            </p>
            <p className="mt-0.5 truncate text-[12px] text-neutral-400">
              To: {email}
            </p>
            <p className="mt-1.5 text-[13px] leading-snug text-neutral-300">
              Your verification code is{" "}
              <span className="rounded bg-[#2E2E60] px-2 py-0.5 font-mono text-[15px] font-bold tracking-[0.2em] text-white">
                {MOCK_OTP}
              </span>{" "}
              <span className="text-neutral-500">(tap to copy)</span>
            </p>
          </button>
        </div>
      </div>

      {/* Re-open pill once dismissed */}
      {dismissed && (
        <button
          onClick={() => {
            setDismissed(false);
            setVisible(true);
          }}
          className="fixed right-4 top-3 z-[60] flex items-center gap-1.5 rounded-full border border-neutral-700 bg-[#1C1C1E]/95 px-3 py-1.5 text-xs font-medium text-neutral-300 shadow-lg backdrop-blur hover:text-white"
        >
          ✉️ View email
        </button>
      )}
    </>
  );
}
