"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WizardShell from "@/components/wizard/WizardShell";
import Button from "@/components/ui/Button";
import HomeFeed from "@/components/home/HomeFeed";
import { useWizard } from "@/context/WizardContext";
import { computeAge } from "@/lib/age";

/**
 * Success flow matching the reference app's post-signup experience:
 * 1. Location permission prompt (real browser Geolocation API).
 * 2. Profile card — big accent block with your initial, name + age,
 *    @username + pronouns, Bronze club status, 0 HVTs.
 * 3. Enter the home feed as a member.
 */
export default function SuccessPage() {
  const router = useRouter();
  const { state } = useWizard();
  const [view, setView] = useState<"profile" | "home">("profile");
  const [locStatus, setLocStatus] = useState<
    "idle" | "requesting" | "granted" | "denied"
  >("idle");
  const [revealed, setRevealed] = useState(false);

  const age = computeAge(state.dob);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 150);
    return () => clearTimeout(t);
  }, []);

  const requestLocation = () => {
    setLocStatus("requesting");
    if (!navigator.geolocation) {
      setLocStatus("denied");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => setLocStatus("granted"),
      () => setLocStatus("denied"),
      { timeout: 8000 }
    );
  };

  if (view === "home") {
    return (
      <HomeFeed
        member={{ name: (state.name || "You").split(" ")[0], tokens: 0 }}
        onJoin={() => {}}
      />
    );
  }

  return (
    <WizardShell
      step="success"
      heading="You're in! 🎉"
      subtext="Your profile is complete. Welcome to the loudest corner of the internet."
    >
      <div className="flex flex-1 flex-col gap-4">
        {/* Profile card — mirrors the app's profile view */}
        <div
          className={`overflow-hidden rounded-2xl transition-all duration-500 ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <div className="relative flex h-56 items-end bg-[#F23D6D] px-5 pb-4">
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center text-[160px] font-bold leading-none text-black/85"
            >
              {(state.name || "E").charAt(0).toUpperCase()}
            </span>
            <div className="relative z-10">
              <p className="text-[26px] font-bold leading-tight">
                {state.name || "Extrovert"}{" "}
                {age !== null && (
                  <span className="text-lg font-semibold text-white/70">{age}</span>
                )}
              </p>
              <p className="text-sm font-medium text-white/80">
                @{state.username || "member"}{" "}
                <span className="text-white/60">{state.pronouns || ""}</span>
              </p>
            </div>
          </div>
          <div className="bg-[#0E0E0E] px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
              Club
            </p>
            <div className="mt-2 flex items-center justify-between rounded-lg border border-white/70 px-4 py-3">
              <span className="font-semibold">Bronze Club Member</span>
              <span aria-hidden style={{ color: "#CD7F32" }}>⬢</span>
            </div>
            <p className="mt-2.5 text-[13px] font-bold uppercase tracking-wide">
              🪙 {(state.name || "You").split(" ")[0]} has 0 honorary vibe tokens!
            </p>
            {state.inviteCode && (
              <p className="mt-2 text-xs text-success">
                Invite code {state.inviteCode} applied ✓
              </p>
            )}
          </div>
        </div>

        {/* Location permission — the one real browser API in this build */}
        <div className="rounded-xl border border-neutral-800 bg-[#0E0E0E] p-4">
          <p className="text-sm font-semibold">
            {locStatus === "granted"
              ? "Location enabled 📍"
              : locStatus === "denied"
                ? "No worries — you can enable it later."
                : "Find events near you"}
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            {locStatus === "granted"
              ? "We'll surface parties, dinners and jams happening around you."
              : locStatus === "denied"
                ? "You can still browse everything city-by-city."
                : "Allow location access so we can show what's happening around you."}
          </p>
          {locStatus !== "granted" && locStatus !== "denied" && (
            <Button
              variant="secondary"
              className="mt-3"
              loading={locStatus === "requesting"}
              onClick={requestLocation}
            >
              {locStatus === "requesting"
                ? "Trying to fetch your location..."
                : "Enable Location"}
            </Button>
          )}
        </div>

        <div className="mt-auto pt-2">
          <Button onClick={() => setView("home")}>Take me to the party</Button>
        </div>
      </div>
    </WizardShell>
  );
}
