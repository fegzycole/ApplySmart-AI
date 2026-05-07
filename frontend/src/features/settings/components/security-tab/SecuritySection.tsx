import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

interface SecuritySectionProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconGradient: string;
  gradient: string;
  border: string;
  children: ReactNode;
}

export function SecuritySection({
  eyebrow,
  title,
  description,
  icon: Icon,
  iconGradient,
  gradient,
  border,
  children
}: SecuritySectionProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.5rem] border bg-gradient-to-br p-4 sm:rounded-[1.75rem] sm:p-5 ${gradient} ${border}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent dark:via-zinc-700/80" />
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-start sm:gap-4">
        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${iconGradient}`}
        >
          <Icon className="size-5" />
        </div>
        <div className="min-w-0 space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
            {eyebrow}
          </p>
          <h4 className="text-base font-semibold text-zinc-950 dark:text-white sm:text-lg">{title}</h4>
          <p className="max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        </div>
      </div>
      <div className="min-w-0 rounded-[1.25rem] border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-zinc-950/55 sm:rounded-[1.35rem] sm:p-5">
        {children}
      </div>
    </div>
  );
}
