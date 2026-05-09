import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { FORM_FIELD_CONFIG, JOB_FORM_DIALOG_STYLES } from "../constants/job-tracker.constants";
import { useJobForm } from "../hooks/useJobForm";
import type { Job, JobFormData, JobSubmitResult, JobValidationFeedback } from "../types/job.types";
import { getJobValidationSummary } from "../utils/job-tracker.validation";
import {
  JobFormActions,
  JobFormErrorSummary,
  JobFormField,
  JobFormStatusField,
} from "./job-form-dialog";

interface JobFormDialogProps {
  open: boolean;
  job: Job | null;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: JobFormData) => JobSubmitResult | Promise<JobSubmitResult>;
}

export function JobFormDialog({
  open,
  job,
  isPending,
  onOpenChange,
  onSubmit,
}: JobFormDialogProps) {
  const { formData, updateField } = useJobForm(job, open);
  const [validation, setValidation] = useState<JobValidationFeedback | null>(null);
  const isEditing = job !== null;
  const validationMessages = getJobValidationSummary(validation);

  useEffect(() => {
    if (!open) {
      setValidation(null);
      return;
    }

    setValidation(null);
  }, [job, open]);

  const handleFieldChange = <K extends keyof JobFormData>(field: K, value: JobFormData[K]) => {
    updateField(field, value);
    setValidation((currentValidation) => {
      if (!currentValidation || !currentValidation.fieldErrors[field]) {
        return currentValidation;
      }

      const nextFieldErrors = { ...currentValidation.fieldErrors };
      delete nextFieldErrors[field];

      return {
        ...currentValidation,
        fieldErrors: nextFieldErrors,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await onSubmit(formData);

    if (!result.success) {
      setValidation(result.validation ?? null);
      return;
    }

    setValidation(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={JOB_FORM_DIALOG_STYLES.content}>
        <DialogHeader className={JOB_FORM_DIALOG_STYLES.header}>
          <DialogTitle className="text-3xl font-black tracking-tighter leading-none text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
            {isEditing ? "Calibrate" : "Add an"} <span className="text-sky-500">Opportunity</span>
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-zinc-500 mt-3 leading-relaxed dark:text-zinc-400 sm:text-base sm:mt-4 lg:text-lg lg:mt-6">
            {isEditing
              ? "Refine the artifact details to keep your journey synchronized."
              : "Capture a new milestone and start tracking your progress."}
          </DialogDescription>
        </DialogHeader>

        <form noValidate onSubmit={handleSubmit} className={JOB_FORM_DIALOG_STYLES.form}>
          <JobFormErrorSummary messages={validationMessages} />
          <div className={JOB_FORM_DIALOG_STYLES.fieldGrid}>
            <JobFormField
              id="company"
              label={FORM_FIELD_CONFIG.company.label}
              value={formData.company}
              onChange={(value) => handleFieldChange("company", value)}
              placeholder={FORM_FIELD_CONFIG.company.placeholder}
              type={FORM_FIELD_CONFIG.company.type}
              required
              error={validation?.fieldErrors.company}
            />
            <JobFormField
              id="role"
              label={FORM_FIELD_CONFIG.role.label}
              value={formData.role}
              onChange={(value) => handleFieldChange("role", value)}
              placeholder={FORM_FIELD_CONFIG.role.placeholder}
              type={FORM_FIELD_CONFIG.role.type}
              required
              error={validation?.fieldErrors.role}
            />
            <JobFormField
              id="location"
              label={FORM_FIELD_CONFIG.location.label}
              value={formData.location}
              onChange={(value) => handleFieldChange("location", value)}
              placeholder={FORM_FIELD_CONFIG.location.placeholder}
              type={FORM_FIELD_CONFIG.location.type}
              error={validation?.fieldErrors.location}
            />
            <JobFormField
              id="salary"
              label={FORM_FIELD_CONFIG.salary.label}
              value={formData.salary}
              onChange={(value) => handleFieldChange("salary", value)}
              placeholder={FORM_FIELD_CONFIG.salary.placeholder}
              type={FORM_FIELD_CONFIG.salary.type}
              error={validation?.fieldErrors.salary}
            />
            <JobFormField
              id="link"
              label={FORM_FIELD_CONFIG.link.label}
              value={formData.link}
              onChange={(value) => handleFieldChange("link", value)}
              placeholder={FORM_FIELD_CONFIG.link.placeholder}
              type={FORM_FIELD_CONFIG.link.type}
              className={JOB_FORM_DIALOG_STYLES.fullWidthField}
              required
              error={validation?.fieldErrors.link}
            />
            <JobFormField
              id="applicationDeadline"
              label={FORM_FIELD_CONFIG.applicationDeadline.label}
              value={formData.applicationDeadline}
              onChange={(value) => handleFieldChange("applicationDeadline", value)}
              placeholder={FORM_FIELD_CONFIG.applicationDeadline.placeholder}
              type={FORM_FIELD_CONFIG.applicationDeadline.type}
              error={validation?.fieldErrors.applicationDeadline}
            />
            <JobFormStatusField
              value={formData.status}
              onChange={(value) => handleFieldChange("status", value)}
              error={validation?.fieldErrors.status}
            />
            <JobFormField
              id="notes"
              label={FORM_FIELD_CONFIG.notes.label}
              value={formData.notes}
              onChange={(value) => handleFieldChange("notes", value)}
              placeholder={FORM_FIELD_CONFIG.notes.placeholder}
              type={FORM_FIELD_CONFIG.notes.type}
              rows={FORM_FIELD_CONFIG.notes.rows}
              className={JOB_FORM_DIALOG_STYLES.fullWidthField}
              error={validation?.fieldErrors.notes}
            />
          </div>

          <JobFormActions
            isEditing={isEditing}
            isPending={isPending}
            onCancel={() => onOpenChange(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
