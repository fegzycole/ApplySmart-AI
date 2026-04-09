import { PRICING_CARD_STYLES, PRICING_PLANS, PRICING_PAGE_STYLES } from "../../constants/pricing.constants";
import { PricingCard } from "./PricingCard";

export function PricingCardsSection() {
  return (
    <section className={PRICING_CARD_STYLES.section}>
      <div className={PRICING_PAGE_STYLES.maxWidth}>
        <div className={PRICING_CARD_STYLES.grid}>
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
