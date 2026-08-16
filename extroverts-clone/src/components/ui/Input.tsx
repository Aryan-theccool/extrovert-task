"use client";

import React, { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  hint?: string;
  counter?: { value: number; max: number };
}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, hint, counter, id, className = "", ...rest },
  ref
) {
  const inputId = id || rest.name || label;
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`h-12 w-full rounded-lg border bg-bg-elevated px-4 text-[15px] text-white placeholder:text-text-muted outline-none transition-colors duration-150 ${
          error
            ? "border-error focus:border-error"
            : "border-border-default focus:border-accent"
        } ${className}`}
        {...rest}
      />
      <div className="flex min-h-[16px] items-start justify-between gap-2">
        {error ? (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-error">
            {error}
          </p>
        ) : hint ? (
          <p className="text-xs text-text-muted">{hint}</p>
        ) : (
          <span />
        )}
        {counter && (
          <span
            className={`shrink-0 text-xs tabular-nums ${
              counter.value > counter.max ? "text-error" : "text-text-muted"
            }`}
          >
            {counter.value}/{counter.max}
          </span>
        )}
      </div>
    </div>
  );
});

export default Input;
