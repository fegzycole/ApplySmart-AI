import { PreviewWrapper } from "./micro/PreviewWrapper";
import { PreviewHeader } from "./micro/PreviewHeader";
import { PreviewSection } from "./micro/PreviewSection";
import { PreviewJob } from "./micro/PreviewJob";
import { PreviewText } from "./micro/PreviewText";

export function ClassicTemplatePreview() {
  return (
    <PreviewWrapper font="garamond">
      <PreviewHeader
        name="ALEXANDER SMITH"
        contact={["alex.smith@email.com | (555) 123-4567 | San Francisco, CA"]}
        borderColor="border-[#18181b]"
        borderWidth="border-b-[2px]"
        nameSize="text-[5.8px]"
        nameWeight="font-bold"
      />

      <PreviewSection
        title="Professional Summary"
        titleClassName="border-b border-[#18181b] pb-[0.5px] text-[3px] font-bold uppercase tracking-[0.16em] text-[#18181b]"
      >
        <PreviewText italic className="text-[#18181b]">
          Senior software engineer with a record of delivering reliable platforms and collaborative product outcomes.
        </PreviewText>
      </PreviewSection>

      <PreviewSection
        title="Professional Experience"
        titleClassName="border-b border-[#18181b] pb-[0.5px] text-[3px] font-bold uppercase tracking-[0.16em] text-[#18181b]"
      >
        <PreviewJob
          title="Senior Software Engineer"
          company="Tech Corporation"
          period="2020 - Present"
          location="San Francisco, CA"
          bullets={[
            "Developed full-stack applications using modern technologies",
            "Collaborated with cross-functional teams on product delivery"
          ]}
          layout="classic"
        />
      </PreviewSection>

      <PreviewSection
        title="Education"
        titleClassName="border-b border-[#18181b] pb-[0.5px] text-[3px] font-bold uppercase tracking-[0.16em] text-[#18181b]"
      >
        <div>
          <div className="text-[2.6px] font-bold uppercase text-[#18181b]">University of California</div>
          <div className="text-[2.4px] font-medium italic text-[#27272a]">Bachelor of Science in Computer Science</div>
        </div>
      </PreviewSection>

      <PreviewSection
        title="Core Competencies"
        titleClassName="border-b border-[#18181b] pb-[0.5px] text-[3px] font-bold uppercase tracking-[0.16em] text-[#18181b]"
      >
        <div className="text-[2.4px] font-medium tracking-wide text-[#18181b]">
          JavaScript • TypeScript • React • Node.js • Python • Java • SQL • AWS
        </div>
      </PreviewSection>
    </PreviewWrapper>
  );
}
