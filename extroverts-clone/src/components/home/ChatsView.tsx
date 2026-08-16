"use client";

import { useState } from "react";
import Logo from "@/components/ui/Logo";

/**
 * Chats tab — replicates the app's BEFORE-HOURS / AFTERPARTY screens:
 * neon script "every friend was once a stranger", empty-state copy and
 * CREATE button, plus the AFTER PARTY banner to flip between modes.
 */
export default function ChatsView({ onCreate }: { onCreate: () => void }) {
  const [mode, setMode] = useState<"before" | "after">("before");

  return (
    <div className="flex min-h-dvh flex-col pb-28 pt-6 animate-fade-up">
      <header className="flex items-center justify-between">
        <Logo size={36} />
        <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-neutral-300">
          {mode === "before" ? "Before-Hours" : "Afterparty"}
        </span>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <p
          className="select-none text-[44px] leading-tight text-[#FF4E9A]"
          style={{
            fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
            textShadow:
              "0 0 12px rgba(255,78,154,0.9), 0 0 40px rgba(255,78,154,0.6), 0 0 80px rgba(233,30,140,0.4)",
            transform: "rotate(-6deg)",
          }}
        >
          every
          <br />
          friend
          <br />
          was once a
          <br />
          stranger
        </p>

        <div className="flex w-full flex-col items-center gap-4">
          <p className="max-w-[260px] text-sm text-neutral-400">
            {mode === "before" ? (
              <>
                Your <span className="font-semibold text-white">planned events</span>{" "}
                and <span className="font-semibold text-white">group chats</span>{" "}
                appear here
              </>
            ) : (
              <>
                Your <span className="font-semibold text-white">completed events</span>{" "}
                and <span className="font-semibold text-white">superlatives</span>{" "}
                appear here
              </>
            )}
          </p>
          <button
            onClick={onCreate}
            className="h-[52px] w-full rounded-lg bg-white text-[15px] font-semibold uppercase tracking-wide text-black transition-colors hover:bg-neutral-200"
          >
            Create
          </button>
        </div>
      </div>

      {mode === "before" ? (
        <button
          onClick={() => setMode("after")}
          className="mt-6 flex w-full items-center justify-between rounded-lg border border-dashed border-[#E91E8C]/60 px-4 py-3.5 text-left transition-colors hover:bg-[#E91E8C]/10"
        >
          <span>
            <span className="flex items-center gap-2 text-[15px] font-bold uppercase tracking-wide text-[#FF4E9A]">
              🎉 After Party
            </span>
            <span className="text-xs text-neutral-400">
              See your complete events and share memories
            </span>
          </span>
          <span aria-hidden className="text-neutral-400">
            ›
          </span>
        </button>
      ) : (
        <button
          onClick={() => setMode("before")}
          className="mt-6 h-[52px] w-full rounded-lg border border-neutral-600 text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-900"
        >
          Exit
        </button>
      )}
    </div>
  );
}
