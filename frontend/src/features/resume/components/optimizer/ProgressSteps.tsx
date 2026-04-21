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
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center max-w-2xl mx-auto">
        {steps.map((s, idx) => (
          <div key={s.num} className="flex items-center">
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
                  "h-0.5 w-24 mx-4 transition-colors",
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
