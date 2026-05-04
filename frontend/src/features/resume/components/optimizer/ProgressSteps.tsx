import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

interface ProgressStepsProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { num: 1, label: 'Upload Resume' },
  { num: 2, label: 'Job Details' },
  { num: 3, label: 'Customize' }
];

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const currentIndex = currentStep - 1;
  const progressPercent = (currentStep / steps.length) * 100;

  return (
    <div className="mb-8 sm:mb-12">
      <div className="sm:hidden rounded-2xl border border-violet-200 dark:border-violet-900/60 bg-white/90 dark:bg-zinc-900/90 p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">
              Step {currentStep} of {steps.length}
            </p>
            <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
              {steps[currentIndex]?.label}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {steps.map((step) => (
              <div
                key={step.num}
                className={cn(
                  "size-2.5 rounded-full transition-colors",
                  currentStep >= step.num
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600"
                    : "bg-zinc-200 dark:bg-zinc-700"
                )}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <motion.div
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.25 }}
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
          />
        </div>
      </div>

      <div className="hidden sm:flex sm:items-center sm:justify-center max-w-2xl mx-auto">
        {steps.map((s, idx) => (
          <div key={s.num} className="flex items-center justify-center sm:justify-start">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: currentStep === s.num ? 1.1 : 1,
                }}
                className={cn(
                  "size-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors",
                  currentStep >= s.num
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/50'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'
                )}
              >
                {s.num}
              </motion.div>
              <span className={cn(
                "text-xs mt-2 font-medium transition-colors whitespace-nowrap",
                currentStep >= s.num ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'
              )}>
                {s.label}
              </span>
            </div>
            {idx < 2 && (
              <motion.div
                initial={false}
                className={cn(
                  "hidden sm:block h-0.5 w-16 lg:w-24 mx-3 lg:mx-4 transition-colors",
                  currentStep > s.num
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600'
                    : 'bg-zinc-200 dark:bg-zinc-800'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
