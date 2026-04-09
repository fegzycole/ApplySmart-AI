import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
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
  return (
    <Card className={`border-0 bg-gradient-to-br ${gradient.card} shadow-xl ${gradient.shadow} backdrop-blur-sm hover:shadow-2xl ${gradient.shadow.replace('shadow-', 'hover:shadow-').replace('/10', '/20')} transition-all duration-300 transform hover:-translate-y-2`}>
      <CardHeader className="pb-8">
        <div className={`size-14 rounded-2xl bg-gradient-to-br ${gradient.icon} flex items-center justify-center mb-4 shadow-lg ${gradient.shadow.replace('shadow-violet', 'shadow').replace('shadow-fuchsia', 'shadow').replace('shadow-cyan', 'shadow').replace('shadow-amber', 'shadow').replace('shadow-rose', 'shadow').replace('shadow-emerald', 'shadow')}`}>
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
