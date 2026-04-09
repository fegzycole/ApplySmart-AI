import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Check } from "lucide-react";
import type { PricingPlan } from "../../types/pricing.types";
import { PRICING_CARD_STYLES } from "../../constants/pricing.constants";

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  const cardClassName = `${PRICING_CARD_STYLES.card.base} ${
    plan.popular ? PRICING_CARD_STYLES.card.popular : PRICING_CARD_STYLES.card.regular
  }`;

  return (
    <Card className={cardClassName}>
      {plan.popular && (
        <div className={PRICING_CARD_STYLES.badge}>
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className={PRICING_CARD_STYLES.price.container}>
          <span className={PRICING_CARD_STYLES.price.amount}>
            ${plan.price}
          </span>
          <span className={PRICING_CARD_STYLES.price.period}>/month</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className={PRICING_CARD_STYLES.features.list}>
          {plan.features.map((feature, index) => (
            <li key={index} className={PRICING_CARD_STYLES.features.item}>
              <Check className={PRICING_CARD_STYLES.features.icon} />
              <span className={PRICING_CARD_STYLES.features.text}>{feature}</span>
            </li>
          ))}
        </ul>
        <Link to="/signup">
          <Button
            className={`${PRICING_CARD_STYLES.button.base} ${
              plan.popular ? PRICING_CARD_STYLES.button.popular : PRICING_CARD_STYLES.button.regular
            }`}
            variant={plan.popular ? 'default' : 'outline'}
          >
            {plan.cta}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
