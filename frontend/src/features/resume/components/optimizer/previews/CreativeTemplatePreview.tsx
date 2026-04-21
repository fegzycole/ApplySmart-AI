import { PreviewWrapper } from "./micro/PreviewWrapper";
import { PreviewHeader } from "./micro/PreviewHeader";
import { PreviewSection } from "./micro/PreviewSection";
import { PreviewText } from "./micro/PreviewText";
import { PreviewJob } from "./micro/PreviewJob";
import { PreviewSkills } from "./micro/PreviewSkills";

export function CreativeTemplatePreview() {
  return (
    <PreviewWrapper font="sans">
      <PreviewHeader
        name="ALEXANDER SMITH"
        contact={["alex.smith@email.com", "(555) 123-4567", "San Francisco, CA"]}
        borderColor="border-indigo-500"
        nameWeight="font-black"
        separatorColor="text-indigo-500"
      />

      <PreviewSection title="Professional Summary" titleColor="text-indigo-500" titleSize="text-[3px]" titleWeight="font-extrabold">
        <PreviewText>
          Creative software engineer with expertise in modern web technologies and design. Specializing in building beautiful, user-centric applications.
        </PreviewText>
      </PreviewSection>

      <PreviewSection title="Work Experience" titleColor="text-indigo-500" titleSize="text-[3px]" titleWeight="font-extrabold">
        <PreviewJob
          title="Lead Developer"
          company="Creative Studios"
          period="2021 - Present"
          bullets={[
            "Developed cutting-edge web applications",
            "Enhanced user experience across platforms"
          ]}
          companyColor="text-indigo-600"
        />
      </PreviewSection>

      <PreviewSection title="Skills" titleColor="text-indigo-500" titleSize="text-[3px]" titleWeight="font-extrabold">
        <PreviewSkills skills={["React", "Vue.js", "Node.js", "TypeScript", "Design"]} variant="creative" />
      </PreviewSection>
    </PreviewWrapper>
  );
}
