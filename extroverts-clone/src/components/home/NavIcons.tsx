import React from "react";

/** Outline nav icons matching the reference app's bottom bar. */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HomeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  );
}

export function ChatIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
      <path d="M21 12a8 8 0 0 1-8 8H4l1.6-3.2A8 8 0 1 1 21 12Z" />
      <circle cx="9" cy="12" r="0.5" fill="currentColor" />
      <circle cx="13" cy="12" r="0.5" fill="currentColor" />
      <circle cx="17" cy="12" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function CreateIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M12 8.5v7M8.5 12h7" />
    </svg>
  );
}

export function ProfileIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c1.2-3.2 3.8-5 7-5s5.8 1.8 7 5" />
    </svg>
  );
}
