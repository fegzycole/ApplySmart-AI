interface PreviewSkillsProps {
  skills: string[];
  variant?: "modern" | "professional" | "creative";
}

export function PreviewSkills({ skills, variant = "modern" }: PreviewSkillsProps) {
  const getSkillClass = () => {
    switch (variant) {
      case "professional":
        return "px-[2px] py-[0.5px] bg-slate-100 border border-slate-300 rounded-[0.3px] text-[2.3px]";
      case "creative":
        return "px-[2px] py-[0.5px] bg-blue-50 text-blue-900 border border-blue-200 rounded-[0.5px] text-[2.3px] font-medium";
      default:
        return "px-[2px] py-[0.5px] bg-slate-200 rounded-[0.5px] text-[2.3px]";
    }
  };

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
