"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import WizardShell from "@/components/wizard/WizardShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useWizard } from "@/context/WizardContext";
import { validateName, LIMITS } from "@/lib/validation";
import { submitProfileField } from "@/lib/mockApi";

export default function NamePage() {
  const router = useRouter();
  const { state, setField, dispatch } = useWizard();
  const [name, setName] = useState(state.name);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const locked = state.nameLocked;
  const error = touched && !locked ? validateName(name) : null;
  const isValid = locked || validateName(name) === null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) {
      router.push("/signup/dob");
      return;
    }
    setTouched(true);
    if (!isValid || loading) return;

    setLoading(true);
    const res = await submitProfileField("name", name.trim());
    setLoading(false);

    if (!res.success) {
      toast.error(res.error ?? "Something went wrong. Please try again.");
      return;
    }
    setField("name", name.trim());
    setField("nameLocked", true);
    dispatch({ type: "COMPLETE_STEP", step: "name" });
    router.push("/signup/dob");
  };

  return (
    <WizardShell
      step="name"
      stepNumber={2}
      heading={'"Name, please, for the party check!"'}
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">
        <Input
          label="Name"
          name="name"
          autoFocus={!locked}
          autoComplete="name"
          maxLength={LIMITS.name}
          value={name}
          error={error}
          readOnly={locked}
          counter={locked ? undefined : { value: name.length, max: LIMITS.name }}
          hint={
            locked
              ? "Your name is locked in — it can't be changed."
              : "This is the name shown as on members and requests. Cannot be changed later."
          }
          onChange={(e) => setName(e.target.value)}
          onBlur={() => name.length > 0 && setTouched(true)}
          className={locked ? "opacity-60" : ""}
        />

        <div className="mt-auto flex flex-col gap-4 pt-8">
          <Button type="submit" loading={loading} disabled={!isValid}>
            Next
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/signup/username")}
          >
            Back
          </Button>
        </div>
      </form>
    </WizardShell>
  );
}
