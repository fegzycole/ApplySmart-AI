import { PreviewWrapper } from "./micro/PreviewWrapper";
import { PreviewHeader } from "./micro/PreviewHeader";
import { PreviewSection } from "./micro/PreviewSection";
import { PreviewJob } from "./micro/PreviewJob";

export function ClassicTemplatePreview() {
  return (
    <PreviewWrapper font="serif">
      <PreviewHeader
        name="Alexander Smith"
        contact={["alex.smith@email.com | (555) 123-4567 | San Francisco, CA"]}
        separator=""
      />

      <PreviewSection title="Experience" titleColor="text-black" titleSize="text-[3px]" borderColor="border-slate-500">
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

      <PreviewSection title="Education" titleColor="text-black" titleSize="text-[3px]" borderColor="border-slate-500">
        <div>
          <div className="text-[2.6px] font-bold">Bachelor of Science in Computer Science</div>
          <div className="text-[2.4px] text-slate-600">University of California, 2020</div>
        </div>
      </PreviewSection>

      <PreviewSection title="Skills" titleColor="text-black" titleSize="text-[3px]" borderColor="border-slate-500">
        <div className="text-[2.4px] text-slate-700">
          JavaScript, TypeScript, React, Node.js, Python, Java, SQL, AWS, Docker, Git
        </div>
      </PreviewSection>
    </PreviewWrapper>
  );
}
