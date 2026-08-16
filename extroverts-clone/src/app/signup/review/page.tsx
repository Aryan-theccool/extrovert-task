"use client";

import { useRouter } from "next/navigation";
import WizardShell from "@/components/wizard/WizardShell";
import Button from "@/components/ui/Button";
import { useWizard } from "@/context/WizardContext";
import { computeAge } from "@/lib/age";

/**
 * IMPROVEMENT: Profile Review Screen
 * Users see a summary of all their information before the wizard completes.
 * This reduces errors and increases user confidence.
 * Shows: Email, Username, Name, Age, Pronouns (all read-only)
 * Actions: Confirm (proceed to invite) or Edit (go back)
 */
export default function ReviewPage() {
  const router = useRouter();
  const { state, isStepAllowed } = useWizard();

  const allowed = isStepAllowed("pronouns");
  if (!allowed) {
    router.replace("/signup/email");
    return null;
  }

  const age = computeAge(state.dob);

  const reviewItems = [
    { label: "Email", value: state.email },
    { label: "Username", value: state.username },
    { label: "Name", value: state.name },
    { label: "Age", value: age ? `${age} years old` : "—" },
    { label: "Pronouns", value: state.pronouns },
  ];

  return (
    <WizardShell step="pronouns" stepNumber={4} heading="Review your profile">
      <div className="flex flex-1 flex-col">
        <p className="mb-6 text-sm text-neutral-400">
          Everything look good? Review your profile details before confirming.
        </p>

        {/* Profile Summary Cards */}
        <div className="space-y-3 rounded-lg border border-neutral-700 bg-[#0A0A0A] p-4">
          {reviewItems.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between border-b border-neutral-800 pb-3 last:border-0 last:pb-0"
            >
              <span className="text-sm font-medium uppercase tracking-wider text-neutral-400">
                {label}
              </span>
              <span className="text-right text-base font-semibold text-white">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Confirmation Message */}
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-accent-primary/20 bg-accent-primary/5 p-4">
          <span className="text-accent-primary">ℹ</span>
          <p className="text-sm text-neutral-300">
            Your name <span className="font-semibold">cannot be changed</span> after this point,
            so make sure everything is correct.
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-4 pt-8">
          <Button onClick={() => router.push("/signup/invite")}>
            Confirm & Continue
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push("/signup/pronouns")}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </WizardShell>
  );
}
