import { motion } from "framer-motion";
import { Settings, Activity } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { TERMINAL_STYLES } from "../../constants/settings.constants";

export function SettingsHeader() {
  return (
    <div className={cn(TERMINAL_STYLES.header.container, "space-y-6 sm:space-y-10 pb-10 sm:pb-16 mb-10 sm:mb-16 px-4")}>
      {/* Immersive Background Glow */}
      <div className={cn(TERMINAL_STYLES.header.glow, "h-48 sm:h-64")} />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className={cn(TERMINAL_STYLES.header.iconWrapper, "shrink-0 h-20 w-20 sm:h-24 sm:w-24")}
      >
        <Settings className="size-10 sm:size-12" />
        <motion.div 
          className="absolute inset-0 rounded-[1.75rem] sm:rounded-[2.5rem] bg-sky-200/20 dark:bg-sky-400/10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="space-y-4 sm:space-y-6 w-full max-w-4xl">
        <h1 className={cn(TERMINAL_STYLES.header.title, "text-4xl sm:text-6xl lg:text-8xl break-words font-black tracking-tighter leading-[0.85] uppercase")}>
          System <span className="text-sky-600 dark:text-sky-400 drop-shadow-[0_0_25px_rgba(14,165,233,0.4)]">Configuration</span>
        </h1>
        <p className="text-base sm:text-xl lg:text-2xl text-zinc-500 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight dark:text-zinc-400 px-4">
          Calibrate your <span className="text-zinc-900 dark:text-zinc-100 font-bold">core identity vectors</span> and manage the underlying infrastructure of your career engine.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4">
        <div className="group flex items-center gap-2.5 sm:gap-3 rounded-full border-2 border-sky-200/20 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl text-sky-600 dark:text-sky-400 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] shadow-lg shadow-sky-500/5 transition-all hover:border-sky-500/40">
          <div className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-sky-500"></span>
          </div>
          Node: User-Core-44 Active
        </div>

        <div className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] sm:text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30">
          <Activity className="size-3 sm:size-3.5 shrink-0" />
          <span className="leading-none">Health: Optimal</span>
        </div>
      </div>
    </div>
  );
}
