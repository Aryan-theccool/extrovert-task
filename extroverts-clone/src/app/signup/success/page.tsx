"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomeFeed from "@/components/home/HomeFeed";
import { useWizard } from "@/context/WizardContext";
import { computeAge } from "@/lib/age";

/**
 * Success state matching the reference recording: after SIGN UP the user
 * lands on the member home feed with a "Signed up successfully" toast.
 * Improvement kept from earlier: a profile summary card (big pink initial,
 * like the app's profile tab) is reachable via the profile nav icon.
 */
export default function SuccessPage() {
  const { state, isStepAllowed } = useWizard();
  const router = useRouter();
  const [toastVisible, setToastVisible] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const allowed = isStepAllowed("success");
  const age = computeAge(state.dob);
  const firstName = (state.name || "You").split(" ")[0];

  useEffect(() => {
    if (!allowed) router.replace("/signup/email");
  }, [allowed, router]);

  useEffect(() => {
    const t = setTimeout(() => setToastVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  if (!allowed) return null;

  return (
    <main className="flex flex-1 flex-col animate-fade-up">
      <div className="flex-1">
          {showProfile ? (
            /* Profile view — replicates the app's profile tab */
            <div className="animate-fade-up pb-24">
              <div className="relative flex h-[420px] items-end bg-[#F23D6D] px-5 pb-5">
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center text-[260px] font-bold leading-none text-black/85"
                >
                  {(state.name || "E").charAt(0).toUpperCase()}
                </span>
                <div className="relative z-10">
                  <p className="text-[30px] font-bold leading-tight">
                    {state.name || "Extrovert"}{" "}
                    {age !== null && (
                      <span className="text-xl font-semibold text-white/70">{age}</span>
                    )}
                  </p>
                  <p className="text-[15px] font-medium text-white/85">
                    @{state.username || "member"}{" "}
                    <span className="text-white/60">{state.pronouns}</span>
                  </p>
                </div>
              </div>
              <div className="pt-5">
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
                {state.inviteCode && (
                  <p className="mt-2 text-xs text-success">
                    Invite code {state.inviteCode} applied ✓
                  </p>
                )}
                <div className="mt-6 grid grid-cols-3 text-center">
                  {["Events", "Superlatives", "HVTs"].map((k) => (
                    <div key={k}>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
                        {k}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowProfile(false)}
                  className="mt-8 h-[52px] w-full rounded-lg border border-neutral-600 text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-900"
                >
                  Back to feed
                </button>
              </div>
            </div>
          ) : (
            <HomeFeed
              member={{ name: firstName, tokens: 0 }}
              onJoin={() => setShowProfile(true)}
            />
          )}

        {/* "Signed up successfully" toast, like the recording */}
        <div
          role="status"
          className={`fixed bottom-24 left-1/2 z-50 w-[calc(100%-40px)] max-w-[380px] -translate-x-1/2 transition-all duration-500 ${
            toastVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 rounded-xl border border-success/40 bg-[#0E1A12] px-4 py-3.5 shadow-2xl">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-success text-xs text-success">
              ✓
            </span>
            <span className="text-[15px] font-medium">Signed up successfully</span>
          </div>
        </div>
      </div>
    </main>
  );
}
