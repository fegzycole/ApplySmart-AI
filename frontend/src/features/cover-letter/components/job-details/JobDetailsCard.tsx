import { SYNTHESIS_STAGE_STYLES, TEXTAREA_FIELDS } from "../../constants/cover-letter.constants";
import { FormInputField } from "./FormInputField";
import { ToneSelector } from "./ToneSelector";
import { ResumeUploadSection } from "../resume-upload/ResumeUploadSection";
import { JobDetailsCardHeader } from "./JobDetailsCardHeader";
import { TextareaField } from "./TextareaField";
import { GenerateButton } from "./GenerateButton";
import { CoverLetterFormErrorSummary } from "./CoverLetterFormErrorSummary";
import type { CoverLetterFormData, ToneOption } from "../../types/cover-letter.types";
import type { ChangeEvent, FormEvent } from "react";

interface JobDetailsCardProps {
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
  onFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileDrop: (file: File) => void;
  onRemoveFile: () => void;
  fieldErrors: Partial<Record<keyof CoverLetterFormData, string>>;
  formErrors: string[];
  generating: boolean;
  onGenerate: (event: FormEvent<HTMLFormElement>) => void;
}

export function JobDetailsCard({
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
  onFileDrop,
  onRemoveFile,
  fieldErrors,
  formErrors,
  generating,
  onGenerate
}: JobDetailsCardProps) {
  return (
    <div className={SYNTHESIS_STAGE_STYLES.panel}>
      <div className="p-4 sm:p-8 lg:p-10 xl:p-12">
        <JobDetailsCardHeader />

        <form noValidate onSubmit={onGenerate} className="mt-6 space-y-6 sm:mt-10 sm:space-y-8 lg:space-y-10">
          <CoverLetterFormErrorSummary messages={formErrors} />

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:gap-8">
            <FormInputField
              id="company"
              label="Target Company"
              placeholder="e.g., Stripe"
              value={company}
              onChange={onCompanyChange}
              error={fieldErrors.company}
            />
            <FormInputField
              id="position"
              label="Mission Role"
              placeholder="e.g., Product Designer"
              value={position}
              onChange={onPositionChange}
              error={fieldErrors.position}
            />
          </div>

          <ToneSelector value={tone} onChange={onToneChange} />

          <ResumeUploadSection
            uploadedFile={uploadedFile}
            onFileUpload={onFileUpload}
            onFileDrop={onFileDrop}
            onRemoveFile={onRemoveFile}
          />

          <TextareaField
            id={TEXTAREA_FIELDS.jobDescription.id}
            label="Role Blueprint (Job Description)"
            placeholder="Paste the complete role requirements here..."
            minHeight="min-h-[220px]"
            value={jobDescription}
            onChange={onJobDescriptionChange}
            error={fieldErrors.jobDescription}
          />

          <TextareaField
            id={TEXTAREA_FIELDS.highlights.id}
            label="Strategic Highlights"
            placeholder="e.g., Led cross-functional teams, Reduced churn by 15%..."
            minHeight="min-h-[140px]"
            value={highlights}
            onChange={onHighlightsChange}
            error={fieldErrors.highlights}
            hint="These fragments will be prioritized during synthesis."
          />

          <div className="pt-4">
            <GenerateButton generating={generating} />
          </div>
        </form>
      </div>
    </div>
  );
}
