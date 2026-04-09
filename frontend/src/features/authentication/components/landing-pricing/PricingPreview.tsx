import { PricingCard } from "./PricingCard";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    features: [
      "3 resume optimizations",
      "Basic job tracker",
      "1 resume template"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited optimizations",
      "AI cover letters",
      "Advanced analytics",
      "All templates"
    ],
    buttonText: "Start Free Trial",
    isPopular: true,
    gradient: {
      card: "bg-gradient-to-br from-violet-600 to-fuchsia-600",
      price: "text-white",
      check: "bg-white/20",
      button: "w-full bg-white text-violet-600 hover:bg-violet-50 font-semibold shadow-lg"
    }
  },
  {
    name: "Career Boost",
    price: "$79",
    period: "/month",
    features: [
      "Everything in Pro",
      "Priority support",
      "Career coaching",
      "LinkedIn optimization"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    gradient: {
      card: "border-cyan-200/50 dark:border-cyan-800/50 bg-white/80 dark:bg-zinc-900/80",
      price: "bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent",
      check: "bg-cyan-100 dark:bg-cyan-950/50"
    }
  }
];

export function PricingPreview() {
  return (
    <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 px-4">
            Choose the plan that works for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
