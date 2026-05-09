import { Download, FileCheck2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface InvoiceItemProps {
  date: string;
  amount: string;
  status: string;
}

export function InvoiceItem({ date, amount, status }: InvoiceItemProps) {
  return (
    <div className="p-6 group/item transition-all duration-300 hover:bg-zinc-900/5 dark:hover:bg-white/5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-sky-600 shadow-lg">
             <FileCheck2 className="size-5" />
           </div>
           <div>
             <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">{date}</p>
             <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Pro Tier Allocation</p>
           </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-8">
          <div className="text-right">
            <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 tracking-tight">{amount}</p>
            <div className="flex items-center gap-1.5 justify-end mt-0.5">
               <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
               <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{status}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-zinc-900/5 dark:bg-white/5 border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-900 hover:text-white transition-all active:scale-90">
            <Download className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
