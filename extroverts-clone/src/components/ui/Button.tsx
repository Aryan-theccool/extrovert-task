"use client";

import React from "react";
import Spinner from "./Spinner";

type Variant = "primary" | "secondary" | "ghost";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

const base =
  "w-full h-12 rounded-lg text-[15px] font-semibold tracking-wide transition-colors duration-150 flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary: "bg-white text-black hover:bg-neutral-200 active:bg-neutral-300",
  secondary:
    "bg-transparent text-white border border-border-default hover:bg-bg-elevated active:bg-bg-elevated-2",
  ghost: "bg-transparent text-text-secondary hover:text-white",
};

export default function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
