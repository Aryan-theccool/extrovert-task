"use client";

import { toast } from "sonner";

interface Props {
  name: string;
  username: string;
  pronouns: string;
  age: number | null;
  inviteCode?: string | null;
  onLogout: () => void;
}

/**
 * Profile tab — replicates the app's profile screen top to bottom:
 * big pink initial header, CLUB card, HVT banner, stats row,
 * SUPERLATIVES placeholders, MEMORIES, PASSES, Spotlight for Business
 * and LOG OUT.
 */
export default function ProfileView({
  name,
  username,
  pronouns,
  age,
  inviteCode,
  onLogout,
}: Props) {
  const firstName = (name || "You").split(" ")[0];
  const demoToast = (what: string) =>
    toast(`${what} is a post-onboarding feature — outside the wizard scope.`);

  return (
    <div className="animate-fade-up pb-28">
      {/* Pink header with big initial */}
      <div className="relative -mx-5 flex h-[400px] items-end bg-[#F23D6D] px-5 pb-5">
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-[240px] font-bold leading-none text-black/85"
        >
          {(name || "E").charAt(0).toUpperCase()}
        </span>
        <button
          aria-label="Change photo"
          onClick={() => demoToast("Profile photos")}
          className="absolute bottom-5 right-5 z-10 rounded-lg border border-white/50 p-2 text-white/90 hover:bg-white/10"
        >
          🖼️
        </button>
        <div className="relative z-10">
          <p className="text-[30px] font-bold leading-tight">
            {name || "Extrovert"}{" "}
            {age !== null && (
              <span className="text-xl font-semibold text-white/70">{age}</span>
            )}
          </p>
          <p className="text-[15px] font-medium text-white/85">
            @{username || "member"}{" "}
            <span className="text-[#FFD1E0]">{pronouns}</span>
          </p>
        </div>
      </div>
      <div aria-hidden className="mt-3 text-center text-white/60">•</div>

      {/* Club */}
      <section className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
          Club
        </p>
        <div className="mt-2 flex items-center justify-between rounded-lg border border-white/70 px-4 py-3.5">
          <span className="text-[17px] font-semibold">Bronze Club Member</span>
          <span aria-hidden className="text-xl" style={{ color: "#CD7F32" }}>⬢</span>
        </div>
        <p className="mt-2.5 text-[13px] font-bold uppercase tracking-wide">
          🪙 {firstName} has 0 honorary vibe tokens!
        </p>
        <p className="mt-1 text-[11px] text-neutral-500">50 HVTS TO IVORY CLUB</p>
        {inviteCode && (
          <p className="mt-2 text-xs text-success">
            Invite code {inviteCode} applied ✓
          </p>
        )}
      </section>

      {/* Stats */}
      <section className="mt-6 grid grid-cols-3 text-center">
        {["Events", "Superlatives", "HVTs"].map((k) => (
          <div key={k}>
            <p className="text-2xl font-bold">0</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
              {k}
            </p>
          </div>
        ))}
      </section>

      {/* Superlatives */}
      <section className="mt-8">
        <p className="text-[13px] font-bold uppercase tracking-[0.1em]">
          Superlatives
        </p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex h-24 items-center justify-center rounded-lg border border-dashed border-neutral-700 text-2xl text-neutral-700"
            >
              ✦
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-neutral-500">
          No superlatives received as of yet
        </p>
      </section>

      {/* Memories */}
      <section className="mt-8">
        <p className="text-[13px] font-bold uppercase tracking-[0.1em]">Memories</p>
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => demoToast("Memories")}
            className="h-28 w-32 shrink-0 rounded-xl bg-gradient-to-br from-gradient-start to-gradient-end p-3 text-left text-[13px] font-semibold leading-snug"
          >
            Memories show here
          </button>
          <button
            onClick={() => demoToast("Memories")}
            className="flex h-28 flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-neutral-700 text-xs text-neutral-500 hover:bg-neutral-900"
          >
            <span className="text-xl">＋</span>
            Create Event
          </button>
        </div>
      </section>

      {/* Passes */}
      <section className="mt-8">
        <p className="text-[13px] font-bold uppercase tracking-[0.1em]">Passes</p>
        <div className="mt-3 flex flex-col gap-3">
          <button
            onClick={() => demoToast("VIP Passes")}
            className="flex items-center justify-between rounded-xl border border-dashed border-[#E91E8C]/60 px-4 py-4 text-left transition-colors hover:bg-[#E91E8C]/10"
          >
            <span>
              <span className="flex items-center gap-2 text-[15px] font-bold text-[#FF4E9A]">
                🎟️ VIP Passes
              </span>
              <span className="text-xs text-neutral-400">
                Skip the line at any event
              </span>
            </span>
            <span aria-hidden className="text-neutral-400">›</span>
          </button>
          <button
            onClick={() => demoToast("Invite Passes")}
            className="flex items-center justify-between rounded-xl border border-dashed border-[#8B5CF6]/60 px-4 py-4 text-left transition-colors hover:bg-[#8B5CF6]/10"
          >
            <span>
              <span className="flex items-center gap-2 text-[15px] font-bold text-[#A78BFA]">
                💌 Invite Passes
              </span>
              <span className="text-xs text-neutral-400">
                You have 3 invite passes
              </span>
            </span>
            <span aria-hidden className="text-neutral-400">›</span>
          </button>
        </div>
      </section>

      {/* Spotlight for Business */}
      <section className="mt-8">
        <p className="text-[13px] font-bold uppercase tracking-[0.1em]">
          Spotlight for Business
        </p>
        <button
          onClick={() => demoToast("Extroverts Spotlight")}
          className="mt-3 h-[52px] w-full rounded-lg bg-gradient-to-r from-[#7B2FF7] to-[#3B1D8F] text-[15px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
        >
          Extroverts Spotlight
        </button>
        <p className="mt-2 text-[11px] text-neutral-500">
          Own a party place in your city? Get it featured &amp; turn your party
          spot into the city hotspot!
        </p>
      </section>

      {/* Log out */}
      <section className="mt-8">
        <p className="text-[13px] font-bold uppercase tracking-[0.1em]">Log Out</p>
        <p className="mt-1 text-[11px] text-neutral-500">
          Are you sure? Your session will be ended and you&apos;ll need to sign
          in again.
        </p>
        <button
          onClick={onLogout}
          className="mt-3 h-[52px] w-full rounded-lg bg-white text-[15px] font-semibold uppercase tracking-wide text-black transition-colors hover:bg-neutral-200"
        >
          Log Out
        </button>
      </section>
    </div>
  );
}
