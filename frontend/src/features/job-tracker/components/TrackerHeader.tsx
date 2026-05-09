import { Compass, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { TRACKER_HEADER_CONTENT } from "../constants/job-tracker.constants";

interface TrackerHeaderProps {
  onAddClick: () => void;
}

export function TrackerHeader({ onAddClick }: TrackerHeaderProps) {
  return (
    <div className="relative flex flex-col items-center text-center space-y-6 sm:space-y-10 pb-10 sm:pb-16 border-b border-zinc-100 mb-10 sm:mb-16 dark:border-zinc-800 px-4">
      {/* Soft Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 sm:h-64 bg-gradient-to-b from-sky-50/50 to-transparent blur-3xl -z-10 dark:from-sky-900/10" />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-[1.75rem] sm:rounded-[2.5rem] bg-sky-50 text-sky-600 shadow-sm dark:bg-sky-900/20 dark:text-sky-400"
      >
        <Compass className="size-10 sm:size-12" />
        <motion.div 
          className="absolute inset-0 rounded-[1.75rem] sm:rounded-[2.5rem] bg-sky-200/20 dark:bg-sky-400/10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 uppercase leading-[0.85]">
          {TRACKER_HEADER_CONTENT.title.split(' ')[0]} <span className="text-sky-600 dark:text-sky-400 drop-shadow-[0_0_25px_rgba(14,165,233,0.4)]">{TRACKER_HEADER_CONTENT.title.split(' ')[1]}</span>
        </h1>
        <p 
          className="text-base sm:text-xl lg:text-2xl text-zinc-500 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight dark:text-zinc-400 px-4"
          dangerouslySetInnerHTML={{ __html: TRACKER_HEADER_CONTENT.description }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] sm:text-xs font-bold tracking-tight border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30">
          <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 animate-pulse" />
          {TRACKER_HEADER_CONTENT.badge} ACTIVE
        </div>

        <Button
          onClick={onAddClick}
          className="h-12 sm:h-14 px-8 sm:px-10 rounded-2xl bg-zinc-900 text-white font-bold tracking-tight shadow-xl shadow-zinc-900/20 hover:scale-105 active:scale-95 transition-all dark:bg-sky-600 dark:shadow-sky-900/20 text-[10px] sm:text-[11px] uppercase tracking-widest"
        >
          <Plus className="mr-2 sm:mr-3 size-4 sm:size-5" />
          {TRACKER_HEADER_CONTENT.buttonText}
        </Button>
      </div>
    </div>
  );
}
