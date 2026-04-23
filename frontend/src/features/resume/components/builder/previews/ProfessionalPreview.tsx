import { ResumeData } from "../../../contexts/ResumeBuilderContext";

interface ProfessionalPreviewProps {
  data: ResumeData;
}

export function ProfessionalPreview({ data }: ProfessionalPreviewProps) {
  const { personalInfo, summary, workExperience, education, skills } = data;

  return (
    <div className="bg-white p-8 md:p-12 min-h-[11in] w-full" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="mb-6 pb-4 border-b-2 border-[#2c3e50]">
        <h1 className="text-[32pt] font-bold text-[#2c3e50] mb-3">
          {personalInfo.name || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-x-3 text-[10pt] text-[#555]">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>| {personalInfo.github}</span>}
          {personalInfo.website && <span>| {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-5">
          <h2 className="text-[13pt] font-bold text-[#2c3e50] mb-2 uppercase border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-[10.5pt] leading-relaxed text-[#555]">{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[13pt] font-bold text-[#2c3e50] mb-3 uppercase border-b border-gray-300 pb-1">
            Work Experience
          </h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-[11.5pt] font-bold text-[#2c3e50]">
                  {exp.position || "Position"} - {exp.company || "Company"}
                </h3>
                <span className="text-[10pt] text-[#666]">
                  {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : "Date"}
                </span>
              </div>
              {exp.responsibilities.length > 0 && exp.responsibilities[0] && (
                <ul className="list-disc list-outside ml-5 space-y-0.5">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-[10pt] text-[#555]">{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[13pt] font-bold text-[#2c3e50] mb-2 uppercase border-b border-gray-300 pb-1">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between">
                <span className="text-[11pt] font-semibold text-[#2c3e50]">
                  {edu.degree || "Degree"} - {edu.institution || "Institution"}
                </span>
                <span className="text-[10pt] text-[#666]">{edu.graduationDate || "Year"}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[13pt] font-bold text-[#2c3e50] mb-2 uppercase border-b border-gray-300 pb-1">
            Skills
          </h2>
          <p className="text-[10pt] text-[#555]">{skills.join(" • ")}</p>
        </div>
      )}
    </div>
  );
}
