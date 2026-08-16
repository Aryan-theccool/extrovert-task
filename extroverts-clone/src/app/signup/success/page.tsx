"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WizardShell from "@/components/wizard/WizardShell";
import Button from "@/components/ui/Button";
import { useWizard } from "@/context/WizardContext";
import { computeAge } from "@/lib/age";

export default function SuccessPage() {
  const router = useRouter();
  const { state, dispatch } = useWizard();
  const [locStatus, setLocStatus] = useState<"idle" | "requesting" | "granted" | "denied">(
    "idle"
  );

  const age = computeAge(state.dob);

  // Kick off a celebratory reveal
  const [revealed, setRevealed] = useState(false);
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

  return (
    <WizardShell
      step="success"
      heading="You're in! 🎉"
      subtext="Your profile is complete. Welcome to the loudest corner of the internet."
    >
      <div className="flex flex-1 flex-col gap-4">
        {/* Club status card */}
        <div
          className={`rounded-xl border border-border-default bg-gradient-to-br from-bg-elevated to-bg-elevated-2 p-5 transition-all duration-500 ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gradient-start to-gradient-end text-xl font-bold">
              {(state.name || "E").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold">{state.name || "Extrovert"}</p>
              <p className="truncate text-sm text-text-secondary">
                @{state.username || "member"} · {state.pronouns || "—"}
                {age !== null && <> · {age}</>}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full border border-bronze/50 bg-bronze/15 px-3 py-1 text-xs font-semibold text-bronze">
              🥉 Bronze Club Member
            </span>
            <span className="rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-xs font-semibold text-warning">
              0 Honorary Vibe Tokens
            </span>
          </div>
          {state.inviteCode && (
            <p className="mt-3 text-xs text-success">
              Invite code {state.inviteCode} applied ✓
            </p>
          )}
        </div>

        {/* Location permission (real browser API — the one non-mocked integration) */}
        <div className="rounded-xl border border-border-default bg-bg-elevated p-5">
          <p className="text-sm font-semibold">
            {locStatus === "granted"
              ? "Location enabled 📍"
              : locStatus === "denied"
                ? "No worries — you can enable it later."
                : "Find events near you"}
          </p>
          <p className="mt-1 text-xs text-text-secondary">
            {locStatus === "granted"
              ? "We'll surface parties, dinners and jams happening around you."
              : locStatus === "denied"
                ? "You can still browse everything city-by-city."
                : "Allow location access so we can show what's happening around you."}
          </p>
          {locStatus !== "granted" && locStatus !== "denied" && (
            <Button
              variant="secondary"
              className="mt-4"
              loading={locStatus === "requesting"}
              onClick={requestLocation}
            >
              {locStatus === "requesting" ? "Trying to fetch your location..." : "Enable Location"}
            </Button>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-4">
          <Button
            onClick={() => {
              dispatch({ type: "RESET" });
              router.push("/");
            }}
          >
            Take me to the party
          </Button>
        </div>
      </div>
    </WizardShell>
  );
}
