import { motion } from "framer-motion";
import { Sparkles, Loader2, Zap } from "lucide-react";
import { SYNTHESIS_STAGE_STYLES } from "../../constants/cover-letter.constants";

export function SynthesisProgress() {
  return (
    <div className={SYNTHESIS_STAGE_STYLES.panel}>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-sky-500/10 animate-pulse" />
      
      <div className="relative z-10 flex flex-col items-center justify-center p-20 text-center space-y-12">
        <div className="relative">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-[3rem] bg-amber-50 text-amber-600 shadow-2xl shadow-amber-500/20 dark:bg-amber-900/20 dark:text-amber-400">
            <Sparkles className="size-16 animate-pulse" />
            <motion.div 
              className="absolute inset-0 rounded-[3rem] border-4 border-amber-500/30"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="absolute -top-4 -right-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border-2 border-sky-500">
            <Loader2 className="size-6 text-sky-500 animate-spin" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 uppercase">
            Synthesis <span className="text-amber-500">In Progress</span>
          </h2>
          <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
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
