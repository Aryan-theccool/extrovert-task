"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import WizardShell from "@/components/wizard/WizardShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useWizard } from "@/context/WizardContext";
import { validatePronouns, PRONOUN_SUGGESTIONS, LIMITS } from "@/lib/validation";
import { submitProfileField } from "@/lib/mockApi";

export default function PronounsPage() {
  const router = useRouter();
  const { state, setField, dispatch } = useWizard();
  const [pronouns, setPronouns] = useState(state.pronouns);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const error = touched ? validatePronouns(pronouns) : null;
  const isValid = validatePronouns(pronouns) === null;

  const suggestions = useMemo(() => {
    const q = pronouns.trim().toLowerCase();
    if (!q) return PRONOUN_SUGGESTIONS;
    return PRONOUN_SUGGESTIONS.filter((s) => s.includes(q) && s !== q);
  }, [pronouns]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid || loading) return;

    setLoading(true);
    const res = await submitProfileField("pronouns", pronouns.trim());
    setLoading(false);

    if (!res.success) {
      toast.error(res.error ?? "Something went wrong. Please try again.");
      return;
    }
    setField("pronouns", pronouns.trim());
    dispatch({ type: "COMPLETE_STEP", step: "pronouns" });
    router.push("/signup/invite");
  };

  return (
    <WizardShell
      step="pronouns"
      stepNumber={4}
      heading="Which pronouns feel right for you?"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">
        <div className="relative">
          <Input
            label="Pronouns"
            name="pronouns"
            autoFocus
            autoComplete="off"
            spellCheck={false}
            placeholder="he/him/his"
            maxLength={LIMITS.pronouns}
            value={pronouns}
            error={error}
            hint="Select the pronouns that feel right for you."
            onChange={(e) => {
              setPronouns(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              if (pronouns.length > 0) setTouched(true);
              setTimeout(() => setShowSuggestions(false), 150);
            }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul
              role="listbox"
              aria-label="Pronoun suggestions"
              className="absolute left-0 right-0 top-[86px] z-10 overflow-hidden rounded-lg border border-neutral-700 bg-[#1A1A1A] shadow-xl"
            >
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={false}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setPronouns(s);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-neutral-300 transition-colors hover:bg-[#242424] hover:text-white focus-visible:bg-[#242424] focus-visible:text-white focus-visible:outline-none"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-4 pt-8">
          <Button type="submit" loading={loading} disabled={!isValid}>
            Next
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.push("/signup/dob")}>
            Back
          </Button>
        </div>
      </form>
    </WizardShell>
  );
}
