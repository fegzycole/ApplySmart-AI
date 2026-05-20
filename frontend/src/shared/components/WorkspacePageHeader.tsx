import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface WorkspacePageHeaderProps {
  badge: string;
  badgeIcon: LucideIcon;
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
  footer?: ReactNode;
  footerClassName?: string;
}

export function WorkspacePageHeader({
  badge,
  badgeIcon: BadgeIcon,
  title,
  description,
  actions,
  className,
  footer,
  footerClassName,
}: WorkspacePageHeaderProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border bg-card p-4 shadow-2xl shadow-primary/5 dark:shadow-none sm:rounded-[2.5rem] sm:p-6 lg:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary sm:px-4 sm:py-2">
              <BadgeIcon className="size-3.5 sm:size-4" />
              <span>{badge}</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
              {description}
            </p>
          </div>

          {actions ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              {actions}
            </div>
          ) : null}
        </div>

        {footer ? (
          <div className={footerClassName}>
            {footer}
          </div>
        ) : null}
      </div>
    </header>
  );
}
