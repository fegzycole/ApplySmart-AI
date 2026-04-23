import type { ReactNode } from "react";

interface BuilderPanelProps {
  children: ReactNode;
  className?: string;
}

export function BuilderPanel({ children, className = "" }: BuilderPanelProps) {
  return (
    <div className={`bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800 ${className}`}>
      {children}
    </div>
  );
}
