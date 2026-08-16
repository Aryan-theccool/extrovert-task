"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "@/components/layout/PhoneFrame";
import HomeFeed from "@/components/home/HomeFeed";
import Logo from "@/components/ui/Logo";

/**
 * Landing mechanism replicated from the reference app:
 * 1. Brief black splash with the "E·" logo.
 * 2. Locked (guest) home feed — browsable, but any Join-style action
 *    opens the "YOU NEED AN ACCOUNT" bottom sheet.
 * 3. GET STARTED → Terms & Conditions → signup wizard.
 */
export default function LandingPage() {
  const router = useRouter();
  const [splash, setSplash] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 1400);
    return () => clearTimeout(t);
  }, []);

  if (splash) {
    return (
      <PhoneFrame>
        <main className="flex flex-1 items-center justify-center">
          <div className="animate-pop-in">
            <Logo size={72} />
          </div>
        </main>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <HomeFeed member={null} onJoin={() => setModalOpen(true)} />

      {/* YOU NEED AN ACCOUNT bottom sheet */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70"
          onClick={() => setModalOpen(false)}
        >
          <div
            role="dialog"
            aria-label="You need an account"
            className="w-full max-w-[420px] rounded-t-2xl bg-[#161616] px-5 pb-8 pt-3 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div aria-hidden className="mx-auto mb-4 h-1 w-10 rounded-full bg-neutral-500" />
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-bold uppercase tracking-wide">
                You need an account
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="mt-4 text-center text-[15px] leading-relaxed text-neutral-300">
              Create an account to join events, earn HVTs, and party with
              extroverts near you- all for free!
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => router.push("/terms")}
                className="h-[52px] w-full rounded-lg bg-white text-[15px] font-semibold uppercase tracking-wide text-black transition-colors hover:bg-neutral-200"
              >
                Get Started
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="h-[52px] w-full rounded-lg border border-neutral-600 text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-900"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
