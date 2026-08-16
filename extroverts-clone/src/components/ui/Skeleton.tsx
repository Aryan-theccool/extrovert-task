"use client";

/**
 * IMPROVEMENT: Skeleton/Shimmer loading component
 * Shows a placeholder while data is loading, better than blank screens
 * Used during API calls for better perceived performance
 */
export function InputSkeleton() {
  return (
    <div className="h-[54px] w-full rounded-lg bg-neutral-800 animate-pulse" />
  );
}

export function TextSkeleton({ lines = 2 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 rounded-lg bg-neutral-800 animate-pulse ${
            i === lines - 1 ? "w-3/4" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-neutral-700 bg-[#0A0A0A] p-4">
      <div className="h-6 w-1/3 rounded-lg bg-neutral-800 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded-lg bg-neutral-800 animate-pulse" />
        <div className="h-4 w-5/6 rounded-lg bg-neutral-800 animate-pulse" />
      </div>
    </div>
  );
}
