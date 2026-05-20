import { cn } from "@/shared/lib/utils";

interface PreviewTextProps {
  children: string;
  italic?: boolean;
}

export function PreviewText({ children, italic }: PreviewTextProps) {
  return (
    <div className={cn("text-[2.5px] text-slate-700 leading-[1.4]", italic && "italic")}>
      {children}
    </div>
  );
}
