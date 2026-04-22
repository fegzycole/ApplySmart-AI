interface PreviewHeaderProps {
  name: string;
  contact: string[];
  layout?: "center" | "left";
  borderColor?: string;
  borderWidth?: string;
  nameSize?: string;
  nameWeight?: string;
  separator?: string;
  separatorColor?: string;
}

export function PreviewHeader({
  name,
  contact,
  layout = "center",
  borderColor,
  borderWidth = "border-b-[1.5px]",
  nameSize = "text-[6px]",
  nameWeight = "font-bold",
  separator = "•",
  separatorColor,
}: PreviewHeaderProps) {
  const isCenter = layout === "center";
  const borderClass = borderColor ? `${borderWidth} ${borderColor}` : "";
  const contactDisplay = isCenter ? "flex justify-center gap-[2px] flex-wrap" : "space-x-[3px]";

  return (
    <div className={`pb-[2px] ${borderClass} ${isCenter ? "text-center" : ""}`}>
      <div className={`${nameWeight} ${nameSize} mb-[1px] ${isCenter ? "" : "mb-[1.5px]"}`}>
        {name}
      </div>
      <div className={`text-[2.3px] text-slate-600 ${contactDisplay}`}>
        {contact.map((item, idx) => (
          <span key={idx}>
            {item}
            {idx < contact.length - 1 && (
              <span className={separatorColor}> {separator} </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
