"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import WizardShell from "@/components/wizard/WizardShell";
import Button from "@/components/ui/Button";
import { useWizard } from "@/context/WizardContext";
import { computeAge, validateDob } from "@/lib/age";
import { submitProfileField } from "@/lib/mockApi";
import type { DobValue } from "@/types/wizard";

const MIN_AGE = Number(process.env.NEXT_PUBLIC_MIN_SIGNUP_AGE ?? 18);

const FIELDS: { key: keyof DobValue; label: string; placeholder: string; max: number }[] = [
  { key: "day", label: "DD", placeholder: "17", max: 2 },
  { key: "month", label: "MM", placeholder: "03", max: 2 },
  { key: "year", label: "YYYY", placeholder: "2001", max: 4 },
];

export default function DobPage() {
  const router = useRouter();
  const { state, setField, dispatch } = useWizard();
  const [dob, setDob] = useState<DobValue>(state.dob);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const refs = useRef<Record<string, HTMLInputElement | null>>({});

  const dateError = validateDob(dob);
  const age = useMemo(() => computeAge(dob), [dob]);
  const isUnderage = dateError === null && age !== null && age < MIN_AGE;
  const isValid = dateError === null && !isUnderage;
  const shownError = touched ? (dateError ?? null) : null;

  const handleChange = (key: keyof DobValue, raw: string, max: number, nextKey?: keyof DobValue) => {
    const clean = raw.replace(/\D/g, "").slice(0, max); // numeric-only, hard length cap
    setDob((d) => ({ ...d, [key]: clean }));
    if (clean.length === max && nextKey) refs.current[nextKey]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid || loading) return;

    setLoading(true);
    const res = await submitProfileField("dob", dob);
    setLoading(false);

    if (!res.success) {
      toast.error(res.error ?? "Something went wrong. Please try again.");
      return;
    }
    setField("dob", dob);
    dispatch({ type: "COMPLETE_STEP", step: "dob" });
    router.push("/signup/pronouns");
  };

  return (
    <WizardShell
      step="dob"
      stepNumber={3}
      heading="How many years have you been partying?"
      subtext="Your date of birth stays private — we only use it to check you're 18+."
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">
        <div className="rounded-xl border border-border-default bg-bg-elevated p-4">
          <div aria-hidden className="mx-auto mb-4 h-1 w-10 rounded-full bg-border-default" />
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary">
            Date of Birth
          </p>
          <div className="flex gap-3">
            {FIELDS.map((f, i) => (
              <div key={f.key} className={f.key === "year" ? "flex-[1.6]" : "flex-1"}>
                <input
                  ref={(el) => {
                    refs.current[f.key] = el;
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoFocus={i === 0}
                  placeholder={f.placeholder}
                  aria-label={f.label}
                  value={dob[f.key]}
                  maxLength={f.max}
                  onChange={(e) =>
                    handleChange(f.key, e.target.value, f.max, FIELDS[i + 1]?.key)
                  }
                  onBlur={() => {
                    if (dob.day && dob.month && dob.year) setTouched(true);
                  }}
                  className={`h-12 w-full rounded-lg border bg-bg-elevated-2 text-center text-[15px] font-medium text-white placeholder:text-text-muted outline-none transition-colors ${
                    shownError || (isUnderage && touched)
                      ? "border-error"
                      : "border-border-default focus:border-accent"
                  }`}
                />
                <p className="mt-1.5 text-center text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 min-h-[40px]">
          {shownError ? (
            <p role="alert" className="text-xs text-error">
              {shownError}
            </p>
          ) : isUnderage ? (
            <div
              role="alert"
              className="rounded-lg border border-error/40 bg-error/10 px-3 py-2.5 text-xs leading-relaxed text-error"
            >
              You need to be at least {MIN_AGE} to join Extroverts
              {age !== null && <> — you&apos;re {age} right now</>}. We&apos;ll save you a
              spot on the dance floor. 🎈
            </div>
          ) : age !== null && dateError === null ? (
            <p className="text-xs text-success">
              {age} years of partying — you&apos;re in. ✓
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Button type="submit" loading={loading} disabled={!isValid}>
            {loading ? "Saving..." : "Continue"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.push("/signup/name")}>
            Back
          </Button>
        </div>
      </form>
    </WizardShell>
  );
}
