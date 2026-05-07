import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { JOB_DETAILS_CARD_STYLES, TEXTAREA_FIELDS } from "../../constants/cover-letter.constants";
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
  onRemoveFile,
  fieldErrors,
  formErrors,
  generating,
  onGenerate
}: JobDetailsCardProps) {
  return (
    <Card className={JOB_DETAILS_CARD_STYLES.card}>
      <CardHeader>
        <JobDetailsCardHeader />
      </CardHeader>
      <CardContent>
        <form noValidate onSubmit={onGenerate} className={JOB_DETAILS_CARD_STYLES.content}>
          <CoverLetterFormErrorSummary messages={formErrors} />

          <div className={JOB_DETAILS_CARD_STYLES.inputGrid}>
            <FormInputField
              id="company"
              label="Company Name"
              placeholder="e.g., Google"
              value={company}
              onChange={onCompanyChange}
              error={fieldErrors.company}
            />
            <FormInputField
              id="position"
              label="Position Title"
              placeholder="e.g., Senior Software Engineer"
              value={position}
              onChange={onPositionChange}
              error={fieldErrors.position}
            />
          </div>

          <ToneSelector value={tone} onChange={onToneChange} />

          <ResumeUploadSection
            uploadedFile={uploadedFile}
            onFileUpload={onFileUpload}
            onRemoveFile={onRemoveFile}
          />

          <TextareaField
            id={TEXTAREA_FIELDS.jobDescription.id}
            label={TEXTAREA_FIELDS.jobDescription.label}
            placeholder={TEXTAREA_FIELDS.jobDescription.placeholder}
            minHeight={TEXTAREA_FIELDS.jobDescription.minHeight}
            value={jobDescription}
            onChange={onJobDescriptionChange}
            error={fieldErrors.jobDescription}
          />

          <TextareaField
            id={TEXTAREA_FIELDS.highlights.id}
            label={TEXTAREA_FIELDS.highlights.label}
            placeholder={TEXTAREA_FIELDS.highlights.placeholder}
            minHeight={TEXTAREA_FIELDS.highlights.minHeight}
            value={highlights}
            onChange={onHighlightsChange}
            error={fieldErrors.highlights}
            hint={TEXTAREA_FIELDS.highlights.hint}
          />

          <GenerateButton generating={generating} />
        </form>
      </CardContent>
    </Card>
  );
}
