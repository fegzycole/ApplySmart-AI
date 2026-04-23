import { Link } from "react-router";
import { PricingNavigation } from "../components/navigation";
import { PricingPageHeader } from "../components/pricing-header";
import { PricingCardsSection } from "../components/pricing-cards";
import { FeatureComparisonTable } from "../components/feature-comparison";
import { FAQSection } from "../components/faq";
import { CTASection } from "../components/cta";
import { PRICING_PAGE_STYLES } from "../constants/pricing.constants";
import { FEATURE_FLAGS } from "@/shared/config/feature-flags";
import { Button } from "@/shared/components/ui/button";
import { Sparkles } from "lucide-react";

export function PricingPage() {
  if (!FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-zinc-950 dark:via-violet-950/20 dark:to-zinc-950">
        <PricingNavigation />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center size-20 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 mb-6">
              <Sparkles className="size-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Pricing Coming Soon
              </span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              We're currently building our subscription plans. For now, enjoy full access to all features completely free!
            </p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg">
                Go Back Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
