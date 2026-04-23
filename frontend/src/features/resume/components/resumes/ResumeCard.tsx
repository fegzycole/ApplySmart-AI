import { Card, CardContent } from "@/shared/components/ui/card";
import { ResumeCardHeader } from "./ResumeCardHeader";
import { DateInfoSection } from "./DateInfoSection";
import { ResumeActions } from "./ResumeActions";
import { RESUME_CARD_STYLES } from "../../constants/resume-card.constants";
import type { Resume } from "../../services/resume.service";

interface ResumeCardProps {
  resume: Resume;
  onDelete: () => void;
}

export function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  return (
    <Card className={RESUME_CARD_STYLES.cardClassName}>
      <ResumeCardHeader resume={resume} />

      <CardContent className="space-y-3">
        <DateInfoSection resume={resume} />
        <ResumeActions resumeId={String(resume.id)} onDelete={onDelete} />
      </CardContent>
    </Card>
  );
}
