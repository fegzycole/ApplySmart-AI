import { motion } from "framer-motion";
import { Zap, Hash } from "lucide-react";
import { OPTIMIZER_STYLES } from "../../constants/optimizer.constants";

interface KeywordAnalysisCardProps {
  keywords: string[];
}

export function KeywordAnalysisCard({ keywords }: KeywordAnalysisCardProps) {
  if (!keywords?.length) return null;

  return (
    <div className={OPTIMIZER_STYLES.cardClassName}>
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-sky-500/5 dark:bg-sky-500/10 backdrop-blur-xl sm:p-6 lg:p-10">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-xl dark:bg-sky-600 sm:h-14 sm:w-14 sm:rounded-2xl">
            <Hash className="size-5 sm:size-8" />
            <motion.div
              className="absolute inset-0 rounded-xl bg-sky-500/20 sm:rounded-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          <div>
            <h3 className="text-base font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none sm:text-2xl">Keyword <span className="text-sky-600 dark:text-sky-400">Density</span></h3>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-1 sm:text-[10px] sm:tracking-[0.3em] sm:mt-2">Neural Indexed Fragments</p>
          </div>
        </div>
      </div>

      <div className="px-0 py-2 sm:p-6 lg:p-10">
        <div className="p-4 rounded-[1.5rem] bg-zinc-900/5 dark:bg-white/5 border border-zinc-100 dark:border-zinc-800 shadow-inner sm:p-6 sm:rounded-[2rem] lg:p-8 lg:rounded-[2.5rem]">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {keywords.map((kw, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="group flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-zinc-50 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-black uppercase tracking-tight transition-all hover:border-sky-500 hover:text-sky-600 hover:scale-110 cursor-default shadow-sm hover:shadow-xl hover:shadow-sky-500/10"
              >
                <Zap className="size-3.5 shrink-0 text-sky-500 transition-transform group-hover:rotate-12" />
                {kw}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
