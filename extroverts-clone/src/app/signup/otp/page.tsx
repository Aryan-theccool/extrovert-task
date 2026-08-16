"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import WizardShell from "@/components/wizard/WizardShell";
import OtpInput from "@/components/ui/OtpInput";
import Button from "@/components/ui/Button";
import { useWizard } from "@/context/WizardContext";
import { sendOtp, verifyOtp } from "@/lib/mockApi";

const RESEND_COOLDOWN = 30;

export default function OtpPage() {
  const router = useRouter();
  const { state, setField } = useWizard();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

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
    toast.success("Email verified!");
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
    setCooldown(RESEND_COOLDOWN);
    setCode("");
    setError(null);
  };

  return (
    <WizardShell
      step="otp"
      heading="Check your inbox"
      subtext={`We sent a 6-digit code to ${state.email || "your email"}. Enter it below to verify.`}
    >
      <form onSubmit={handleVerify} className="flex flex-1 flex-col">
        <OtpInput value={code} onChange={(v) => { setCode(v); setError(null); }} error={!!error} disabled={verifying} />

        <div className="mt-3 min-h-[18px]">
          {error && (
            <p role="alert" className="text-xs text-error">
              {error}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-1 text-sm text-text-secondary">
          <span>Didn&apos;t get it?</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || resending}
            className="font-semibold text-white underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:text-text-muted disabled:no-underline"
          >
            {resending
              ? "Resending..."
              : cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Resend code"}
          </button>
        </div>

        <p className="mt-2 text-xs text-text-muted">
          Demo tip: the mock verification code is <span className="font-semibold text-text-secondary">123456</span>.
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Button type="submit" loading={verifying} disabled={code.length !== 6}>
            {verifying ? "Verifying..." : "Verify"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/signup/email")}
          >
            Go Back
          </Button>
        </div>
      </form>
    </WizardShell>
  );
}
