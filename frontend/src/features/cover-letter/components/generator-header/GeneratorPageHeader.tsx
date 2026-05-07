import { Sparkles } from "lucide-react";
import { WorkspacePageHeader } from "@/shared/components/WorkspacePageHeader";
import { COVER_LETTER_HEADER_CONTENT } from "../../constants/cover-letter.constants";

export function GeneratorPageHeader() {
  return (
    <WorkspacePageHeader
      badge={COVER_LETTER_HEADER_CONTENT.badge}
      badgeIcon={Sparkles}
      title={COVER_LETTER_HEADER_CONTENT.title}
      description={COVER_LETTER_HEADER_CONTENT.description}
    />
  );
}
