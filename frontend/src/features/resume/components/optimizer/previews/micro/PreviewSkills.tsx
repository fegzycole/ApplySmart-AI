interface PreviewSkillsProps {
  skills: string[];
  variant?: "modern" | "professional" | "creative";
}

export function PreviewSkills({ skills, variant = "modern" }: PreviewSkillsProps) {
  const getSkillClass = () => {
    switch (variant) {
      case "professional":
        return "text-[2.4px] font-medium text-[#334155]";
      case "creative":
        return "px-[2px] py-[0.6px] bg-sky-50 text-sky-800 border border-sky-200 rounded-[1px] text-[2.2px] font-black";
      default:
        return "px-[2px] py-[0.5px] bg-slate-100 text-[#475569] border border-slate-200 rounded-[0.6px] text-[2.2px] font-semibold";
    }
  };

  if (variant === "professional") {
    return (
      <div className={getSkillClass()}>
        {skills.join("  •  ")}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-[1.5px]">
      {skills.map((skill) => (
        <span key={skill} className={getSkillClass()}>
          {skill}
        </span>
      ))}
    </div>
  );
}
