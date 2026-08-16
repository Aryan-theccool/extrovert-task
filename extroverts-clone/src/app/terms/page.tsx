"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "@/components/layout/PhoneFrame";
import Button from "@/components/ui/Button";

const SECTIONS = [
  {
    title: "1. The Vibe Agreement",
    body: "By creating an account, you agree to show up — literally. Extroverts is built around real-world events, and your profile information (username, name, pronouns) may be visible to other verified members attending the same events.",
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years of age to use Extroverts. We verify this during signup, and accounts found to belong to minors will be removed. Your date of birth is never shown to other members.",
  },
  {
    title: "3. Your Data",
    body: "We collect only what the signup flow asks for: email, username, display name, date of birth, and pronouns. Your email is used solely for one-time passcodes and (if you opt in) our newsletter. We do not sell personal data.",
  },
  {
    title: "4. Community Conduct",
    body: "Harassment, hate speech, or unsafe behavior at events results in immediate account termination. Be excellent to each other — the whole point is meeting great people.",
  },
  {
    title: "5. Content & Tokens",
    body: "Honorary Vibe Tokens and club tiers (Bronze, Silver, Gold) are cosmetic gamification features with no monetary value and may be adjusted or reset at any time.",
  },
  {
    title: "6. Termination",
    body: "You can delete your account at any time from settings. We may suspend accounts that violate these terms, with notice where legally required.",
  },
];

export default function TermsPage() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  return (
    <PhoneFrame>
      <main className="flex min-h-dvh flex-col animate-fade-up">
        <header className="pb-4 pt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
            Extroverts
          </p>
          <h1 className="mt-3 text-[22px] font-semibold">Terms & Conditions</h1>
          <p className="mt-1 text-sm text-text-secondary">
            The boring-but-important stuff. Give it a skim.
          </p>
        </header>

        {/* Independently scrollable T&C body */}
        <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-border-default bg-bg-elevated p-4">
          <div className="flex flex-col gap-5">
            {SECTIONS.map((s) => (
              <section key={s.title}>
                <h2 className="text-sm font-semibold">{s.title}</h2>
                <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
                  {s.body}
                </p>
              </section>
            ))}
            <p className="text-xs text-text-muted">
              Last updated: August 2026 · Demo copy for assessment purposes.
            </p>
          </div>
        </div>

        {/* Fixed CTA area */}
        <div className="flex flex-col gap-4 py-5">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded border border-border-default bg-bg-elevated transition-colors checked:border-accent checked:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              style={{
                backgroundImage: agreed
                  ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3E%3Cpath d='M12.7 4.7a1 1 0 0 0-1.4-1.4L6.5 8.09 4.7 6.3a1 1 0 0 0-1.4 1.4l2.5 2.5a1 1 0 0 0 1.4 0l5.5-5.5z'/%3E%3C/svg%3E\")"
                  : undefined,
                backgroundSize: "100%",
              }}
            />
            <span>
              I agree to the{" "}
              <span className="font-medium text-white">Terms & Conditions</span> and
              confirm I&apos;m 18 or older.
            </span>
          </label>
          <Button disabled={!agreed} onClick={() => router.push("/signup/email")}>
            Continue
          </Button>
        </div>
      </main>
    </PhoneFrame>
  );
}
