import { ResumeData } from "../../../contexts/ResumeBuilderContext";

export function ClassicPreview({ data }: { data: ResumeData }) {
  const { personalInfo, summary, workExperience, education, skills } = data;

  return (
    <div className="bg-white p-8 md:p-12 min-h-[11in] w-full" style={{ fontFamily: 'Times New Roman, serif' }}>
      <div className="text-center mb-6 pb-4 border-b-2 border-black">
        <h1 className="text-[26pt] font-bold mb-2">{personalInfo.name || "Your Name"}</h1>
        <div className="text-[10pt] space-x-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-4">
          <h2 className="text-[12pt] font-bold uppercase mb-2 border-b border-gray-400">Summary</h2>
          <p className="text-[11pt] text-justify">{summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[12pt] font-bold uppercase mb-2 border-b border-gray-400">Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between font-bold text-[11pt]">
                <span>{exp.position || "Position"}</span>
                <span>{exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ""}</span>
              </div>
              <div className="italic text-[10.5pt] mb-1">{exp.company || "Company"}</div>
              {exp.responsibilities.length > 0 && (
                <ul className="list-disc ml-5 text-[10pt]">
                  {exp.responsibilities.map((resp, idx) => resp && <li key={idx}>{resp}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[12pt] font-bold uppercase mb-2 border-b border-gray-400">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2 flex justify-between text-[10.5pt]">
              <span className="font-semibold">{edu.degree || "Degree"} - {edu.institution || "Institution"}</span>
              <span>{edu.graduationDate || "Year"}</span>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[12pt] font-bold uppercase mb-2 border-b border-gray-400">Skills</h2>
          <p className="text-[10.5pt]">{skills.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
