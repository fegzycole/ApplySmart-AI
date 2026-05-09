import { motion } from "framer-motion";
import { Sparkles, Loader2, Zap } from "lucide-react";
import { SYNTHESIS_STAGE_STYLES } from "../../constants/cover-letter.constants";

export function SynthesisProgress() {
  return (
    <div className={SYNTHESIS_STAGE_STYLES.panel}>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-sky-500/10 animate-pulse" />
      
      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center space-y-8 sm:p-14 sm:space-y-10 lg:p-20 lg:space-y-12">
        <div className="relative">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-amber-50 text-amber-600 shadow-2xl shadow-amber-500/20 dark:bg-amber-900/20 dark:text-amber-400 sm:h-32 sm:w-32 sm:rounded-[3rem]">
            <Sparkles className="size-12 animate-pulse sm:size-16" />
            <motion.div
              className="absolute inset-0 rounded-[2.5rem] border-4 border-amber-500/30 sm:rounded-[3rem]"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 shadow-xl border-2 border-sky-500 sm:-top-4 sm:-right-4 sm:h-12 sm:w-12 sm:rounded-2xl">
            <Loader2 className="size-5 text-sky-500 animate-spin sm:size-6" />
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 uppercase sm:text-4xl">
            Synthesis <span className="text-amber-500">In Progress</span>
          </h2>
          <p className="text-base font-medium text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto sm:text-lg">
            Assembling narrative fragments and aligning achievements with the role blueprint.
          </p>
        </div>

        <div className="w-full max-w-xs space-y-3">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <span>Neural Alignment</span>
            <span className="text-amber-500">Active</span>
          </div>
          <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-500 to-sky-500"
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            <Zap className="size-3" />
            Quantum Narrative Assembly
          </div>
        </div>
      </div>
    </div>
  );
}
