"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import PhoneFrame from "@/components/layout/PhoneFrame";
import Button from "@/components/ui/Button";

/**
 * Terms & Conditions screen — full-screen uppercase manifesto with
 * purple-highlighted keywords and a single ACCEPT button, matching
 * the reference app.
 */
export default function TermsPage() {
  const router = useRouter();

  return (
    <PhoneFrame>
      <main className="flex min-h-dvh flex-col pb-10 pt-8 animate-fade-up">
        <Logo size={44} />

        <div className="mt-16 flex-1">
          <p className="text-[21px] font-bold uppercase leading-[1.55] tracking-[0.01em]">
            By using this app, you&apos;re agreeing to keep things fun, safe, and
            respectful... and also agreeing to our{" "}
            <button
              type="button"
              onClick={() => alert("Demo: full terms would open here.")}
              className="underline decoration-2 underline-offset-4 hover:text-neutral-300"
            >
              terms and conditions
            </button>
            . Politeness is a must—treat others how you&apos;d want to be treated.
            Everyone here is looking for reasons to{" "}
            <span className="text-[#8B5CF6]">party</span>, so bring your best
            vibe and expect the same from others. Let&apos;s party responsibly
            and make every experience a great one!
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm text-neutral-500">
            To proceed, accept{" "}
            <span className="font-medium text-white">Terms and Conditions</span>
          </p>
          <Button onClick={() => router.push("/signup/email")}>Accept</Button>
        </div>
      </main>
    </PhoneFrame>
  );
}
