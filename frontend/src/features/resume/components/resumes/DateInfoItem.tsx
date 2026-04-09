import { LucideIcon } from "lucide-react";

interface DateInfoItemProps {
  label: string;
  value: string;
  icon: LucideIcon;
  gradient: string;
}

export function DateInfoItem({ label, value, icon: Icon, gradient }: DateInfoItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`size-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}>
        <Icon className="size-4 text-white" />
      </div>
      <div>
        <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-xs font-semibold text-zinc-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}
