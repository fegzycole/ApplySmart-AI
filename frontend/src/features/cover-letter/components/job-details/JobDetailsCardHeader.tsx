import { Target } from "lucide-react";

export function JobDetailsCardHeader() {
  return (
    <div className="flex items-center gap-6">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-2xl shadow-amber-500/30">
        <Target className="size-8" />
        <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-background p-1 shadow-lg">
          <div className="h-full w-full rounded-full bg-amber-500 animate-pulse" />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none">
          Blueprint <span className="text-amber-500">Specification</span>
        </h3>
        <div className="mt-2 flex items-start gap-2">
          <div className="mt-[0.22rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.24em] leading-[1.1] text-amber-600 dark:text-amber-400">
            Stage 01: Parameter Alignment
          </span>
        </div>
      </div>
    </div>
  );
}
