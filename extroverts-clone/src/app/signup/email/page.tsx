"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import WizardShell from "@/components/wizard/WizardShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useWizard } from "@/context/WizardContext";
import { validateEmail } from "@/lib/validation";
import { sendOtp } from "@/lib/mockApi";

export default function EmailPage() {
  const router = useRouter();
  const { state, setField } = useWizard();
  const [email, setEmail] = useState(state.email);
  const [newsletter, setNewsletter] = useState(state.newsletter);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const error = touched ? validateEmail(email) : null;
  const isValid = validateEmail(email) === null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid || loading) return;

    setLoading(true);
    const trimmed = email.trim();
    const res = await sendOtp(trimmed);
    setLoading(false);

    if (!res.success) {
      toast.error(res.error ?? "Something went wrong. Please try again.");
      return;
    }
    setField("email", trimmed);
    setField("newsletter", newsletter);
    setField("otp", "");
    router.push("/signup/otp");
  };

  return (
    <WizardShell step="email">
      <div className="mt-16 flex flex-col">
        <h1 className="mb-6 text-[26px] font-bold">Enter your email</h1>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col">
          <Input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoFocus
            placeholder="Email"
            aria-label="Email"
            value={email}
            error={error}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => email.length > 0 && setTouched(true)}
          />

          <Button type="submit" loading={loading} disabled={!isValid} className="mt-1">
            Proceed
          </Button>

          <label className="mt-4 flex cursor-pointer items-center gap-3 text-[15px] text-white">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="h-[22px] w-[22px] shrink-0 cursor-pointer appearance-none rounded border-2 border-neutral-500 bg-transparent transition-colors checked:border-white checked:bg-white"
              style={{
                backgroundImage: newsletter
                  ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='black'%3E%3Cpath d='M12.7 4.7a1 1 0 0 0-1.4-1.4L6.5 8.09 4.7 6.3a1 1 0 0 0-1.4 1.4l2.5 2.5a1 1 0 0 0 1.4 0l5.5-5.5z'/%3E%3C/svg%3E\")"
                  : undefined,
                backgroundSize: "100%",
              }}
            />
            <span>I&apos;d like to subscribe to your newsletter</span>
          </label>
        </form>
      </div>
    </WizardShell>
  );
}
