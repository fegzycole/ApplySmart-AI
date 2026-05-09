import { Crown, ShieldAlert } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function BillingActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <Button className="relative h-16 flex-1 rounded-2xl bg-zinc-900 dark:bg-sky-600 text-white font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-zinc-900/20 dark:shadow-sky-900/20 hover:scale-105 active:scale-95 transition-all overflow-hidden group/btn">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
        <Crown className="size-4 mr-3" />
        Upgrade System Tier
      </Button>
      <Button variant="ghost" className="h-16 flex-1 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 font-black uppercase tracking-widest text-[11px] text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all active:scale-95">
        <ShieldAlert className="size-4 mr-3" />
        Terminate Allocation
      </Button>
    </div>
  );
}
