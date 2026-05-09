import { motion } from "framer-motion";
import { ListChecks, CheckCircle2 } from "lucide-react";
import { OPTIMIZER_STYLES } from "../../constants/optimizer.constants";

interface ChangesListProps {
  changes: string[];
}

export function ChangesList({ changes }: ChangesListProps) {
  return (
    <div className={OPTIMIZER_STYLES.cardClassName}>
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-900/5 dark:bg-white/5 backdrop-blur-xl sm:p-6 lg:p-10">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-xl dark:bg-sky-600 sm:h-14 sm:w-14 sm:rounded-2xl">
            <ListChecks className="size-5 sm:size-8" />
            <motion.div
              className="absolute inset-0 rounded-xl bg-sky-500/20 sm:rounded-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          <div>
            <h3 className="text-base font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none sm:text-2xl">Structural <span className="text-sky-600 dark:text-sky-400">Log</span></h3>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-1 sm:text-[10px] sm:tracking-[0.3em] sm:mt-2">Neural Modification Archive</p>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 sm:p-5 sm:space-y-4 lg:p-8 lg:max-h-[600px]">
        {changes.length > 0 ? (
          changes.map((change, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="group flex gap-3 p-3 rounded-[1.5rem] border-2 border-zinc-50 bg-white/40 dark:bg-zinc-800/20 dark:border-zinc-800 transition-all duration-500 hover:border-sky-500/30 hover:bg-white dark:hover:bg-zinc-800/40 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-none sm:gap-5 sm:p-4 sm:rounded-[2rem] lg:p-5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400 group-hover:bg-sky-600 group-hover:text-white transition-all sm:h-10 sm:w-10 sm:rounded-xl">
                <CheckCircle2 className="size-4 sm:size-5" />
              </div>
              <p className="text-sm font-bold leading-relaxed text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors pt-0.5 sm:text-[15px] sm:pt-1.5">
                {change}
              </p>
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center space-y-6">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-zinc-50 text-zinc-200 dark:bg-zinc-900 dark:text-zinc-800 shadow-inner transition-transform group-hover:scale-110">
              <ListChecks className="size-12" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400">No modification fragments detected</p>
          </div>
        )}
      </div>
    </div>
  );
}
