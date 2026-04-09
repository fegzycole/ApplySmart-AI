import { ResumeCard } from "./ResumeCard";
import type { Resume } from "../../services/resume.service";

interface ResumeCardListProps {
  resumes: Resume[];
  onToggleFavorite: (id: number) => void;
  onDelete: (resume: Resume) => void;
}

export function ResumeCardList({ resumes, onToggleFavorite, onDelete }: ResumeCardListProps) {
  return (
    <div className="lg:hidden grid gap-4">
      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          onToggleFavorite={onToggleFavorite}
          onDelete={() => onDelete(resume)}
        />
      ))}
    </div>
  );
}
