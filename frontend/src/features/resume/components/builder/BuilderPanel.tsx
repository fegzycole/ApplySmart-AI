import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface BuilderPanelProps {
  children: ReactNode;
  className?: string;
}

export function BuilderPanel({ children, className = "" }: BuilderPanelProps) {
  return (
    <div className={cn(
      "canvas-card rounded-[2rem] p-4 sm:rounded-[2.5rem] sm:p-6 lg:p-8 xl:p-10",
      className
    )}>
      {children}
    </div>
  );
}
