import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface PreviewSectionProps {
  title: string;
  children: ReactNode;
  titleClassName?: string;
  titleColor?: string;
  titleSize?: string;
  titleWeight?: string;
  borderColor?: string;
}

export function PreviewSection({
  title,
  children,
  titleClassName,
  titleColor = "text-blue-500",
  titleSize = "text-[3.2px]",
  titleWeight = "font-bold",
  borderColor = "border-slate-200",
}: PreviewSectionProps) {
  return (
    <div className="space-y-[1px]">
      <div className={titleClassName ?? cn(titleWeight, titleSize, titleColor, "border-b pb-[0.5px] uppercase tracking-wide", borderColor)}>
        {title}
      </div>
      {children}
    </div>
  );
}
