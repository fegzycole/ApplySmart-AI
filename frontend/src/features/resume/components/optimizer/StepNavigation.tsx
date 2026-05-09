import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Sparkles, Loader2, Zap } from "lucide-react";

interface StepNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  nextDisabled?: boolean;
  submitDisabled?: boolean;
  isSubmitting?: boolean;
  showBack?: boolean;
}

export function StepNavigation({
  onBack,
  onNext,
  onSubmit,
  nextDisabled = false,
  submitDisabled = false,
  isSubmitting = false,
  showBack = true,
}: StepNavigationProps) {
  return (
    <div className="flex flex-col-reverse gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-8">
      {showBack && onBack ? (
        <Button
          onClick={onBack}
          variant="ghost"
          size="lg"
          className="h-11 w-full rounded-xl border-2 border-zinc-100 bg-zinc-900/5 text-[10px] font-black uppercase tracking-widest text-zinc-500 transition-all active:scale-95 hover:text-zinc-900 dark:border-zinc-800 dark:bg-white/5 dark:hover:text-zinc-100 sm:h-12 sm:w-auto sm:px-8"
          disabled={isSubmitting}
        >
          Previous Phase
        </Button>
      ) : (
        /* spacer to push primary button right when there's no back button */
        <span />
      )}

      {onNext && (
        <Button
          onClick={onNext}
          disabled={nextDisabled}
          size="lg"
          className="relative h-11 w-full overflow-hidden rounded-xl bg-zinc-900 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-zinc-900/20 transition-all active:scale-95 hover:scale-[1.02] group dark:bg-sky-600 dark:shadow-sky-900/20 sm:h-12 sm:w-auto sm:px-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          Advance Protocol
          <ArrowRight className="ml-2 size-3.5" />
        </Button>
      )}

      {onSubmit && (
        <Button
          onClick={onSubmit}
          disabled={submitDisabled || isSubmitting}
          size="lg"
          className="relative h-11 w-full overflow-hidden rounded-xl bg-zinc-900 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-zinc-900/20 transition-all active:scale-95 hover:scale-[1.02] group dark:bg-sky-600 dark:shadow-sky-900/20 sm:h-12 sm:w-auto sm:px-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              <span>Synthesis Active...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="size-3.5" />
              <span>Initiate Neural Synthesis</span>
              <Zap className="size-3 text-amber-400 group-hover:animate-pulse" />
            </div>
          )}
        </Button>
      )}
    </div>
  );
}
