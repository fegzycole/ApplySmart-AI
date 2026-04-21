import { ReactNode } from "react";

interface PreviewWrapperProps {
  children: ReactNode;
  font?: "sans" | "serif";
}

export function PreviewWrapper({ children, font = "sans" }: PreviewWrapperProps) {
  return (
    <div className={`text-[2.8px] leading-[1.3] space-y-[2px] p-1.5 font-${font}`}>
      {children}
    </div>
  );
}
