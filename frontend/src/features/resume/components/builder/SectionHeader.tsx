import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  stage?: string;
}

export function SectionHeader({ icon: Icon, title, stage }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-border/50">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <Icon className="size-5 sm:size-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h3>
          {stage && (
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-primary mt-0.5">
              {stage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
