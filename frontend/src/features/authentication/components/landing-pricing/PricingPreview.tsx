import { FEATURE_FLAGS } from "@/shared/config/feature-flags";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "Ideal for beginners starting their journey.",
    features: ["3 resume optimizations", "Basic job tracker", "1 resume template"],
    buttonText: "Start Free",
    buttonVariant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "The complete toolset for serious hunters.",
    features: [
      "Unlimited optimizations",
      "AI cover letters",
      "Advanced analytics",
      "All templates",
      "Priority AI queue",
    ],
    buttonText: "Get Started Now",
    buttonVariant: "default" as const,
    isPopular: true,
  },
  {
    name: "Career Boost",
    price: "$79",
    period: "/mo",
    description: "White-glove service for executives.",
    features: ["Everything in Pro", "Career coaching", "LinkedIn optimization", "1-on-1 support"],
    buttonText: "Join Elite",
    buttonVariant: "outline" as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function PricingPreview() {
  if (!FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED) {
    return null;
  }

  return (
    <section className="relative py-24 lg:py-40 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
            Simple, honest<br />
            <span className="text-muted-foreground/40 italic">investments.</span>
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan) => (
            <motion.div 
              key={plan.name}
              variants={itemVariants}
              className={cn(
                "canvas-card group relative flex flex-col overflow-hidden rounded-[3.5rem] p-12",
                plan.isPopular && "z-10 scale-105 border-primary/20 bg-primary/5 shadow-primary/10",
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-8 right-8 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="size-3" /> Popular
                </div>
              )}

              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-6xl font-bold tracking-tighter">{plan.price}</span>
                  <span className="text-muted-foreground text-xl">{plan.period}</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-12">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Check className="size-4" />
                    </div>
                    <span className="text-lg font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <Link to="/signup">
                  <Button 
                    variant={plan.buttonVariant} 
                    className={cn(
                      "h-16 w-full rounded-[1.5rem] text-lg transition-all group-hover:shadow-xl",
                      plan.isPopular && "shadow-primary/20",
                    )}
                  >
                    {plan.buttonText} <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
