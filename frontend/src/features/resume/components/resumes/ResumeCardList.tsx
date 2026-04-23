import { ResumeCard } from "./ResumeCard";
import type { Resume } from "../../services/resume.service";

interface ResumeCardListProps {
  resumes: Resume[];
  onDelete: (resume: Resume) => void;
}

export function ResumeCardList({ resumes, onDelete }: ResumeCardListProps) {
  return (
    <div className="lg:hidden grid gap-4">
      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          onDelete={() => onDelete(resume)}
        />
      ))}
    </div>
  );
}
