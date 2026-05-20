import { PreviewWrapper } from "./micro/PreviewWrapper";
import { PreviewHeader } from "./micro/PreviewHeader";
import { PreviewSection } from "./micro/PreviewSection";
import { PreviewText } from "./micro/PreviewText";
import { PreviewJob } from "./micro/PreviewJob";
import { PreviewSkills } from "./micro/PreviewSkills";

export function ProfessionalTemplatePreview() {
  return (
    <PreviewWrapper font="libre">
      <PreviewHeader
        name="Alexander Smith"
        contact={["alex.smith@email.com", "(555) 123-4567", "San Francisco, CA"]}
        layout="left"
        borderColor="border-[#1e293b]"
        borderWidth="border-b-[2px]"
        nameSize="text-[5.5px]"
        nameWeight="font-bold"
        separator=" "
      />

      <PreviewSection
        title="Professional Summary"
        titleClassName="border-b border-[#e2e8f0] pb-[0.5px] text-[3px] font-bold uppercase tracking-[0.1em] text-[#1e293b]"
      >
        <PreviewText className="text-[#334155]">
          Accomplished software engineer with extensive experience in full-stack development and enterprise systems. Proven track record of delivering high-quality solutions.
        </PreviewText>
      </PreviewSection>

      <PreviewSection
        title="Experience History"
        titleClassName="border-b border-[#e2e8f0] pb-[0.5px] text-[3px] font-bold uppercase tracking-[0.1em] text-[#1e293b]"
      >
        <PreviewJob
          title="Senior Software Engineer"
          company="Tech Corporation"
          period="2020 - Present"
          location="San Francisco, CA"
          bullets={[
            "Architected and implemented scalable microservices platform",
            "Led team of 5 engineers in agile development environment"
          ]}
          layout="professional"
          companyColor="text-[#334155]"
        />
      </PreviewSection>

      <PreviewSection
        title="Core Competencies"
        titleClassName="border-b border-[#e2e8f0] pb-[0.5px] text-[3px] font-bold uppercase tracking-[0.1em] text-[#1e293b]"
      >
        <PreviewSkills skills={["JavaScript", "Python", "Java", "React", "Spring", "AWS"]} variant="professional" />
      </PreviewSection>
    </PreviewWrapper>
  );
}
