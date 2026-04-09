import { FileText } from "lucide-react";
import { RESUME_CARD_STYLES } from "../../constants/resume-card.constants";

export function ResumeCardIcon() {
  return (
    <div className={RESUME_CARD_STYLES.iconContainerClassName}>
      <FileText className="size-6 text-white" />
    </div>
  );
}
