import { Eye, Loader2, Save } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface PreviewHeaderProps {
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}

export function PreviewHeader({ onSave, saving, disabled }: PreviewHeaderProps) {
  return (
    <div className="group relative flex flex-col gap-4 overflow-hidden rounded-[2rem] border-2 border-primary/20 bg-card/40 p-4 shadow-2xl shadow-primary/5 backdrop-blur-3xl sm:gap-6 sm:rounded-[3rem] sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />
      
      <div className="relative z-10 flex items-center gap-3 sm:gap-6">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/30 transition-transform duration-500 group-hover:scale-110 sm:h-16 sm:w-16 sm:rounded-[1.5rem]">
          <Eye className="size-6 sm:size-8" />
          <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-background p-1 shadow-lg">
            <div className="h-full w-full rounded-full bg-primary animate-pulse" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-black leading-none tracking-tighter text-foreground sm:text-2xl">
            Synthesis <span className="text-primary">Preview</span>
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-primary sm:text-[10px] sm:tracking-[0.3em]">
              Quantum Engine Active
            </p>
          </div>
        </div>
      </div>

      <Button
        size="lg"
        className="group/btn relative z-10 h-12 w-full overflow-hidden rounded-[1.25rem] bg-primary px-5 text-[10px] font-black uppercase tracking-[0.22em] text-primary-foreground shadow-2xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/40 active:scale-95 disabled:opacity-50 disabled:grayscale sm:h-14 sm:rounded-[1.5rem] sm:px-8 sm:text-[11px] sm:tracking-widest lg:w-auto lg:px-10"
        onClick={onSave}
        disabled={disabled || saving}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
        {saving ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin sm:mr-3 sm:size-5" />
            Synthesizing Narrative...
          </>
        ) : (
          <>
            <Save className="mr-2 size-4 sm:mr-3 sm:size-5" />
            Commit to Workspace
          </>
        )}
      </Button>
    </div>
  );
}
