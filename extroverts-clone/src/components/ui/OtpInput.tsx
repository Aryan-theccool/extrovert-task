"use client";

import React, { useRef, useEffect } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}

/**
 * 6-box OTP input: auto-advance on entry, backspace focuses previous box,
 * pasting a full code distributes across all boxes, numeric-only.
 * (Improvement over the source app's plain single-field OTP entry.)
 */
export default function OtpInput({
  value,
  onChange,
  length = 6,
  error = false,
  disabled = false,
  autoFocus = true,
}: Props) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus();
  }, [autoFocus]);

  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const setDigit = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join(""));
  };

  const handleChange = (index: number, raw: string) => {
    const clean = raw.replace(/\D/g, "");
    if (!clean) {
      setDigit(index, "");
      return;
    }
    if (clean.length > 1) {
      // Paste or fast multi-entry — distribute across boxes
      const next = digits.slice();
      let i = index;
      for (const ch of clean) {
        if (i >= length) break;
        next[i++] = ch;
      }
      onChange(next.join(""));
      refs.current[Math.min(i, length - 1)]?.focus();
      return;
    }
    setDigit(index, clean);
    if (index < length - 1) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
      setDigit(index - 1, "");
      e.preventDefault();
    }
    if (e.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < length - 1) refs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const clean = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!clean) return;
    onChange(clean.padEnd(0, ""));
    refs.current[Math.min(clean.length, length - 1)]?.focus();
  };

  return (
    <div
      className="flex justify-between gap-2"
      role="group"
      aria-label="One-time passcode"
      onPaste={handlePaste}
    >
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          pattern="[0-9]*"
          maxLength={2}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          className={`h-12 w-11 rounded-lg border bg-bg-elevated text-center text-lg font-semibold text-white outline-none transition-colors duration-150 sm:h-[52px] sm:w-12 ${
            error
              ? "border-error"
              : digit
                ? "border-accent"
                : "border-border-default focus:border-accent"
          }`}
        />
      ))}
    </div>
  );
}
