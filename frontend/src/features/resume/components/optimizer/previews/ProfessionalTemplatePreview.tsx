import { PreviewWrapper } from "./micro/PreviewWrapper";
import { PreviewHeader } from "./micro/PreviewHeader";
import { PreviewSection } from "./micro/PreviewSection";
import { PreviewText } from "./micro/PreviewText";
import { PreviewJob } from "./micro/PreviewJob";
import { PreviewSkills } from "./micro/PreviewSkills";

export function ProfessionalTemplatePreview() {
  return (
    <PreviewWrapper font="serif">
      <PreviewHeader
        name="Alexander Smith"
        contact={["alex.smith@email.com", "(555) 123-4567", "San Francisco, CA"]}
        layout="left"
        borderColor="border-black"
        borderWidth="border-b-[1px]"
        nameSize="text-[5.5px]"
        separator=" "
      />

      <PreviewSection title="Professional Summary" titleColor="text-black" titleSize="text-[3px]" borderColor="border-slate-400">
        <PreviewText italic>
          Accomplished software engineer with extensive experience in full-stack development and enterprise systems. Proven track record of delivering high-quality solutions.
        </PreviewText>
      </PreviewSection>

      <PreviewSection title="Professional Experience" titleColor="text-black" titleSize="text-[3px]" borderColor="border-slate-400">
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
          companyColor="text-slate-700"
        />
      </PreviewSection>

      <PreviewSection title="Technical Skills" titleColor="text-black" titleSize="text-[3px]" borderColor="border-slate-400">
        <PreviewSkills skills={["JavaScript", "Python", "Java", "React", "Spring", "AWS"]} variant="professional" />
      </PreviewSection>
    </PreviewWrapper>
  );
}
