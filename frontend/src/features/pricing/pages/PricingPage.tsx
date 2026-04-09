import { PricingNavigation } from "../components/navigation";
import { PricingPageHeader } from "../components/pricing-header";
import { PricingCardsSection } from "../components/pricing-cards";
import { FeatureComparisonTable } from "../components/feature-comparison";
import { FAQSection } from "../components/faq";
import { CTASection } from "../components/cta";
import { PRICING_PAGE_STYLES } from "../constants/pricing.constants";

export function PricingPage() {
  return (
    <div className={PRICING_PAGE_STYLES.container}>
      <PricingNavigation />
      <PricingPageHeader />
      <PricingCardsSection />
      <FeatureComparisonTable />
      <FAQSection />
      <CTASection />
    </div>
  );
}
