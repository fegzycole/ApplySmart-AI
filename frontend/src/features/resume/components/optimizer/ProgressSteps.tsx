import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { Microscope, Target, Cpu } from "lucide-react";

interface ProgressStepsProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { num: 1, label: 'Initialize Specimen', icon: Microscope },
  { num: 2, label: 'Blueprint Definition', icon: Target },
  { num: 3, label: 'Neural Calibration', icon: Cpu }
];

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const currentIndex = currentStep - 1;
  const CurrentStepIcon = steps[currentIndex]?.icon;

  return (
    <div className="relative">
      {/* Mobile Reactor View */}
      <div className="sm:hidden rounded-[1.75rem] border-2 border-white/60 bg-white/40 p-4 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-900/40">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.875rem] bg-zinc-900 text-white shadow-2xl dark:bg-sky-600">
              {CurrentStepIcon ? <CurrentStepIcon className="size-5" /> : null}
              <motion.div
                className="absolute inset-0 rounded-[0.875rem] bg-sky-500/20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400">
                Phase 0{currentStep} of {steps.length}
              </p>
              <p className="text-sm font-black tracking-tight text-zinc-900 dark:text-zinc-50 uppercase leading-none mt-0.5 truncate">
                {steps[currentIndex].label}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {steps.map((step) => (
              <div
                key={step.num}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-700",
                  currentStep === step.num ? "w-5 bg-sky-600 dark:bg-sky-500" : "w-1.5 bg-zinc-200 dark:bg-zinc-800"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Reactor View */}
      <div className="hidden sm:block">
        <div className="relative flex items-center justify-between max-w-4xl mx-auto px-4 sm:px-8">
          {/* Progress Connector Line */}
          <div className="absolute top-[32px] left-12 right-12 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
          <motion.div 
            className="absolute top-[32px] left-12 h-1 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full shadow-[0_0_20px_rgba(14,165,233,0.4)]"
            initial={false}
            animate={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 24px)` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />

          {steps.map((s) => (
            <div key={s.num} className="relative flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: currentStep === s.num ? 1.1 : 1,
                  opacity: currentStep >= s.num ? 1 : 0.4,
                }}
                className={cn(
                  "relative z-10 flex h-16 w-16 items-center justify-center rounded-[1.5rem] border-4 transition-all duration-700",
                  currentStep >= s.num
                    ? "border-white bg-zinc-900 text-white shadow-2xl dark:bg-zinc-950 dark:border-zinc-800"
                    : "border-zinc-50 bg-white text-zinc-300 dark:bg-zinc-900 dark:border-zinc-800"
                )}
              >
                <s.icon className={cn("size-7 transition-transform duration-700", currentStep === s.num && "scale-110")} />
                
                {currentStep === s.num && (
                  <motion.div 
                    layoutId="reactor-glow"
                    className="absolute -inset-4 rounded-[2rem] bg-sky-500/10 blur-xl -z-10"
                  />
                )}
              </motion.div>
              
              <div className="mt-8 text-center min-w-max">
                <p className={cn(
                  "text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-700",
                  currentStep >= s.num ? "text-sky-600 dark:text-sky-400" : "text-zinc-400"
                )}>
                  Protocol 0{s.num}
                </p>
                <p className={cn(
                  "mt-2 text-xs sm:text-sm font-black uppercase tracking-tight transition-colors duration-700",
                  currentStep >= s.num ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-300 dark:text-zinc-700"
                )}>
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
