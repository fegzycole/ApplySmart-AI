import { motion } from "framer-motion";
import { AI_FEATURES_DATA } from "../../constants/cover-letter.constants";
import { cn } from "@/shared/lib/utils";

export function AIFeaturesCard() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-white/40 bg-white/20 p-1 backdrop-blur-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] dark:border-zinc-800/50 dark:bg-zinc-950/20">
      {/* Ultra-Realistic Gloss Overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] sm:rounded-[3rem] ring-1 ring-inset ring-white/20 dark:ring-zinc-700/20" />
      
      <div className="relative p-6 sm:p-10 lg:p-12 space-y-8 sm:space-y-12">
        <header className="space-y-2">
          <p className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-zinc-400 dark:text-zinc-500 px-1">
            System Intelligence
          </p>
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 px-1">
            Neural <span className="text-zinc-400">Capabilities</span>
          </h3>
        </header>

        <div className="grid gap-3 sm:gap-4">
          {AI_FEATURES_DATA.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] bg-white/40 dark:bg-zinc-900/40 border border-transparent transition-all duration-500 hover:border-white dark:hover:border-zinc-700 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.05)]"
              >
                <div className={cn(
                  "flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl shadow-inner border border-zinc-100 dark:border-zinc-800 transition-transform duration-500 group-hover:scale-110",
                  "bg-zinc-50 dark:bg-zinc-950",
                  "text-zinc-600 dark:text-zinc-400"
                )}>
                  <Icon className="size-4 sm:size-5" />
                </div>
                
                <div className="space-y-0.5 min-w-0 flex-1">
                  <p className="text-sm sm:text-[15px] font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight leading-tight truncate">
                    {feature.text}
                  </p>
                  <p className="text-[9px] sm:text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest truncate">
                    Active Protocol
                  </p>
                </div>

                {/* Subtle Lighting Accent */}
                <div className={cn(
                  "absolute right-4 sm:right-8 size-1 sm:size-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  feature.gradient.split(' ')[0].replace('from-', 'bg-')
                )} />
              </motion.div>
            );
          })}
        </div>

        <footer className="pt-6 sm:pt-8 border-t border-zinc-100/50 dark:border-zinc-800/50 px-1">
          <div className="flex items-start gap-2 px-2 sm:px-4">
            <div className="mt-[0.22rem] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[9px] sm:text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.18em] sm:tracking-[0.2em] leading-[1.1]">
              Real-time Analysis Engine v4.0
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
