import { CreditCard, Download } from "lucide-react";
import { SectionCard } from "../shared/SectionCard";
import { CurrentPlanCard } from "./CurrentPlanCard";
import { PaymentMethodCard } from "./PaymentMethodCard";
import { BillingActions } from "./BillingActions";
import { InvoiceItem } from "./InvoiceItem";
import { CURRENT_PLAN, PAYMENT_METHOD, INVOICES } from "../../constants/billing.constants";

export function BillingTab() {
  return (
    <>
      <SectionCard
        icon={CreditCard}
        title="Billing & Subscription"
        description="Manage your subscription and payment methods"
        iconGradient="from-amber-500 to-orange-500"
      >
        <CurrentPlanCard {...CURRENT_PLAN} />
        <PaymentMethodCard {...PAYMENT_METHOD} />
        <BillingActions />
      </SectionCard>

      <SectionCard
        icon={Download}
        title="Billing History"
        description="Download your previous invoices"
        iconGradient="from-emerald-500 to-teal-500"
      >
        <div className="space-y-3">
          {INVOICES.map((invoice, index) => (
            <InvoiceItem key={index} {...invoice} />
          ))}
        </div>
      </SectionCard>
    </>
  );
}
