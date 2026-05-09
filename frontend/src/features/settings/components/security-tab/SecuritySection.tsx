import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface SecuritySectionProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconGradient: string;
  gradient: string;
  border: string;
  children: ReactNode;
}

export function SecuritySection({
  eyebrow,
  title,
  description,
  icon: Icon,
  children
}: SecuritySectionProps) {
  return (
    <div className="group relative mt-2 overflow-hidden rounded-[2rem] border-0 bg-transparent p-0 shadow-none transition-all duration-500 dark:bg-transparent sm:mt-0 sm:rounded-[2.5rem] sm:border-2 sm:border-zinc-100 sm:bg-white/40 sm:p-6 sm:shadow-xl sm:hover:-translate-y-1 dark:sm:border-zinc-800 dark:sm:bg-zinc-900/40 lg:p-8">
      {/* Background Aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/5 via-transparent to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100 dark:from-white/5" />

      <div className="relative z-10 space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6 lg:gap-8">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-xl dark:bg-sky-600">
            <Icon className="size-8" />
            <motion.div 
              className="absolute inset-0 rounded-2xl bg-sky-500/20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                {eyebrow}
              </p>
              <h4 className="mt-1 text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none">{title}</h4>
            </div>
            <p className="text-[15px] font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.5rem] border-0 bg-transparent p-0 shadow-none dark:bg-transparent sm:rounded-[2rem] sm:border-2 sm:border-zinc-100 sm:bg-white sm:p-6 sm:shadow-inner dark:sm:border-zinc-800 dark:sm:bg-zinc-950 lg:p-8">
           <div className="relative z-10">
             {children}
           </div>
           {/* Frosted Grain Texture for the inner box */}
           <div 
             className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
           />
        </div>
      </div>
    </div>
  );
}
