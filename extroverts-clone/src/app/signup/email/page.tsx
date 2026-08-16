"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import WizardShell from "@/components/wizard/WizardShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useWizard } from "@/context/WizardContext";
import { validateEmail } from "@/lib/validation";
import { sendOtp } from "@/lib/mockApi";

export default function EmailPage() {
  const router = useRouter();
  const { state, setField } = useWizard();
  const [email, setEmail] = useState(state.email);
  const [newsletter, setNewsletter] = useState(state.newsletter);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const error = touched ? validateEmail(email) : null;
  const isValid = validateEmail(email) === null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid || loading) return;

    setLoading(true);
    const trimmed = email.trim();
    const res = await sendOtp(trimmed);
    setLoading(false);

    if (!res.success) {
      toast.error(res.error ?? "Something went wrong. Please try again.");
      return;
    }
    setField("email", trimmed);
    setField("newsletter", newsletter);
    setField("otp", "");
    toast.success(`Code sent to ${trimmed}`);
    router.push("/signup/otp");
  };

  return (
    <WizardShell
      step="email"
      heading="What's your email?"
      subtext="We'll send you a one-time code to verify it. No passwords here."
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">
        <Input
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoFocus
          placeholder="you@example.com"
          value={email}
          error={error}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
        />

        <label className="mt-2 flex cursor-pointer items-start gap-3 text-sm text-text-secondary">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded border border-border-default bg-bg-elevated transition-colors checked:border-accent checked:bg-accent"
          />
          <span>
            Keep me posted about events near me{" "}
            <span className="text-text-muted">(optional)</span>
          </span>
        </label>

        <div className="mt-auto pt-8">
          <Button type="submit" loading={loading} disabled={!isValid}>
            {loading ? "Sending code..." : "Proceed"}
          </Button>
        </div>
      </form>
    </WizardShell>
  );
}
