"use client";

import { useState } from "react";
import { MOCK_OTP } from "@/lib/mockApi";

/**
 * Persistent "Demo" badge shown on every screen. Makes the frontend-only
 * scope explicit so mocked behavior (OTP email, profile submissions)
 * is never mistaken for a broken backend.
 */
export default function DemoBadge() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="About this demo"
        className="fixed bottom-20 right-3 z-[70] flex items-center gap-1.5 rounded-full border border-[#8B5CF6]/50 bg-[#12081F]/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#A78BFA] shadow-lg backdrop-blur transition-colors hover:text-white sm:right-[calc(50%-210px+12px)]"
      >
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
        Demo
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-label="About this demo"
            className="w-full max-w-[420px] rounded-t-2xl bg-[#161616] px-5 pb-8 pt-3 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div aria-hidden className="mx-auto mb-4 h-1 w-10 rounded-full bg-neutral-600" />
            <div className="flex items-center justify-between">
              <h2 className="text-[19px] font-bold uppercase tracking-wide">
                Frontend-only demo
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <ul className="mt-4 flex flex-col gap-3 text-[14px] leading-relaxed text-neutral-300">
              <li className="flex gap-2.5">
                <span aria-hidden>🎨</span>
                <span>
                  This is a <span className="font-semibold text-white">frontend
                  replication</span> of the Extroverts app&apos;s signup wizard —
                  built for a technical assessment. <span className="font-semibold
                  text-white">No backend, no database.</span>
                </span>
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden>✉️</span>
                <span>
                  No real emails are sent. The OTP &quot;email&quot; arrives as a
                  simulated notification — the code is always{" "}
                  <span className="rounded bg-[#2E2E60] px-1.5 py-0.5 font-mono font-bold text-white">
                    {MOCK_OTP}
                  </span>
                  . (The real app sends it via Appwrite.)
                </span>
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden>⏳</span>
                <span>
                  Network calls are simulated with ~1.2s latency to demo loading
                  states. Type <span className="font-mono font-semibold text-white">fail</span>{" "}
                  in any wizard field to trigger the error-toast flow.
                </span>
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden>📍</span>
                <span>
                  Geolocation is the one real browser API used — everything else
                  is an honest mock.
                </span>
              </li>
            </ul>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 h-[52px] w-full rounded-lg bg-white text-[15px] font-semibold uppercase tracking-wide text-black transition-colors hover:bg-neutral-200"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
