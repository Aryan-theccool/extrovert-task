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

const FIELDS: { key: keyof DobValue; label: string; max: number }[] = [
  { key: "day", label: "DD", max: 2 },
  { key: "month", label: "MM", max: 2 },
  { key: "year", label: "YYYY", max: 4 },
];

/**
 * DOB step — matches the reference app: an AGE field on the main screen
 * that opens a "DATE OF BIRTH" bottom sheet (DD / MM / YYYY + PROCEED).
 * Improvement over the app: under-18 users get a clear inline block
 * instead of a silent failure, and impossible dates are rejected.
 */
export default function DobPage() {
  const router = useRouter();
  const { state, setField, dispatch } = useWizard();
  const [dob, setDob] = useState<DobValue>(state.dob);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const refs = useRef<Record<string, HTMLInputElement | null>>({});

  const dateError = validateDob(dob);
  const age = useMemo(() => computeAge(dob), [dob]);
  const isUnderage = dateError === null && age !== null && age < MIN_AGE;
  const isValid = dateError === null && !isUnderage;
  const sheetError = touched ? dateError : null;

  const handleChange = (
    key: keyof DobValue,
    raw: string,
    max: number,
    nextKey?: keyof DobValue
  ) => {
    const clean = raw.replace(/\D/g, "").slice(0, max); // numeric-only hard cap
    setDob((d) => ({ ...d, [key]: clean }));
    if (clean.length === max && nextKey) refs.current[nextKey]?.focus();
  };

  const handleSheetProceed = () => {
    setTouched(true);
    if (dateError) return;
    setSheetOpen(false);
  };

  const handleNext = async () => {
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
    >
      <div className="flex flex-1 flex-col">
        {/* AGE field — opens the bottom sheet, like the app */}
        <label className="mb-2 text-[13px] font-medium uppercase tracking-[0.02em] text-neutral-300">
          Age
        </label>
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className={`flex h-[54px] w-full items-center rounded-lg border bg-transparent px-4 text-left text-[15px] transition-colors ${
            isUnderage
              ? "border-error"
              : "border-neutral-600 hover:border-neutral-400 focus-visible:border-white"
          } ${age !== null && dateError === null ? "text-white" : "text-neutral-500"}`}
        >
          {age !== null && dateError === null ? `${age}` : "Tap to enter your date of birth"}
        </button>
        <p className="mt-2 text-[14px] leading-snug text-neutral-400">
          We need your age to verify you&apos;re eligible and help others know
          who they&apos;re connecting with.
        </p>

        {/* Age gate — explicit improvement over the app's silent behavior */}
        <div className="mt-3 min-h-[24px]">
          {isUnderage && (
            <div
              role="alert"
              className="rounded-lg border border-error/40 bg-error/10 px-3 py-2.5 text-[13px] leading-relaxed text-error"
            >
              You need to be at least {MIN_AGE} to join Extroverts
              {age !== null && <> — you&apos;re {age} right now</>}. We&apos;ll
              save you a spot on the dance floor. 🎈
            </div>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-4 pt-8">
          <Button onClick={handleNext} loading={loading} disabled={!isValid}>
            Next
          </Button>
          <Button variant="secondary" onClick={() => router.push("/signup/name")}>
            Back
          </Button>
        </div>
      </div>

      {/* DATE OF BIRTH bottom sheet */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70"
          onClick={() => setSheetOpen(false)}
        >
          <div
            role="dialog"
            aria-label="Date of birth"
            className="w-full max-w-[420px] rounded-t-2xl bg-[#161616] px-5 pb-8 pt-3 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div aria-hidden className="mx-auto mb-4 h-1 w-10 rounded-full bg-neutral-600" />
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[19px] font-bold uppercase tracking-wide">
                Date of Birth
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setSheetOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-3">
              {FIELDS.map((f, i) => (
                <input
                  key={f.key}
                  ref={(el) => {
                    refs.current[f.key] = el;
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoFocus={i === 0}
                  placeholder={f.label}
                  aria-label={f.label}
                  value={dob[f.key]}
                  maxLength={f.max}
                  onChange={(e) =>
                    handleChange(f.key, e.target.value, f.max, FIELDS[i + 1]?.key)
                  }
                  className={`h-[54px] min-w-0 rounded-lg border bg-transparent text-center text-[15px] font-medium text-white placeholder:uppercase placeholder:text-neutral-500 outline-none transition-colors ${
                    f.key === "year" ? "flex-[1.4]" : "flex-1"
                  } ${
                    sheetError
                      ? "border-error"
                      : "border-neutral-600 focus:border-white"
                  }`}
                />
              ))}
            </div>

            <div className="mt-2 min-h-[20px]">
              {sheetError && (
                <p role="alert" className="text-[13px] text-error">
                  {sheetError}
                </p>
              )}
              {!sheetError && age !== null && dateError === null && (
                <p className={`text-[13px] ${isUnderage ? "text-error" : "text-success"}`}>
                  {isUnderage
                    ? `That makes you ${age} — you must be ${MIN_AGE}+ to join.`
                    : `${age} years of partying — looking good. ✓`}
                </p>
              )}
            </div>

            <Button className="mt-4" onClick={handleSheetProceed}>
              Proceed
            </Button>
          </div>
        </div>
      )}
    </WizardShell>
  );
}
