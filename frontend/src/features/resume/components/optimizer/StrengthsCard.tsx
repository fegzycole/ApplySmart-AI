import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { OPTIMIZER_STYLES } from "../../constants/optimizer.constants";

interface StrengthsCardProps {
  strengths: string[];
}

export function StrengthsCard({ strengths }: StrengthsCardProps) {
  if (!strengths?.length) return null;

  return (
    <div className={OPTIMIZER_STYLES.cardClassName}>
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-emerald-500/5 dark:bg-emerald-500/10 backdrop-blur-xl sm:p-6 lg:p-10">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 sm:h-14 sm:w-14 sm:rounded-2xl">
            <ShieldCheck className="size-5 sm:size-8" />
            <motion.div
              className="absolute inset-0 rounded-xl bg-emerald-500/20 sm:rounded-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          <div>
            <h3 className="text-base font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none sm:text-2xl">Alignment <span className="text-emerald-500">Strengths</span></h3>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-1 sm:text-[10px] sm:tracking-[0.3em] sm:mt-2">Verified Resonance Markers</p>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3 sm:p-5 sm:space-y-4 lg:p-8">
        {strengths.map((strength, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group flex items-start gap-3 p-3 rounded-[1.5rem] border-2 border-zinc-50 bg-white/40 dark:bg-zinc-800/20 dark:border-zinc-800 transition-all duration-500 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-zinc-800/40 sm:gap-5 sm:p-4 sm:rounded-[2rem] lg:p-5"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all sm:h-10 sm:w-10 sm:rounded-xl">
              <CheckCircle2 className="size-4 sm:size-5" />
            </div>
            <p className="text-sm font-bold leading-relaxed text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors pt-0.5 sm:text-[15px] sm:pt-1.5">
              {strength}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
