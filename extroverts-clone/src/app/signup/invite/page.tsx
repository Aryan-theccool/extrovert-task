"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WizardShell from "@/components/wizard/WizardShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useWizard } from "@/context/WizardContext";
import { validateInvite } from "@/lib/mockApi";
import { LIMITS } from "@/lib/validation";

export default function InvitePage() {
  const router = useRouter();
  const { setField } = useWizard();
  const [code, setCode] = useState("");
  const [warning, setWarning] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        "That code doesn't look valid — you can fix it or just continue without one."
      );
      setField("inviteCode", null);
      return;
    }
    setField("inviteCode", trimmed.toUpperCase());
    proceed();
  };

  return (
    <WizardShell
      step="invite"
      heading="Got an invite from a fellow extrovert?"
      subtext="We believe the best people bring the best people. Drop their code here — or skip it, no hard feelings."
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">
        <Input
          label="Invite Code (Optional)"
          name="invite"
          autoComplete="off"
          spellCheck={false}
          placeholder="VIBE2026"
          maxLength={LIMITS.invite}
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setWarning(null);
          }}
          hint="6–10 letters or numbers."
        />

        {warning && (
          <div
            role="status"
            className="mt-1 rounded-lg border border-warning/40 bg-warning/10 px-3 py-2.5 text-xs leading-relaxed text-warning"
          >
            {warning}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Button type="submit" loading={loading}>
            {loading ? "Checking..." : code.trim() ? "Apply & Continue" : "Continue"}
          </Button>
          {warning && (
            <Button type="button" variant="secondary" onClick={proceed}>
              Continue without a code
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/signup/pronouns")}
          >
            Back
          </Button>
        </div>
      </form>
    </WizardShell>
  );
}
