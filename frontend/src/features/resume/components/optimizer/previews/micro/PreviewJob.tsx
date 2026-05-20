import { cn } from "@/shared/lib/utils";

interface PreviewJobProps {
  title: string;
  company: string;
  period: string;
  bullets: string[];
  layout?: "modern" | "professional" | "classic" | "creative";
  companyColor?: string;
  location?: string;
}

export function PreviewJob({
  title,
  company,
  period,
  bullets,
  layout = "modern",
  companyColor = "text-[#4f46e5]",
  location,
}: PreviewJobProps) {
  if (layout === "professional") {
    return (
      <div>
        <div className="flex items-start justify-between gap-[3px]">
          <div>
            <div className="text-[2.8px] font-bold text-[#0f172a]">{title}</div>
            <div className={cn("text-[2.5px] font-semibold", companyColor)}>{company}</div>
          </div>
          <div className="text-right text-[2.2px] font-bold text-[#1e293b]">
            <div>{period}</div>
            {location ? <div className="font-normal italic text-[#64748b]">{location}</div> : null}
          </div>
        </div>
        <div className="mt-[0.8px] space-y-[0.4px] text-[2.3px] text-[#334155]">
          {bullets.map((bullet, i) => (
            <div key={i}>• {bullet}</div>
          ))}
        </div>
      </div>
    );
  }

  if (layout === "classic") {
    return (
      <div>
        <div className="flex items-baseline justify-between gap-[3px] text-[2.6px] font-bold">
          <span className="uppercase text-[#18181b]">{company}</span>
          <span className="text-[2.2px] uppercase tracking-wide text-[#27272a]">{period}</span>
        </div>
        <div className="text-[2.4px] font-semibold italic text-[#27272a]">
          {title}{location ? `, ${location}` : ""}
        </div>
        <div className="mt-[0.6px] space-y-[0.4px] text-[2.3px] text-[#18181b]">
          {bullets.map((bullet, i) => (
            <div key={i}>• {bullet}</div>
          ))}
        </div>
      </div>
    );
  }

  if (layout === "creative") {
    return (
      <div className="border-l-[1.5px] border-[#e2e8f0] pl-[4px]">
        <div className="text-[2.9px] font-extrabold text-[#0f172a]">{title}</div>
        <div className="mt-[0.2px] text-[2.4px] font-black uppercase tracking-wide text-[#0ea5e9]">{company}</div>
        <div className="mt-[0.4px] text-[2.1px] font-black uppercase tracking-wider text-[#94a3b8]">{period}</div>
        <div className="mt-[0.8px] space-y-[0.5px] text-[2.3px] font-medium text-[#475569]">
          {bullets.map((bullet, i) => (
            <div key={i}><span className="font-black text-[#0ea5e9]">→</span> {bullet}</div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <div className="font-bold text-[2.8px] text-[#1e293b]">{title}</div>
          <div className={cn("text-[2.5px] font-semibold", companyColor)}>{company}</div>
        </div>
        <div className="text-[2.2px] text-[#64748b] font-bold uppercase tracking-wide">{period}</div>
      </div>
      <div className="text-[2.3px] text-[#475569] mt-[0.6px] space-y-[0.5px]">
        {bullets.map((bullet, i) => (
          <div key={i}>• {bullet}</div>
        ))}
      </div>
    </div>
  );
}
