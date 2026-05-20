import type { CSSProperties, ReactNode } from "react";

const FONT_FAMILY_STYLES = {
  inter: { fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif' },
  garamond: { fontFamily: '"EB Garamond", "Times New Roman", serif' },
  jakarta: { fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif' },
  libre: { fontFamily: '"Libre Baskerville", Georgia, serif' },
} as const;

interface PreviewWrapperProps {
  children: ReactNode;
  font?: keyof typeof FONT_FAMILY_STYLES;
}

export function PreviewWrapper({ children, font = "inter" }: PreviewWrapperProps) {
  const style: CSSProperties = FONT_FAMILY_STYLES[font];

  return (
    <div className="space-y-[2px] p-1.5 text-[2.8px] leading-[1.3]" style={style}>
      {children}
    </div>
  );
}
