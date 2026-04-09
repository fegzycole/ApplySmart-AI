import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

interface SecuritySectionProps {
  title: string;
  icon: LucideIcon;
  gradient: string;
  border: string;
  children: ReactNode;
}

export function SecuritySection({
  title,
  icon: Icon,
  gradient,
  border,
  children
}: SecuritySectionProps) {
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-br ${gradient} border ${border}`}>
      <h4 className="font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
        <Icon className="size-5" />
        {title}
      </h4>
      {children}
    </div>
  );
}
