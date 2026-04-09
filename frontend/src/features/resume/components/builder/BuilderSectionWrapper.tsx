import { ReactNode } from "react";

interface BuilderSectionWrapperProps {
  gradient: string;
  border: string;
  children: ReactNode;
}

export function BuilderSectionWrapper({ gradient, border, children }: BuilderSectionWrapperProps) {
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-br ${gradient} border ${border}`}>
      {children}
    </div>
  );
}
