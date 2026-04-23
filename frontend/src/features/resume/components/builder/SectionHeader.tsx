import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
}

export function SectionHeader({ icon: Icon, title }: SectionHeaderProps) {
  return (
    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
      <Icon className="size-5" />
      {title}
    </h3>
  );
}
