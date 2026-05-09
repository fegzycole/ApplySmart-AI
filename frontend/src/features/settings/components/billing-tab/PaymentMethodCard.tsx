import { CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface PaymentMethodCardProps {
  cardNumber: string;
  expiryDate: string;
}

export function PaymentMethodCard({ cardNumber, expiryDate }: PaymentMethodCardProps) {
  return (
    <div className="relative group overflow-hidden rounded-[2.5rem] border-2 border-zinc-100 bg-white shadow-xl p-10 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-lg dark:bg-sky-600">
             <CreditCard className="size-5" />
           </div>
           <div>
             <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">Financial Vector</h4>
             <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mt-0.5">Primary Billing Source</p>
           </div>
        </div>
        <Button variant="ghost" className="h-10 rounded-xl bg-zinc-900/5 dark:bg-white/5 border border-zinc-100 dark:border-zinc-800 font-black uppercase tracking-widest text-[9px] hover:bg-zinc-900 hover:text-white transition-all">
          Recalibrate
        </Button>
      </div>

      <div className="p-6 rounded-[1.75rem] border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-950/[0.02] dark:bg-white/[0.02] shadow-inner flex items-center justify-between gap-6 transition-all hover:border-sky-500/30">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-20 items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-50 dark:border-zinc-700 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-sky-500" />
             <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Artifact</p>
          </div>
          <div className="min-w-0">
            <p className="text-lg font-black text-zinc-900 dark:text-zinc-100 tracking-tighter uppercase leading-none">{cardNumber}</p>
            <div className="flex items-center gap-2 mt-2">
              <ShieldCheck className="size-3 text-sky-500" />
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Valid Thru {expiryDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
