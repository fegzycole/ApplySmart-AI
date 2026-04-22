import { PreviewWrapper } from "./micro/PreviewWrapper";
import { PreviewHeader } from "./micro/PreviewHeader";
import { PreviewSection } from "./micro/PreviewSection";
import { PreviewText } from "./micro/PreviewText";
import { PreviewJob } from "./micro/PreviewJob";
import { PreviewSkills } from "./micro/PreviewSkills";

export function ModernTemplatePreview() {
  return (
    <PreviewWrapper font="sans">
      <PreviewHeader
        name="ALEXANDER SMITH"
        contact={["alex.smith@email.com", "(555) 123-4567", "San Francisco, CA"]}
        borderColor="border-blue-500"
      />

      <PreviewSection title="Professional Summary">
        <PreviewText>
          Results-driven software engineer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architectures.
        </PreviewText>
      </PreviewSection>

      <PreviewSection title="Work Experience">
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

      <PreviewSection title="Skills">
        <PreviewSkills skills={["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"]} />
      </PreviewSection>
    </PreviewWrapper>
  );
}
