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
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[13px] font-medium uppercase tracking-[0.02em] text-neutral-300"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`h-[54px] w-full rounded-lg border bg-transparent px-4 text-[15px] text-white placeholder:uppercase placeholder:text-neutral-500 outline-none transition-colors duration-150 ${
          error
            ? "border-error focus:border-error"
            : "border-neutral-600 focus:border-white"
        } ${className}`}
        {...rest}
      />
      <div className="flex min-h-[18px] items-start justify-between gap-2">
        {error ? (
          <p id={`${inputId}-error`} role="alert" className="text-[13px] text-error">
            {error}
          </p>
        ) : hint ? (
          <p className="text-[14px] leading-snug text-neutral-400">{hint}</p>
        ) : (
          <span />
        )}
        {counter && (
          <span
            className={`shrink-0 text-xs tabular-nums ${
              counter.value > counter.max ? "text-error" : "text-neutral-500"
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
