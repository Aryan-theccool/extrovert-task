"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WizardShell from "@/components/wizard/WizardShell";
import Button from "@/components/ui/Button";
import { useWizard } from "@/context/WizardContext";
import { validateInvite } from "@/lib/mockApi";
import { LIMITS } from "@/lib/validation";

const MANIFESTO: { text: string; accent?: string }[][] = [
  [{ text: "KINDNESS = GOOD " }, { text: "HAIR", accent: "#8B5CF6" }, { text: " DAY" }],
  [{ text: "SIP IN? " }, { text: "CHIP", accent: "#8B5CF6" }, { text: " IN." }],
  [{ text: "GHOSTING IS FOR " }, { text: "HALLOWEEN", accent: "#8B5CF6" }, { text: "." }],
  [{ text: "OUTFITS LOUD, " }, { text: "INTENTIONS", accent: "#8B5CF6" }, { text: " CLEAR." }],
  [{ text: "JOINING? FREE. HOSTING? " }, { text: "ALSO", accent: "#8B5CF6" }, { text: " FREE." }],
  [{ text: "EARLLY IS " }, { text: "ICONIC", accent: "#8B5CF6" }, { text: "." }],
  [{ text: "YES. " }, { text: "SPELLING", accent: "#8B5CF6" }, { text: " MISTAKE." }],
];

/** Manifesto + optional invite code screen, matching the reference app. */
export default function InvitePage() {
  const router = useRouter();
  const { setField, isStepAllowed } = useWizard();
  const [code, setCode] = useState("");
  const [warning, setWarning] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check if user is allowed to be on this page
  const allowed = isStepAllowed("invite");
  if (!allowed) {
    router.replace("/signup/email");
    return null;
  }

  const proceed = () => router.push("/signup/success");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const trimmed = code.trim();

    if (!trimmed) {
      setField("inviteCode", null);
      proceed();
      return;
    }

    setLoading(true);
    const res = await validateInvite(trimmed);
    setLoading(false);

    if (!res.valid) {
      // Non-blocking: warn, but let the user proceed anyway
      setWarning(
        "That code doesn't look valid — fix it or just continue without one."
      );
      setField("inviteCode", null);
      return;
    }
    setField("inviteCode", trimmed.toUpperCase());
    proceed();
  };

  return (
    <WizardShell step="invite">
      <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">
        <div className="mb-8 mt-4 flex flex-col gap-1.5 text-[19px] font-bold leading-relaxed tracking-[0.01em]">
          {MANIFESTO.map((line, i) => (
            <p key={i}>
              {line.map((seg, j) =>
                seg.accent ? (
                  <span key={j} style={{ color: seg.accent }}>
                    {seg.text}
                  </span>
                ) : (
                  <span key={j}>{seg.text}</span>
                )
              )}
            </p>
          ))}
        </div>

        <label
          htmlFor="invite"
          className="mb-2 text-[13px] font-medium uppercase tracking-[0.02em] text-neutral-300"
        >
          Enter invite code <span className="lowercase">(optional)</span>
        </label>
        <input
          id="invite"
          name="invite"
          autoComplete="off"
          spellCheck={false}
          maxLength={LIMITS.invite}
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setWarning(null);
          }}
          className="h-[54px] w-full rounded-lg border border-neutral-600 bg-transparent px-4 text-[15px] text-white outline-none transition-colors focus:border-white"
        />
        <p className="mt-2 text-[14px] text-neutral-400">
          Enter invite code and get up to +30 HVTs!
        </p>

        {warning && (
          <div
            role="status"
            className="mt-3 rounded-lg border border-warning/40 bg-warning/10 px-3 py-2.5 text-[13px] leading-relaxed text-warning"
          >
            {warning}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-4 pt-8">
          <Button type="submit" loading={loading}>
            Sign Up
          </Button>
          {warning && (
            <Button type="button" variant="secondary" onClick={proceed}>
              Continue without a code
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/signup/pronouns")}
          >
            Back
          </Button>
        </div>
      </form>
    </WizardShell>
  );
}
