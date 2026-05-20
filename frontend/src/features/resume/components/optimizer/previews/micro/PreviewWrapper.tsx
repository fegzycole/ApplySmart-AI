import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

const FONT_CLASS_NAMES = {
  sans: "font-sans",
  serif: "font-serif",
} as const;

interface PreviewWrapperProps {
  children: ReactNode;
  font?: "sans" | "serif";
}

export function PreviewWrapper({ children, font = "sans" }: PreviewWrapperProps) {
  return (
    <div className={cn("space-y-[2px] p-1.5 text-[2.8px] leading-[1.3]", FONT_CLASS_NAMES[font])}>
      {children}
    </div>
  );
}
