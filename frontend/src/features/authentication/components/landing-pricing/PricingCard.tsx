import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "outline";
  isPopular?: boolean;
  gradient?: {
    card: string;
    price: string;
    check: string;
    button?: string;
  };
}

export function PricingCard({
  name,
  price,
  period,
  features,
  buttonText,
  buttonVariant = "default",
  isPopular = false,
  gradient
}: PricingCardProps) {
  if (isPopular && gradient) {
    return (
      <Card className={`relative border-0 ${gradient.card} shadow-2xl shadow-violet-500/50 dark:shadow-violet-900/50 transform scale-105 hover:scale-110 transition-all duration-300`}>
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
          Most Popular
        </div>
        <CardHeader>
          <CardTitle className="text-2xl text-white">{name}</CardTitle>
          <div className="mt-6">
            <span className="text-5xl font-bold text-white">{price}</span>
            <span className="text-violet-100 text-lg">{period}</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4 mb-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Check className="size-4 text-white" />
                </div>
                <span className="text-white">{feature}</span>
              </li>
            ))}
          </ul>
          <Button className={gradient.button || "w-full bg-white text-violet-600 hover:bg-violet-50 font-semibold shadow-lg"}>
            {buttonText}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-2 ${gradient?.card || 'border-violet-200/50 dark:border-violet-800/50 bg-white/80 dark:bg-zinc-900/80'} backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300`}>
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <div className="mt-6">
          <span className={`text-5xl font-bold ${gradient?.price || 'bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent'}`}>
            {price}
          </span>
          <span className="text-zinc-600 dark:text-zinc-400 text-lg">{period}</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4 mb-8">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <div className={`size-6 rounded-full ${gradient?.check || 'bg-violet-100 dark:bg-violet-950/50'} flex items-center justify-center flex-shrink-0`}>
                <Check className={`size-4 ${gradient?.check ? gradient.check.replace('bg-', 'text-') : 'text-violet-600 dark:text-violet-400'}`} />
              </div>
              <span className="text-zinc-600 dark:text-zinc-400">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          variant={buttonVariant}
          className={`w-full ${buttonVariant === 'outline' ? `border-2 ${gradient?.card.includes('cyan') ? 'border-cyan-200 dark:border-cyan-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/30' : 'border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950/30'}` : ''}`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
