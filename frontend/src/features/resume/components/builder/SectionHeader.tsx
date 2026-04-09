import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  iconColor?: string;
}

export function SectionHeader({ icon: Icon, title, iconColor = "text-violet-600 dark:text-violet-400" }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className={`size-5 ${iconColor}`} />
      <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
    </div>
  );
}
