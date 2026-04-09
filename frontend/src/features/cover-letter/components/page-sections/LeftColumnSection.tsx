import { COVER_LETTER_PAGE_STYLES } from "../../constants/cover-letter.constants";
import { JobDetailsCard } from "../job-details";
import type { ToneOption } from "../../types/cover-letter.types";

interface LeftColumnSectionProps {
  tone: ToneOption;
  onToneChange: (value: ToneOption) => void;
  uploadedFile: string | null;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  generating: boolean;
  onGenerate: () => void;
}

export function LeftColumnSection({
  tone,
  onToneChange,
  uploadedFile,
  onFileUpload,
  onRemoveFile,
  generating,
  onGenerate
}: LeftColumnSectionProps) {
  return (
    <div className={COVER_LETTER_PAGE_STYLES.leftColumn}>
      <JobDetailsCard
        tone={tone}
        onToneChange={onToneChange}
        uploadedFile={uploadedFile}
        onFileUpload={onFileUpload}
        onRemoveFile={onRemoveFile}
        generating={generating}
        onGenerate={onGenerate}
      />
    </div>
  );
}
