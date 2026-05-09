import { motion } from "framer-motion";
import { Microscope, ShieldCheck } from "lucide-react";

export function OptimizerHeader() {
  return (
    <div className="relative flex flex-col items-center text-center space-y-6 pb-8 border-b border-zinc-100 mb-8 dark:border-zinc-800 sm:space-y-10 sm:pb-12 sm:mb-12 lg:pb-16 lg:mb-16">
      {/* Immersive Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-gradient-to-b from-sky-50/50 to-transparent blur-3xl -z-10 dark:from-sky-900/10 sm:h-64" />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-[2rem] bg-sky-50 text-sky-600 shadow-sm dark:bg-sky-900/20 dark:text-sky-400 sm:h-24 sm:w-24 sm:rounded-[2.5rem]"
      >
        <Microscope className="size-8 sm:size-12" />
        <motion.div
          className="absolute inset-0 rounded-[2rem] bg-sky-200/20 dark:bg-sky-400/10 sm:rounded-[2.5rem]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="space-y-3 sm:space-y-6">
        <h1 className="text-3xl font-black tracking-tighter leading-[0.85] text-zinc-900 dark:text-zinc-100 uppercase sm:text-5xl lg:text-8xl">
          Alignment <span className="text-sky-600 drop-shadow-[0_0_25px_rgba(14,165,233,0.4)]">Lab</span>
        </h1>
        <p className="text-sm text-zinc-500 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight dark:text-zinc-400 sm:text-xl lg:text-2xl">
          Inject your career artifacts into our <span className="text-zinc-900 dark:text-zinc-100 font-bold">neural calibration stage</span>. Align every bullet point with surgical precision to the target mission blueprint.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
        <div className="group flex items-center gap-2.5 px-4 py-2 rounded-full border-2 border-sky-200/20 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-sky-500/5 transition-all hover:border-sky-500/40 sm:gap-3 sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.4em]">
          <div className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500 sm:h-2.5 sm:w-2.5"></span>
          </div>
          Quantum Alignment Active
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30 sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-[10px]">
          <ShieldCheck className="size-3 sm:size-3.5" />
          ATS Verification Protocol
        </div>
      </div>
    </div>
  );
}
