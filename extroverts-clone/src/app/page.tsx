import Link from "next/link";
import PhoneFrame from "@/components/layout/PhoneFrame";

/** Landing / splash screen — logo, gradient blob, tagline, entry CTA. */
export default function SplashPage() {
  return (
    <PhoneFrame>
      <main className="relative flex flex-1 flex-col items-center justify-between overflow-hidden py-14">
        {/* Wordmark */}
        <div className="z-10 mt-16 flex flex-col items-center gap-3 animate-fade-up">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-start to-gradient-end text-5xl font-bold shadow-[0_0_60px_rgba(233,30,140,0.35)]">
            E
          </div>
          <span className="text-lg font-semibold tracking-[0.35em]">
            EXTROVERTS
          </span>
        </div>

        {/* Gradient blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-120px] left-1/2 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-gradient-start to-gradient-end opacity-60 blur-[90px] animate-blob"
        />

        <div className="z-10 flex w-full flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-[28px] font-bold leading-tight tracking-[-0.02em]">
              AN APP ONLY
              <br />
              FOR EXTROVERTS
            </h1>
            <p className="text-xs italic text-text-secondary">
              introverts, proceed at your own risk.
            </p>
          </div>
          <Link
            href="/terms"
            className="flex h-12 w-full items-center justify-center rounded-lg bg-white text-[15px] font-semibold text-black transition-colors hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            GET STARTED
          </Link>
        </div>
      </main>
    </PhoneFrame>
  );
}
