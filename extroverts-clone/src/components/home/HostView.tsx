"use client";

import { toast } from "sonner";
import Logo from "@/components/ui/Logo";

const TRENDING = [
  "HRC, IIM Indore, Indore, Madhy...",
  "Hostel Reception Centre (HRC)...",
  "Lotus Hut Cafe, Mahatma Gandhi...",
  "And many more!",
];

/**
 * Create tab — replicates the app's HOST screen: "You haven't been
 * partying enough!" card, CREATE button, RECOMMENDED THEME card and
 * TRENDING LOCATIONS list.
 */
export default function HostView() {
  const notImplemented = () =>
    toast("Event creation is a full product flow — outside the signup-wizard scope.", {
      description: "Included as a visual replica so every tab feels alive.",
    });

  return (
    <div className="flex min-h-dvh flex-col gap-6 pb-28 pt-6 animate-fade-up">
      <header className="flex items-center justify-between">
        <Logo size={36} />
        <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-neutral-300">
          Host
        </span>
      </header>

      {/* Hero card */}
      <div className="rounded-xl border border-neutral-700 bg-[#0E0E0E] px-5 py-6 text-center">
        <h2 className="text-[20px] font-bold">You haven&apos;t been partying enough!</h2>
        <p className="mt-2 text-[13px] text-neutral-400">
          Create up to 3 active parties at once— create more as you complete one.
        </p>
        <button
          onClick={notImplemented}
          className="mt-5 h-[52px] w-full rounded-lg bg-white text-[15px] font-semibold uppercase tracking-wide text-black transition-colors hover:bg-neutral-200"
        >
          Create
        </button>
      </div>

      {/* Recommended theme */}
      <section>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
          Recommended Theme
        </p>
        <button
          onClick={notImplemented}
          className="mt-2 flex w-full items-center justify-between rounded-xl border border-dashed border-neutral-600 px-4 py-5 text-left transition-colors hover:bg-neutral-900"
        >
          <span>
            <span className="text-[17px] font-bold">Tea, Scandals &amp; Secrets</span>
            <span className="mt-1 block text-xs text-neutral-400">
              Gather around for a brew-tiful blend of tea, gossip, and amusement.
              Spill the tea!
            </span>
          </span>
          <span
            aria-hidden
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-600 text-neutral-300"
          >
            ›
          </span>
        </button>
        <p className="mt-2 text-[11px] text-neutral-500">
          About 12 tea events happened in Indore last month!
        </p>
      </section>

      {/* Trending locations */}
      <section>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
          Trending Locations
        </p>
        <div className="mt-2 flex flex-col gap-2.5">
          {TRENDING.map((loc) => (
            <button
              key={loc}
              onClick={notImplemented}
              className="flex items-center justify-between rounded-lg border border-neutral-700 px-4 py-3.5 text-left text-[14px] text-neutral-200 transition-colors hover:bg-neutral-900"
            >
              <span className="truncate pr-2">{loc}</span>
              <span aria-hidden className="shrink-0 text-neutral-500">◎</span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-neutral-500">
          Choose party spots from frequently visited locations in Indore!
        </p>
      </section>
    </div>
  );
}
