import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { CreditCard } from "lucide-react";
import { WorkspacePageHeader } from "@/shared/components/WorkspacePageHeader";
import { PRICING_HEADER_CONTENT } from "../../constants/pricing.constants";

export function PricingPageHeader() {
  return (
    <section className="px-4 pb-12 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <WorkspacePageHeader
          badge="Subscription Plans"
          badgeIcon={CreditCard}
          title={PRICING_HEADER_CONTENT.title}
          description={PRICING_HEADER_CONTENT.description}
          footerClassName="flex justify-center"
          footer={(
        <Tabs defaultValue="monthly" className="inline-flex">
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">
              Annual
              <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                {PRICING_HEADER_CONTENT.saveBadge}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
          )}
        />
      </div>
    </section>
  );
}
