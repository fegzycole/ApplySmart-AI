import { CreditCard } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface PaymentMethodCardProps {
  cardNumber: string;
  expiryDate: string;
}

export function PaymentMethodCard({ cardNumber, expiryDate }: PaymentMethodCardProps) {
  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50/50 to-zinc-50/50 dark:from-slate-950/20 dark:to-zinc-950/20 border border-slate-100 dark:border-slate-900">
      <h4 className="font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
        <CreditCard className="size-5" />
        Payment Method
      </h4>
      <div className="p-4 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-gradient-to-br from-slate-200 to-zinc-300 dark:from-slate-700 dark:to-zinc-800 rounded-lg flex items-center justify-center shadow-md">
            <CreditCard className="size-6 text-zinc-600 dark:text-zinc-400" />
          </div>
          <div>
            <p className="font-semibold text-zinc-900 dark:text-white">{cardNumber}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Expires {expiryDate}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="border-2">
          Update
        </Button>
      </div>
    </div>
  );
}
