import { ShieldAlert } from "lucide-react";
import { DeleteAccountAction } from "./DeleteAccountAction";
import { motion } from "framer-motion";

interface DangerZoneProps {
  isReady: boolean;
}

export function DangerZone({ isReady }: DangerZoneProps) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border-0 bg-transparent p-0 shadow-none transition-all duration-500 dark:bg-transparent sm:rounded-[2.5rem] sm:border-2 sm:border-rose-100 sm:bg-rose-50/20 sm:p-6 sm:shadow-xl sm:hover:-translate-y-1 dark:sm:border-rose-900/20 dark:sm:bg-rose-950/5 lg:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
      
      <div className="relative z-10 space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6 lg:gap-8">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-xl shadow-rose-500/20">
            <ShieldAlert className="size-8" />
            <motion.div 
              className="absolute inset-0 rounded-2xl bg-rose-500/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <h3 className="text-2xl font-black tracking-tighter text-rose-600 dark:text-rose-400 uppercase leading-none">
              Termination <span className="text-rose-700 dark:text-rose-300">Protocol</span>
            </h3>
            <div className="flex items-start gap-2">
              <div className="mt-[0.18rem] h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500 animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-[0.24em] leading-[1.1] text-rose-600/60 dark:text-rose-400/60">
                Critical System Actions
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.5rem] border-0 bg-transparent p-0 shadow-none dark:bg-transparent sm:rounded-[2rem] sm:border-2 sm:border-rose-100 sm:bg-white sm:p-6 sm:shadow-inner dark:sm:border-rose-900/30 dark:sm:bg-zinc-950 lg:p-8">
           <DeleteAccountAction isReady={isReady} />
        </div>
      </div>
    </div>
  );
}
