import { ResumeData } from "../../../contexts/ResumeBuilderContext";

export function CreativePreview({ data }: { data: ResumeData }) {
  const { personalInfo, summary, workExperience, education, skills } = data;

  return (
    <div className="bg-white min-h-[11in] w-full" style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      {/* Colored Sidebar */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-gradient-to-b from-fuchsia-600 to-pink-600 p-6 md:p-8 text-white">
          <div className="mb-8">
            <h1 className="text-[24pt] font-bold mb-2">{personalInfo.name || "Your Name"}</h1>
            {personalInfo.email && <p className="text-[9pt] mb-1">{personalInfo.email}</p>}
            {personalInfo.phone && <p className="text-[9pt] mb-1">{personalInfo.phone}</p>}
            {personalInfo.location && <p className="text-[9pt] mb-1">{personalInfo.location}</p>}
            {personalInfo.linkedin && <p className="text-[9pt] mb-1">{personalInfo.linkedin}</p>}
            {personalInfo.github && <p className="text-[9pt] mb-1">{personalInfo.github}</p>}
            {personalInfo.website && <p className="text-[9pt]">{personalInfo.website}</p>}
          </div>

          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[12pt] font-bold mb-3 border-b-2 border-white/30 pb-2">SKILLS</h2>
              <div className="space-y-1.5">
                {skills.map((skill, idx) => (
                  <div key={idx} className="text-[9pt] px-2 py-1 bg-white/20 rounded">{skill}</div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[12pt] font-bold mb-3 border-b-2 border-white/30 pb-2">EDUCATION</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="font-bold text-[10pt]">{edu.degree || "Degree"}</div>
                  <div className="text-[9pt] opacity-90">{edu.institution || "Institution"}</div>
                  <div className="text-[8pt] opacity-75">{edu.graduationDate || "Year"}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-8">
          {summary && (
            <div className="mb-6">
              <h2 className="text-[14pt] font-bold text-fuchsia-600 mb-3">PROFILE</h2>
              <p className="text-[10pt] leading-relaxed text-gray-700">{summary}</p>
            </div>
          )}

          {workExperience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[14pt] font-bold text-fuchsia-600 mb-3">EXPERIENCE</h2>
              {workExperience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <h3 className="text-[11pt] font-bold text-gray-900">{exp.position || "Position"}</h3>
                  <div className="text-[10pt] text-fuchsia-600 font-semibold mb-1">{exp.company || "Company"}</div>
                  <div className="text-[9pt] text-gray-500 mb-2">
                    {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ""}
                  </div>
                  {exp.responsibilities.length > 0 && (
                    <ul className="list-disc ml-4 text-[9.5pt] text-gray-700 space-y-0.5">
                      {exp.responsibilities.map((resp, idx) => resp && <li key={idx}>{resp}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
