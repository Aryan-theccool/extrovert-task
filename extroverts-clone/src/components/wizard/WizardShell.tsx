"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProgressDots from "@/components/ui/ProgressDots";
import { useWizard } from "@/context/WizardContext";
import type { StepName } from "@/types/wizard";

interface Props {
  step: StepName;
  stepNumber?: number; // 1–4 for the "GETTING READY" steps
  heading: string;
  subtext?: string;
  children: React.ReactNode;
}

/**
 * Shared shell for signup screens: gate-check (redirects out-of-order URL
 * access), "GETTING READY" label, progress dots, heading + subtext.
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
    <main className="flex flex-1 flex-col pb-8 pt-6 animate-fade-up">
      <header className="mb-8 flex flex-col gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          {stepNumber ? "Getting Ready" : "Extroverts"}
        </p>
        {stepNumber && <ProgressDots current={stepNumber} />}
        <div className="mt-2 flex flex-col gap-2">
          <h1 className="text-[22px] font-semibold leading-snug">{heading}</h1>
          {subtext && <p className="text-sm text-text-secondary">{subtext}</p>}
        </div>
      </header>
      {children}
    </main>
  );
}
