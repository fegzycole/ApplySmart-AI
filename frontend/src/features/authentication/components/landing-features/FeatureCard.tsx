import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: {
    card: string;
    icon: string;
    shadow: string;
  };
}

export function FeatureCard({ icon: Icon, title, description, gradient }: FeatureCardProps) {
  const hoverShadowClass = gradient.shadow.replace("shadow-", "hover:shadow-").replace("/10", "/20");
  const iconShadowClass = gradient.shadow
    .replace("shadow-violet", "shadow")
    .replace("shadow-fuchsia", "shadow")
    .replace("shadow-cyan", "shadow")
    .replace("shadow-amber", "shadow")
    .replace("shadow-rose", "shadow")
    .replace("shadow-emerald", "shadow");

  return (
    <Card
      className={cn(
        "transform border-0 bg-gradient-to-br shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
        gradient.card,
        gradient.shadow,
        hoverShadowClass,
      )}
    >
      <CardHeader className="pb-8">
        <div
          className={cn(
            "mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
            gradient.icon,
            iconShadowClass,
          )}
        >
          <Icon className="size-7 text-white" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
