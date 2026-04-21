import { ReactNode } from "react";

interface PreviewSectionProps {
  title: string;
  children: ReactNode;
  titleColor?: string;
  titleSize?: string;
  titleWeight?: string;
  borderColor?: string;
}

export function PreviewSection({
  title,
  children,
  titleColor = "text-blue-500",
  titleSize = "text-[3.2px]",
  titleWeight = "font-bold",
  borderColor = "border-slate-200",
}: PreviewSectionProps) {
  return (
    <div className="space-y-[1px]">
      <div className={`${titleWeight} ${titleSize} ${titleColor} uppercase tracking-wide border-b ${borderColor} pb-[0.5px]`}>
        {title}
      </div>
      {children}
    </div>
  );
}
