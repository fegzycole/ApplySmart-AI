import { Button } from "@/shared/components/ui/button";
import { Sparkles, Loader2, Zap } from "lucide-react";

interface GenerateButtonProps {
  generating: boolean;
}

export function GenerateButton({ generating }: GenerateButtonProps) {
  return (
    <Button
      type="submit"
      disabled={generating}
      className="relative w-full h-14 rounded-xl bg-zinc-900 dark:bg-sky-600 text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(14,165,233,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 overflow-hidden group sm:h-16 sm:rounded-[1.25rem] sm:tracking-[0.25em] sm:text-[12px] lg:h-20 lg:rounded-[1.5rem] lg:tracking-[0.3em] lg:text-[13px]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {generating ? (
        <div className="flex items-center gap-3">
          <Loader2 className="size-5 animate-spin sm:size-6" />
          <span>Synthesis Active...</span>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Sparkles className="size-5 sm:size-6" />
          <span className="sm:hidden">Synthesize</span>
          <span className="hidden sm:inline">Initiate Narrative Synthesis</span>
          <Zap className="hidden size-5 text-amber-400 group-hover:animate-pulse sm:inline sm:size-5" />
        </div>
      )}
    </Button>
  );
}
