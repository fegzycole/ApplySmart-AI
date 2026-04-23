import { ResumeData } from "../../../contexts/ResumeBuilderContext";

interface ModernPreviewProps {
  data: ResumeData;
}

export function ModernPreview({ data }: ModernPreviewProps) {
  const { personalInfo, summary, workExperience, education, skills } = data;

  return (
    <div className="bg-white p-8 md:p-12 min-h-[11in] w-full" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-5 pb-3 border-b-[3px] border-[#3498db]">
        <h1 className="text-[28pt] font-bold text-[#2c3e50] mb-2 tracking-wide">
          {personalInfo.name || "Your Name"}
        </h1>
        <div className="flex justify-center flex-wrap gap-x-4 text-[10pt] text-[#555]">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-[18px]">
          <h2 className="text-[14pt] font-bold text-[#3498db] mb-3 uppercase tracking-wide border-b-2 border-[#ecf0f1] pb-1.5">
            Professional Summary
          </h2>
          <p className="text-[10.5pt] leading-relaxed text-[#555] text-justify">
            {summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-[18px]">
          <h2 className="text-[14pt] font-bold text-[#3498db] mb-3 uppercase tracking-wide border-b-2 border-[#ecf0f1] pb-1.5">
            Work Experience
          </h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-[18px]">
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="text-[12pt] font-bold text-[#2c3e50]">
                    {exp.position || "Position"}
                  </h3>
                  <div className="text-[11pt] text-[#34495e] font-medium">
                    {exp.company || "Company"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10pt] text-[#7f8c8d]">
                    {exp.startDate && exp.endDate
                      ? `${exp.startDate} - ${exp.endDate}`
                      : exp.startDate || "Date"}
                  </div>
                  {exp.location && (
                    <div className="text-[10pt] text-[#95a5a6]">{exp.location}</div>
                  )}
                </div>
              </div>
              {exp.responsibilities.length > 0 && exp.responsibilities[0] && (
                <ul className="list-disc list-outside ml-5 space-y-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-[10pt] leading-relaxed text-[#555] pl-1">
                      {resp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-[18px]">
          <h2 className="text-[14pt] font-bold text-[#3498db] mb-3 uppercase tracking-wide border-b-2 border-[#ecf0f1] pb-1.5">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-[11.5pt] font-bold text-[#2c3e50]">
                    {edu.degree || "Degree"}{edu.field && ` in ${edu.field}`}
                  </h3>
                  <div className="text-[10.5pt] text-[#34495e]">
                    {edu.institution || "Institution"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10pt] text-[#7f8c8d]">
                    {edu.graduationDate || "Year"}
                  </div>
                  {edu.location && (
                    <div className="text-[10pt] text-[#95a5a6]">{edu.location}</div>
                  )}
                </div>
              </div>
              {edu.gpa && (
                <div className="text-[10pt] text-[#555] mt-1">GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-[18px]">
          <h2 className="text-[14pt] font-bold text-[#3498db] mb-3 uppercase tracking-wide border-b-2 border-[#ecf0f1] pb-1.5">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-block px-3 py-1 bg-[#ecf0f1] text-[#2c3e50] text-[9.5pt] rounded font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!personalInfo.name && !summary && workExperience.length === 0 && education.length === 0 && skills.length === 0 && (
        <div className="flex items-center justify-center h-64 text-center">
          <div>
            <p className="text-2xl text-zinc-300 mb-2">Start building your resume</p>
            <p className="text-zinc-400">Your changes will appear here instantly</p>
          </div>
        </div>
      )}
    </div>
  );
}
