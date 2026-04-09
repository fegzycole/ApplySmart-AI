import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { PRICING_HEADER_STYLES, PRICING_HEADER_CONTENT } from "../../constants/pricing.constants";

export function PricingPageHeader() {
  return (
    <section className={PRICING_HEADER_STYLES.container}>
      <div className={PRICING_HEADER_STYLES.wrapper}>
        <h1 className={PRICING_HEADER_STYLES.title}>
          {PRICING_HEADER_CONTENT.title}
        </h1>
        <p className={PRICING_HEADER_STYLES.description}>
          {PRICING_HEADER_CONTENT.description}
        </p>

        <Tabs defaultValue="monthly" className={PRICING_HEADER_STYLES.tabs.container}>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">
              Annual
              <span className={PRICING_HEADER_STYLES.tabs.badge}>
                {PRICING_HEADER_CONTENT.saveBadge}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
}
