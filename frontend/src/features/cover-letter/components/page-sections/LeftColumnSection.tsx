import { COVER_LETTER_PAGE_STYLES } from "../../constants/cover-letter.constants";
import { JobDetailsCard } from "../job-details";
import type { CoverLetterFormData, ToneOption } from "../../types/cover-letter.types";
import type { FormEvent } from "react";

interface LeftColumnSectionProps {
  company: string;
  position: string;
  jobDescription: string;
  highlights: string;
  tone: ToneOption;
  onCompanyChange: (value: string) => void;
  onPositionChange: (value: string) => void;
  onJobDescriptionChange: (value: string) => void;
  onHighlightsChange: (value: string) => void;
  onToneChange: (value: ToneOption) => void;
  uploadedFile: File | null;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  fieldErrors: Partial<Record<keyof CoverLetterFormData, string>>;
  formErrors: string[];
  generating: boolean;
  onGenerate: (event: FormEvent<HTMLFormElement>) => void;
}

export function LeftColumnSection({
  company,
  position,
  jobDescription,
  highlights,
  tone,
  onCompanyChange,
  onPositionChange,
  onJobDescriptionChange,
  onHighlightsChange,
  onToneChange,
  uploadedFile,
  onFileUpload,
  onRemoveFile,
  fieldErrors,
  formErrors,
  generating,
  onGenerate
}: LeftColumnSectionProps) {
  return (
    <div className={COVER_LETTER_PAGE_STYLES.leftColumn}>
      <JobDetailsCard
        company={company}
        position={position}
        jobDescription={jobDescription}
        highlights={highlights}
        tone={tone}
        onCompanyChange={onCompanyChange}
        onPositionChange={onPositionChange}
        onJobDescriptionChange={onJobDescriptionChange}
        onHighlightsChange={onHighlightsChange}
        onToneChange={onToneChange}
        uploadedFile={uploadedFile}
        onFileUpload={onFileUpload}
        onRemoveFile={onRemoveFile}
        fieldErrors={fieldErrors}
        formErrors={formErrors}
        generating={generating}
        onGenerate={onGenerate}
      />
    </div>
  );
}
