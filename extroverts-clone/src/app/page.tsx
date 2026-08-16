"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "@/components/layout/PhoneFrame";
import HomeFeed from "@/components/home/HomeFeed";
import Logo from "@/components/ui/Logo";

type Stage = "boot" | "splash" | "location" | "feed";

/**
 * Landing mechanism replicated from the reference app recordings:
 * 1. Boot: black screen, E· logo in a pink/purple gradient circle.
 * 2. Splash: aurora background, "AN APP ONLY FOR EXTROVERTS" + warning
 *    line + CONTINUE.
 * 3. "TRYING TO FETCH YOUR LOCATION..." screen (real Geolocation API,
 *    with a skip affordance added as an improvement).
 * 4. Locked guest home feed — Join-style actions open the
 *    "YOU NEED AN ACCOUNT" bottom sheet.
 */
export default function LandingPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("boot");
  const [modalOpen, setModalOpen] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (stage !== "boot") return;
    const t = setTimeout(() => setStage("splash"), 1300);
    return () => clearTimeout(t);
  }, [stage]);

  const handleEnableLocation = () => {
    setFetching(true);
    if (!navigator.geolocation) {
      setFetching(false);
      setStage("feed");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => setStage("feed"),
      () => setStage("feed"), // denied still proceeds, like the app
      { timeout: 8000 }
    );
  };

  if (stage === "boot") {
    return (
      <PhoneFrame>
        <main className="flex flex-1 items-center justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-gradient-start to-gradient-end shadow-[0_0_80px_rgba(233,30,140,0.45)] animate-pop-in">
            <Logo size={52} />
          </div>
        </main>
      </PhoneFrame>
    );
  }

  if (stage === "splash") {
    return (
      <div className="flex min-h-dvh justify-center bg-bg-base">
        <main
          className="relative flex min-h-dvh w-full max-w-[420px] flex-col items-center justify-end bg-cover bg-center px-5 pb-10 animate-fade-up sm:border-x sm:border-border-default/60"
          style={{ backgroundImage: "url(/assets/splash-bg.jpg)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
          <div className="absolute left-1/2 top-[34%] -translate-x-1/2">
            <Logo size={64} />
          </div>
          <div className="relative z-10 flex w-full flex-col items-center gap-5 text-center">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em]">
                An app only for
              </p>
              <h1 className="text-[30px] font-bold uppercase tracking-[0.06em]">
                Extroverts
              </h1>
            </div>
            <p className="text-xs italic text-neutral-300">
              Warning: Entering may lead to spontaneous dancing and unsolicited
              high-fives!
            </p>
            <button
              onClick={() => setStage("location")}
              className="h-[52px] w-full rounded-lg bg-white text-[15px] font-semibold uppercase tracking-wide text-black transition-colors hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Continue
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (stage === "location") {
    return (
      <PhoneFrame>
        <main className="flex flex-1 flex-col pb-10 pt-8 animate-fade-up">
          <Logo size={44} />
          <p className="mt-10 text-[17px] font-bold uppercase tracking-[0.04em]">
            Trying to fetch your{" "}
            <span className="text-[#8B5CF6]">location</span>
            <span className="animate-pulse">...</span>
          </p>
          <div className="mt-auto flex flex-col gap-3">
            <button
              onClick={handleEnableLocation}
              disabled={fetching}
              className="flex h-[52px] w-full items-center justify-center rounded-lg border border-neutral-500 text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-900 disabled:opacity-60"
            >
              {fetching ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                "Enable Location"
              )}
            </button>
            {/* Improvement: the app gives no way past this screen without answering */}
            <button
              onClick={() => setStage("feed")}
              className="text-sm text-neutral-500 underline-offset-2 hover:text-white hover:underline"
            >
              Skip for now
            </button>
          </div>
        </main>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <HomeFeed
        member={null}
        onJoin={() => setModalOpen(true)}
        activeTab="home"
        onNavigate={(tab) => {
          // Guests hit the account gate on any write-style tab, like the app
          if (tab !== "home") setModalOpen(true);
        }}
      />

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
