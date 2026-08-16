"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import WizardShell from "@/components/wizard/WizardShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useWizard } from "@/context/WizardContext";
import { validateUsername, LIMITS } from "@/lib/validation";
import { submitProfileField } from "@/lib/mockApi";

export default function UsernamePage() {
  const router = useRouter();
  const { state, setField, dispatch } = useWizard();
  const [username, setUsername] = useState(state.username);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const error = touched ? validateUsername(username) : null;
  const isValid = validateUsername(username) === null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid || loading) return;

    setLoading(true);
    const res = await submitProfileField("username", username.trim());
    setLoading(false);

    if (!res.success) {
      toast.error(res.error ?? "Something went wrong. Please try again.");
      return;
    }
    setField("username", username.trim());
    dispatch({ type: "COMPLETE_STEP", step: "username" });
    router.push("/signup/name");
  };

  return (
    <WizardShell
      step="username"
      stepNumber={1}
      heading="Create a username that fits your vibe!"
      subtext="This is your handle — other members will find you by it."
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">
        <Input
          label="Username"
          name="username"
          autoFocus
          autoComplete="off"
          spellCheck={false}
          placeholder="party.animal"
          maxLength={LIMITS.username}
          value={username}
          error={error}
          counter={{ value: username.length, max: LIMITS.username }}
          hint="Letters, numbers, dots and underscores."
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setTouched(true)}
        />

        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Button type="submit" loading={loading} disabled={!isValid}>
            {loading ? "Saving..." : "Continue"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.push("/signup/otp")}>
            Back
          </Button>
        </div>
      </form>
    </WizardShell>
  );
}
