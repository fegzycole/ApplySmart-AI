import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

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
    <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
      {showBack && onBack && (
        <Button
          onClick={onBack}
          variant="outline"
          className="h-12 w-full sm:flex-1 rounded-xl"
          disabled={isSubmitting}
        >
          Back
        </Button>
      )}
      
      {onNext && (
        <Button
          onClick={onNext}
          disabled={nextDisabled}
          className="h-12 w-full sm:flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white"
        >
          Continue
          <ArrowRight className="size-4 ml-2" />
        </Button>
      )}

      {onSubmit && (
        <Button
          onClick={onSubmit}
          disabled={submitDisabled || isSubmitting}
          className="h-12 w-full sm:flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold shadow-lg shadow-violet-500/50"
        >
          {isSubmitting ? (
            <>
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Optimizing...
            </>
          ) : (
            <>
              <Sparkles className="size-4 mr-2" />
              Optimize Resume
            </>
          )}
        </Button>
      )}
    </div>
  );
}
