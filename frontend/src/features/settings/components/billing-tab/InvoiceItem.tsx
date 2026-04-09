import { Download } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface InvoiceItemProps {
  date: string;
  amount: string;
  status: string;
}

export function InvoiceItem({ date, amount, status }: InvoiceItemProps) {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-50/50 to-slate-50/50 dark:from-zinc-950/20 dark:to-slate-950/20 border border-zinc-100 dark:border-zinc-800 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-zinc-900 dark:text-white">{date}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Pro Plan</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-bold text-zinc-900 dark:text-white">{amount}</span>
          <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{status}</span>
          <Button variant="ghost" size="sm">
            <Download className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
