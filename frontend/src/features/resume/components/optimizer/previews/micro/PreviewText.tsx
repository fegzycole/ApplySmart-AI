interface PreviewTextProps {
  children: string;
  italic?: boolean;
}

export function PreviewText({ children, italic }: PreviewTextProps) {
  return (
    <div className={`text-[2.5px] text-slate-700 leading-[1.4] ${italic ? "italic" : ""}`}>
      {children}
    </div>
  );
}
