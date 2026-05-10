import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface DashboardMetricCardProps {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
}

export function DashboardMetricCard({ label, value, hint, icon: Icon }: DashboardMetricCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative overflow-hidden rounded-[2.5rem] border border-zinc-100 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] transition-all duration-700 hover:border-sky-500/30 hover:shadow-[0_48px_96px_-16px_rgba(0,0,0,0.1)] dark:border-zinc-800/40 dark:bg-zinc-900/40"
    >
      {/* Material Textures */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAA699uFAAAABlBMVEUAAAD///+l2Z/dAAAAbUlEQVR42u3TQQqAMAgE0On9T+0v7L8EByIidD+YByIs6v3mAs6C6Iu6v9mAsyD6ou5vNuAsyD6ou5vNuAsiL6o+5sNOAuiL+r+ZgPOguiLur/ZgLMg+qLubzbgLIi+qPubDTgLoi/q/mYDzoLoi7q/2YCzIPrqX74AGoUBFv6Zk0UAAAAASUVORK5CYII=")`, backgroundRepeat: 'repeat' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      <div className="relative z-10 space-y-4 p-5 sm:p-6 xl:p-8">
        <div className="flex items-start justify-between">
          <div className="space-y-1 min-w-0 flex-1 pr-2">
             <p className="truncate text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 group-hover:text-zinc-600 transition-colors dark:group-hover:text-zinc-300">
               {label}
             </p>
             <div className="h-0.5 w-8 bg-sky-500/20 rounded-full group-hover:w-12 transition-all duration-700" />
          </div>

          <div className="relative shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-xl transition-all duration-700 group-hover:bg-sky-600 group-hover:rotate-12 dark:bg-zinc-800 xl:h-12 xl:w-12">
              <Icon className="size-5 xl:size-6" />
            </div>
            <motion.div 
              className="absolute inset-0 rounded-2xl bg-sky-500/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 xl:text-4xl 2xl:text-5xl">
            {value}
          </span>
          <div className="flex items-start gap-3">
            <div className="mt-[0.22rem] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500 animate-pulse" />
            <p className="text-[11px] font-bold uppercase leading-[1.1] tracking-widest text-zinc-400 group-hover:text-zinc-600 transition-colors dark:group-hover:text-zinc-300">
              {hint}
            </p>
          </div>
        </div>
      </div>

      {/* Internal System Readout - Reveal on Hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}
