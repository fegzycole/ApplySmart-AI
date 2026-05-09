import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface ResultHeaderProps {
  includesCoverLetter?: boolean;
}

export function ResultHeader({ includesCoverLetter = false }: ResultHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col items-center text-center space-y-6 pb-8 border-b border-zinc-100 mb-8 dark:border-zinc-800 sm:space-y-10 sm:pb-12 sm:mb-12 lg:pb-16 lg:mb-16"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="relative flex h-20 w-20 items-center justify-center rounded-[2rem] bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30 group sm:h-28 sm:w-28 sm:rounded-[2.5rem]"
      >
        <CheckCircle className="size-10 transition-transform group-hover:scale-110 duration-500 sm:size-14" />
        <motion.div
          className="absolute inset-0 rounded-[2rem] bg-emerald-500/20 sm:rounded-[2.5rem]"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Orbiting Elements */}
        <div className="absolute inset-[-20%] border border-emerald-500/10 rounded-full animate-[spin_10s_linear_infinite]" />
      </motion.div>

      <div className="space-y-3 sm:space-y-6">
        <h1 className="text-3xl font-black tracking-tighter leading-[0.85] text-zinc-900 dark:text-zinc-100 uppercase sm:text-5xl lg:text-8xl">
          Synthesis <span className="text-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">Verified</span>
        </h1>
        <p className="text-sm text-zinc-500 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight dark:text-zinc-400 sm:text-xl lg:text-2xl">
          {includesCoverLetter
            ? "Your precision-engineered professional artifacts have been synthesized and verified. The system is ready for mission deployment."
            : "Your professional record has been recalibrated with surgical precision. Artifact resonance is optimized for ATS interception."}
        </p>
      </div>

      <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border-2 border-emerald-500/20 bg-emerald-50/10 backdrop-blur-xl text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-emerald-500/5 sm:gap-3 sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.4em]">
        <div className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 sm:h-2.5 sm:w-2.5"></span>
        </div>
        Protocol Verification Active
      </div>
    </motion.div>
  );
}
