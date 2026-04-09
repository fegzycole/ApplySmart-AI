import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";

interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
  iconGradient?: string;
}

export function SectionCard({
  icon: Icon,
  title,
  description,
  children,
  iconGradient = "from-violet-500 to-fuchsia-500"
}: SectionCardProps) {
  return (
    <Card className="border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-xl bg-gradient-to-br ${iconGradient} flex items-center justify-center shadow-lg`}>
            <Icon className="size-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
      </CardContent>
    </Card>
  );
}
