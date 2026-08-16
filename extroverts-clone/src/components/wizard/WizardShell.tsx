"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import ProgressDots from "@/components/ui/ProgressDots";
import { useWizard } from "@/context/WizardContext";
import type { StepName } from "@/types/wizard";

interface Props {
  step: StepName;
  stepNumber?: number; // 1–4 for the "GETTING READY" steps
  heading?: string;
  subtext?: string;
  children: React.ReactNode;
}

/**
 * Shared shell for signup screens, matching the reference app:
 * serif "E·" logo top-left, "GETTING READY" label top-right on wizard
 * steps, heading below. Also gate-checks out-of-order URL access.
 * The thin progress bar is an intentional improvement over the app.
 */
export default function WizardShell({
  step,
  stepNumber,
  heading,
  subtext,
  children,
}: Props) {
  const router = useRouter();
  const { isStepAllowed } = useWizard();
  const allowed = isStepAllowed(step);

  useEffect(() => {
    if (!allowed) router.replace("/signup/email");
  }, [allowed, router]);

  if (!allowed) return null;

  return (
    <main className="flex flex-1 flex-col pb-6 pt-8 animate-fade-up">
      <header className="mb-2 flex items-start justify-between">
        <Logo size={40} />
        {stepNumber && (
          <span className="mt-2 text-[15px] font-bold uppercase tracking-[0.02em]">
            Getting Ready
          </span>
        )}
      </header>
      {stepNumber && (
        <div className="mb-6 mt-3">
          <ProgressDots current={stepNumber} />
        </div>
      )}
      {heading && (
        <div className="mb-6 mt-6 flex flex-col gap-2">
          <h1 className="text-[26px] font-bold leading-snug">{heading}</h1>
          {subtext && <p className="text-sm text-neutral-400">{subtext}</p>}
        </div>
      )}
      {children}
    </main>
  );
}
