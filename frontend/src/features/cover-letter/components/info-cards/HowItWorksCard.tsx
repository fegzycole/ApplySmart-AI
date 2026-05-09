import { motion } from "framer-motion";
import { SYNTHESIS_STAGE_STYLES, HOW_IT_WORKS_STEPS } from "../../constants/cover-letter.constants";

export function HowItWorksCard() {
  return (
    <div className={SYNTHESIS_STAGE_STYLES.panel}>
      <div className="p-5 space-y-5 sm:p-8 sm:space-y-8 lg:p-10">
        <div className="flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
          <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400">Synthesis Protocol</h4>
        </div>
        
        <div className="space-y-4">
          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-[1.25rem] border-2 border-zinc-100 bg-white dark:bg-zinc-800/30 dark:border-zinc-800/50 transition-all hover:border-sky-500/30 group/step sm:gap-5 sm:p-5 sm:rounded-[1.5rem]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400 group-hover/step:scale-110 transition-transform sm:h-12 sm:w-12">
                  <Icon className="size-5 sm:size-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100 leading-none">
                    {step.title}
                  </p>
                  <p className="text-xs font-medium text-zinc-400 mt-1.5 line-clamp-1">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
