import { Activity, Database } from "lucide-react";
import { SectionCard } from "../shared/SectionCard";
import { CurrentPlanCard } from "./CurrentPlanCard";
import { PaymentMethodCard } from "./PaymentMethodCard";
import { BillingActions } from "./BillingActions";
import { InvoiceItem } from "./InvoiceItem";
import { CURRENT_PLAN, PAYMENT_METHOD, INVOICES } from "../../constants/billing.constants";

export function BillingTab() {
  return (
    <div className="space-y-12">
      <SectionCard
        icon={Database}
        title="Resource Infrastructure"
        description="Manage your system tier and primary financial vectors."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <CurrentPlanCard {...CURRENT_PLAN} />
          <PaymentMethodCard {...PAYMENT_METHOD} />
        </div>
        <div className="pt-4">
          <BillingActions />
        </div>
      </SectionCard>

      <SectionCard
        icon={Activity}
        title="Transaction Archive"
        description="Historical log of infrastructure resource allocations."
      >
        <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-zinc-100 bg-white/40 dark:bg-zinc-900/40 dark:border-zinc-800 p-2 shadow-inner backdrop-blur-xl">
          <div className="divide-y-2 divide-zinc-100 dark:divide-zinc-800">
            {INVOICES.map((invoice, index) => (
              <InvoiceItem key={index} {...invoice} />
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
