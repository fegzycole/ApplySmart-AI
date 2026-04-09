import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Upload, X, FileCheck } from "lucide-react";
import { RESUME_UPLOAD_STYLES } from "../../constants/cover-letter.constants";

interface ResumeUploadSectionProps {
  uploadedFile: string | null;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
}

export function ResumeUploadSection({ uploadedFile, onFileUpload, onRemoveFile }: ResumeUploadSectionProps) {
  return (
    <div className={RESUME_UPLOAD_STYLES.wrapper}>
      <Label className={RESUME_UPLOAD_STYLES.label}>
        <Upload className={RESUME_UPLOAD_STYLES.labelIcon} />
        Upload Resume (Optional)
      </Label>
      <p className={RESUME_UPLOAD_STYLES.hint}>
        Upload your resume to help AI personalize your cover letter
      </p>

      {!uploadedFile ? (
        <div className={RESUME_UPLOAD_STYLES.uploadArea.wrapper}>
          <input
            type="file"
            id="resume-upload"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={onFileUpload}
          />
          <label htmlFor="resume-upload" className={RESUME_UPLOAD_STYLES.uploadArea.label}>
            <div className={RESUME_UPLOAD_STYLES.uploadArea.icon.wrapper}>
              <Upload className={RESUME_UPLOAD_STYLES.uploadArea.icon.icon} />
            </div>
            <p className={RESUME_UPLOAD_STYLES.uploadArea.title}>
              Click to upload or drag and drop
            </p>
            <p className={RESUME_UPLOAD_STYLES.uploadArea.description}>
              PDF, DOC or DOCX (max. 5MB)
            </p>
          </label>
          <div className={RESUME_UPLOAD_STYLES.uploadArea.glow} />
        </div>
      ) : (
        <div className={RESUME_UPLOAD_STYLES.uploadedFile.container}>
          <div className={RESUME_UPLOAD_STYLES.uploadedFile.content}>
            <div className={RESUME_UPLOAD_STYLES.uploadedFile.icon.wrapper}>
              <FileCheck className={RESUME_UPLOAD_STYLES.uploadedFile.icon.icon} />
            </div>
            <div>
              <p className={RESUME_UPLOAD_STYLES.uploadedFile.fileName}>{uploadedFile}</p>
              <p className={RESUME_UPLOAD_STYLES.uploadedFile.status}>Successfully uploaded</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveFile}
            className={RESUME_UPLOAD_STYLES.uploadedFile.removeButton}
          >
            <X className={RESUME_UPLOAD_STYLES.uploadedFile.removeIcon} />
          </Button>
        </div>
      )}
    </div>
  );
}
