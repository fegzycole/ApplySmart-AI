import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { JOB_DETAILS_CARD_STYLES, TEXTAREA_FIELDS } from "../../constants/cover-letter.constants";
import { FormInputField } from "./FormInputField";
import { ToneSelector } from "./ToneSelector";
import { ResumeUploadSection } from "../resume-upload/ResumeUploadSection";
import { JobDetailsCardHeader } from "./JobDetailsCardHeader";
import { TextareaField } from "./TextareaField";
import { GenerateButton } from "./GenerateButton";
import type { ToneOption } from "../../types/cover-letter.types";

interface JobDetailsCardProps {
  tone: ToneOption;
  onToneChange: (value: ToneOption) => void;
  uploadedFile: string | null;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  generating: boolean;
  onGenerate: () => void;
}

export function JobDetailsCard({
  tone,
  onToneChange,
  uploadedFile,
  onFileUpload,
  onRemoveFile,
  generating,
  onGenerate
}: JobDetailsCardProps) {
  return (
    <Card className={JOB_DETAILS_CARD_STYLES.card}>
      <CardHeader>
        <JobDetailsCardHeader />
      </CardHeader>
      <CardContent className={JOB_DETAILS_CARD_STYLES.content}>
        <div className={JOB_DETAILS_CARD_STYLES.inputGrid}>
          <FormInputField id="company" label="Company Name" placeholder="e.g., Google" />
          <FormInputField id="position" label="Position Title" placeholder="e.g., Senior Software Engineer" />
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
        />

        <TextareaField
          id={TEXTAREA_FIELDS.highlights.id}
          label={TEXTAREA_FIELDS.highlights.label}
          placeholder={TEXTAREA_FIELDS.highlights.placeholder}
          minHeight={TEXTAREA_FIELDS.highlights.minHeight}
          hint={TEXTAREA_FIELDS.highlights.hint}
        />

        <GenerateButton generating={generating} onGenerate={onGenerate} />
      </CardContent>
    </Card>
  );
}
