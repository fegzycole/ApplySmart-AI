import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

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
    <header className={`overflow-hidden rounded-[1.75rem] border border-zinc-200/80 bg-white/75 p-5 shadow-xl shadow-zinc-200/40 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/75 dark:shadow-black/20 sm:p-6 ${className ?? ""}`}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100/80 px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300">
              <BadgeIcon className="size-4" />
              <span className="font-medium">{badge}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
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
          <div className={footerClassName ?? ""}>
            {footer}
          </div>
        ) : null}
      </div>
    </header>
  );
}
