import { PreviewWrapper } from "./micro/PreviewWrapper";
import { PreviewHeader } from "./micro/PreviewHeader";
import { PreviewSection } from "./micro/PreviewSection";
import { PreviewText } from "./micro/PreviewText";
import { PreviewJob } from "./micro/PreviewJob";
import { PreviewSkills } from "./micro/PreviewSkills";

export function ModernTemplatePreview() {
  return (
    <PreviewWrapper font="inter">
      <PreviewHeader
        name="ALEXANDER SMITH"
        contact={["alex.smith@email.com", "(555) 123-4567", "San Francisco, CA"]}
        borderColor="border-[#4f46e5]"
        borderWidth="border-b-[2px]"
        nameSize="text-[5.6px]"
        nameWeight="font-black"
      />

      <PreviewSection
        title="Professional Summary"
        titleClassName="border-b border-[#f1f5f9] pb-[0.5px] text-[3px] font-extrabold uppercase tracking-[0.14em] text-[#4f46e5]"
      >
        <PreviewText>
          Results-driven software engineer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architectures.
        </PreviewText>
      </PreviewSection>

      <PreviewSection
        title="Work Experience"
        titleClassName="border-b border-[#f1f5f9] pb-[0.5px] text-[3px] font-extrabold uppercase tracking-[0.14em] text-[#4f46e5]"
      >
        <PreviewJob
          title="Senior Software Engineer"
          company="Tech Corp"
          period="2020 - Present"
          bullets={[
            "Led development of microservices architecture",
            "Improved system performance by 40%"
          ]}
        />
      </PreviewSection>

      <PreviewSection
        title="Skills"
        titleClassName="border-b border-[#f1f5f9] pb-[0.5px] text-[3px] font-extrabold uppercase tracking-[0.14em] text-[#4f46e5]"
      >
        <PreviewSkills skills={["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"]} />
      </PreviewSection>
    </PreviewWrapper>
  );
}
