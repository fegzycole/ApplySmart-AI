interface PreviewJobProps {
  title: string;
  company: string;
  period: string;
  bullets: string[];
  layout?: "modern" | "professional" | "classic";
  companyColor?: string;
  location?: string;
}

export function PreviewJob({
  title,
  company,
  period,
  bullets,
  layout = "modern",
  companyColor = "text-blue-600",
  location,
}: PreviewJobProps) {
  if (layout === "professional") {
    return (
      <div>
        <div className="text-[2.8px]">
          <span className="font-bold">{title}</span>
          <span className="font-normal"> at </span>
          <span className={`font-semibold ${companyColor}`}>{company}</span>
        </div>
        <div className="text-[2.3px] text-slate-600 mt-[0.3px]">
          <span className="font-semibold">{period}</span>
          {location && <span className="ml-[2px]">{location}</span>}
        </div>
        <div className="text-[2.4px] text-slate-700 mt-[0.5px] space-y-[0.3px]">
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
        <div className="text-[2.6px] font-bold">{title}</div>
        <div className="text-[2.4px] text-slate-600 italic">{company}{location && `, ${location}`}</div>
        <div className="text-[2.4px] text-slate-600">{period}</div>
        <div className="text-[2.3px] text-slate-700 mt-[0.5px] space-y-[0.3px]">
          {bullets.map((bullet, i) => (
            <div key={i}>• {bullet}</div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <div className="font-bold text-[2.8px]">{title}</div>
          <div className={`text-[2.5px] font-semibold ${companyColor}`}>{company}</div>
        </div>
        <div className="text-[2.3px] text-slate-600 font-semibold">{period}</div>
      </div>
      <div className="text-[2.3px] text-slate-700 mt-[0.5px] space-y-[0.5px]">
        {bullets.map((bullet, i) => (
          <div key={i}>• {bullet}</div>
        ))}
      </div>
    </div>
  );
}
