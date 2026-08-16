"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWizard } from "@/context/WizardContext";
import Logo from "@/components/ui/Logo";
import OtpInput from "@/components/ui/OtpInput";
import OtpNotification from "@/components/ui/OtpNotification";
import Button from "@/components/ui/Button";
import { sendOtp, verifyOtp } from "@/lib/mockApi";

const RESEND_COOLDOWN = 30;

/**
 * OTP screen — centered logo, "ENTER OTP" label, 6 boxes, Resend link,
 * VERIFY / GO BACK buttons and the "sent to <email>" note, matching the
 * reference app. Improvements: discrete boxes with paste support and a
 * visible resend countdown.
 */
export default function OtpPage() {
  const router = useRouter();
  const { state, setField, isStepAllowed } = useWizard();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const [notifKey, setNotifKey] = useState(0);

  const allowed = isStepAllowed("otp");
  useEffect(() => {
    if (!allowed) router.replace("/signup/email");
  }, [allowed, router]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  if (!allowed) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6 || verifying) return;

    setVerifying(true);
    setError(null);
    const res = await verifyOtp(state.email, code);
    setVerifying(false);

    if (!res.success) {
      setError(res.error ?? "Invalid code.");
      setCode("");
      return;
    }
    setField("otp", code);
    setField("isVerified", true);
    router.push("/signup/username");
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    const res = await sendOtp(state.email);
    setResending(false);
    if (!res.success) {
      toast.error(res.error ?? "Couldn't resend the code.");
      return;
    }
    toast.success("A fresh code is on its way.");
    setNotifKey((k) => k + 1); // re-trigger the inbox notification
    setCooldown(RESEND_COOLDOWN);
    setCode("");
    setError(null);
  };

  return (
    <main className="flex flex-1 flex-col pb-6 pt-8 animate-fade-up">
      {/* Simulated inbox notification carrying the mock OTP */}
      <OtpNotification key={notifKey} email={state.email} delay={notifKey === 0 ? 1600 : 900} />

      <div className="flex justify-center">
        <Logo size={44} />
      </div>

      <form onSubmit={handleVerify} className="mt-12 flex flex-1 flex-col">
        <p className="mb-4 text-[15px] font-medium uppercase tracking-[0.02em] text-neutral-200">
          Enter OTP
        </p>

        <OtpInput
          value={code}
          onChange={(v) => {
            setCode(v);
            setError(null);
          }}
          error={!!error}
          disabled={verifying}
        />

        <div className="mt-2 flex items-center justify-between gap-2">
          <p role="alert" className="min-h-[18px] text-[13px] text-error">
            {error ?? ""}
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || resending}
            className="shrink-0 text-sm text-neutral-400 underline-offset-2 hover:text-white hover:underline disabled:cursor-not-allowed disabled:text-neutral-600 disabled:no-underline"
          >
            {resending
              ? "Resending..."
              : cooldown > 0
                ? `Resend OTP in ${cooldown}s`
                : "Resend OTP"}
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <Button type="submit" loading={verifying} disabled={code.length !== 6}>
            Verify
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/signup/email")}
          >
            Go Back
          </Button>
        </div>

        <p className="mt-5 text-center text-[13px] text-neutral-500">
          ⓘ A 6-digit OTP has been sent to {state.email || "your email"}.
        </p>
      </form>
    </main>
  );
}
