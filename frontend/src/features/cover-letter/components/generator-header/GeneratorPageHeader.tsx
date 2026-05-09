import { motion } from "framer-motion";
import { Mail, Zap } from "lucide-react";
import { COVER_LETTER_HEADER_CONTENT, SYNTHESIS_STAGE_STYLES } from "../../constants/cover-letter.constants";
import { cn } from "@/shared/lib/utils";

export function GeneratorPageHeader() {
  return (
    <div className="relative flex flex-col items-center text-center space-y-6 sm:space-y-10 px-4">
      {/* Immersive Background Glow */}
      <div className={cn(SYNTHESIS_STAGE_STYLES.header.glow, "h-48 sm:h-64")} />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className={cn(SYNTHESIS_STAGE_STYLES.header.iconWrapper, "shrink-0 h-20 w-20 sm:h-24 sm:w-24")}
      >
        <Mail className="size-10 sm:size-12" />
        <motion.div 
          className="absolute inset-0 rounded-[1.75rem] sm:rounded-[2.5rem] bg-amber-200/20 dark:bg-amber-400/10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="space-y-4 sm:space-y-6 w-full max-w-4xl px-4">
        <h1 className={cn(SYNTHESIS_STAGE_STYLES.header.title, "text-4xl sm:text-6xl lg:text-8xl break-words uppercase font-black tracking-tighter leading-[0.9]")}>
          {COVER_LETTER_HEADER_CONTENT.title.split(' ')[0]} {COVER_LETTER_HEADER_CONTENT.title.split(' ')[1]} <span className="text-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">{COVER_LETTER_HEADER_CONTENT.title.split(' ')[2]}</span>
        </h1>
        <p className="text-base sm:text-xl lg:text-2xl text-zinc-500 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight dark:text-zinc-400 px-4">
          {COVER_LETTER_HEADER_CONTENT.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4">
        <div className="group flex items-center gap-2.5 sm:gap-3 rounded-full border-2 border-amber-200/20 bg-white/40 px-4 sm:px-6 py-2 sm:py-3 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-amber-600 shadow-lg shadow-amber-500/5 backdrop-blur-xl transition-all hover:border-amber-500/40 dark:bg-zinc-900/40 dark:text-amber-400">
          <div className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-amber-500"></span>
          </div>
          <span className="leading-none">{COVER_LETTER_HEADER_CONTENT.badge} ACTIVE</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 rounded-full border border-sky-100 bg-sky-50 px-4 sm:px-5 py-2 sm:py-2.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-sky-700 dark:border-sky-900/30 dark:bg-sky-950/20 dark:text-sky-400">
          <Zap className="size-3 sm:size-3.5 shrink-0" />
          <span className="leading-none">ATS Optimized Output</span>
        </div>
      </div>
    </div>
  );
}
