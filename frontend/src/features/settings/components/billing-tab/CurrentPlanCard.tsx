import { Crown, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface CurrentPlanCardProps {
  name: string;
  price: string;
  renewalDate: string;
  status: string;
}

export function CurrentPlanCard({ name, price, renewalDate, status }: CurrentPlanCardProps) {
  return (
    <div className="relative group overflow-hidden rounded-[2.5rem] border-2 border-zinc-900 bg-zinc-900 dark:bg-sky-600 dark:border-sky-500 p-10 text-white shadow-2xl transition-all duration-500 hover:-translate-y-1">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
      <motion.div 
        className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
              <Crown className="size-8" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60 mb-1">
                System Core Tier
              </p>
              <h4 className="text-3xl font-black tracking-tighter uppercase leading-none">{name}</h4>
            </div>
          </div>
          <div className="flex h-8 items-center px-4 rounded-full bg-white text-zinc-900 text-[10px] font-black uppercase tracking-widest shadow-xl">
            {status}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
             <p className="text-4xl font-black tracking-tighter leading-none">{price}</p>
             <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Allocation Resource Cost</p>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-lg">
               <ShieldCheck className="size-3.5" />
            </div>
            <p className="text-[11px] font-bold text-white/80 tracking-tight uppercase">
              Next calibration: {renewalDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
