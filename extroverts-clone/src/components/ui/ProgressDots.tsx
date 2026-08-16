import { WIZARD_STEPS } from "@/types/wizard";

export default function ProgressDots({ current }: { current: number }) {
  return (
    <div
      className="flex items-center gap-2"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={WIZARD_STEPS.length}
      aria-valuenow={current}
      aria-label={`Step ${current} of ${WIZARD_STEPS.length}`}
    >
      {WIZARD_STEPS.map((_, i) => {
        const stepNo = i + 1;
        const isDone = stepNo < current;
        const isActive = stepNo === current;
        return (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              isActive ? "bg-accent" : isDone ? "bg-accent/50" : "bg-border-default"
            }`}
          />
        );
      })}
    </div>
  );
}
