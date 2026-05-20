import { PreviewWrapper } from "./micro/PreviewWrapper";
import { PreviewSection } from "./micro/PreviewSection";
import { PreviewText } from "./micro/PreviewText";
import { PreviewJob } from "./micro/PreviewJob";
import { PreviewSkills } from "./micro/PreviewSkills";

export function CreativeTemplatePreview() {
  return (
    <PreviewWrapper font="jakarta">
      <div className="pb-[2px]">
        <div className="mb-[1px] bg-gradient-to-r from-[#0ea5e9] to-[#2563eb] bg-clip-text text-[6px] font-black leading-none tracking-tighter text-transparent">
          ALEXANDER SMITH
        </div>
        <div className="flex flex-wrap gap-x-[2px] text-[2.1px] font-bold uppercase tracking-[0.12em] text-[#64748b]">
          <span>alex.smith@email.com</span>
          <span>(555) 123-4567</span>
          <span>San Francisco, CA</span>
        </div>
      </div>

      <PreviewSection
        title="Professional Summary"
        titleClassName="relative w-fit pb-[1.4px] text-[3px] font-black uppercase tracking-[0.14em] text-[#0f172a] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-[14px] after:bg-[#0ea5e9] after:content-['']"
      >
        <PreviewText className="font-medium text-[#334155]">
          Creative software engineer with expertise in modern web technologies and design. Specializing in building beautiful, user-centric applications.
        </PreviewText>
      </PreviewSection>

      <PreviewSection
        title="Work Experience"
        titleClassName="relative w-fit pb-[1.4px] text-[3px] font-black uppercase tracking-[0.14em] text-[#0f172a] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-[14px] after:bg-[#0ea5e9] after:content-['']"
      >
        <PreviewJob
          title="Lead Developer"
          company="Creative Studios"
          period="2021 - Present"
          bullets={[
            "Developed cutting-edge web applications",
            "Enhanced user experience across platforms"
          ]}
          layout="creative"
        />
      </PreviewSection>

      <PreviewSection
        title="Skills"
        titleClassName="relative w-fit pb-[1.4px] text-[3px] font-black uppercase tracking-[0.14em] text-[#0f172a] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-[14px] after:bg-[#0ea5e9] after:content-['']"
      >
        <PreviewSkills skills={["React", "Vue.js", "Node.js", "TypeScript", "Design"]} variant="creative" />
      </PreviewSection>
    </PreviewWrapper>
  );
}
