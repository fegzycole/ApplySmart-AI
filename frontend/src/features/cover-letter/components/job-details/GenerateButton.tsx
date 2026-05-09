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
      className="relative w-full h-20 rounded-[1.5rem] bg-zinc-900 dark:bg-sky-600 text-white font-black uppercase tracking-[0.3em] text-[13px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(14,165,233,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {generating ? (
        <div className="flex items-center gap-4">
          <Loader2 className="size-6 animate-spin" />
          <span>Synthesis Active...</span>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Sparkles className="size-6" />
          <span>Initiate Narrative Synthesis</span>
          <Zap className="size-5 text-amber-400 group-hover:animate-pulse" />
        </div>
      )}
    </Button>
  );
}
