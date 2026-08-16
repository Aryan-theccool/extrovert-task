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
      subtext="Pick a suggestion or type your own — free text is welcome."
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">
        <div className="relative">
          <Input
            label="Pronouns"
            name="pronouns"
            autoFocus
            autoComplete="off"
            spellCheck={false}
            placeholder="they/them/theirs"
            maxLength={LIMITS.pronouns}
            value={pronouns}
            error={error}
            counter={{ value: pronouns.length, max: LIMITS.pronouns }}
            onChange={(e) => {
              setPronouns(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              setTouched(true);
              // Delay so a click on a suggestion still registers
              setTimeout(() => setShowSuggestions(false), 150);
            }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul
              role="listbox"
              aria-label="Pronoun suggestions"
              className="absolute left-0 right-0 top-[84px] z-10 overflow-hidden rounded-lg border border-border-default bg-bg-elevated-2 shadow-xl"
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
                    className="w-full px-4 py-3 text-left text-sm text-text-secondary transition-colors hover:bg-bg-elevated hover:text-white focus-visible:bg-bg-elevated focus-visible:text-white focus-visible:outline-none"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Button type="submit" loading={loading} disabled={!isValid}>
            {loading ? "Saving..." : "Continue"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.push("/signup/dob")}>
            Back
          </Button>
        </div>
      </form>
    </WizardShell>
  );
}
