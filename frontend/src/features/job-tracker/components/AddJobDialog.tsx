import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useAddJobForm, type JobFormData } from "../hooks/useAddJobForm";
import { ADD_JOB_DIALOG_STYLES, FORM_FIELD_CONFIG } from "../constants/job-tracker.constants";
import { DialogFormField, DialogActions } from "./add-job-dialog";

interface AddJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (job: JobFormData) => void;
}

export function AddJobDialog({ open, onOpenChange, onAdd }: AddJobDialogProps) {
  const { formData, updateField, handleSubmit } = useAddJobForm();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={ADD_JOB_DIALOG_STYLES.content}>
        <DialogHeader>
          <DialogTitle>Add New Job Application</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => handleSubmit(e, onAdd, () => onOpenChange(false))}
          className={ADD_JOB_DIALOG_STYLES.form}
        >
          <DialogFormField
            id="company"
            label={FORM_FIELD_CONFIG.company.label}
            value={formData.company}
            onChange={(value) => updateField("company", value)}
            placeholder={FORM_FIELD_CONFIG.company.placeholder}
            type={FORM_FIELD_CONFIG.company.type}
            required
          />

          <DialogFormField
            id="role"
            label={FORM_FIELD_CONFIG.role.label}
            value={formData.role}
            onChange={(value) => updateField("role", value)}
            placeholder={FORM_FIELD_CONFIG.role.placeholder}
            type={FORM_FIELD_CONFIG.role.type}
            required
          />

          <DialogFormField
            id="link"
            label={FORM_FIELD_CONFIG.link.label}
            value={formData.link}
            onChange={(value) => updateField("link", value)}
            placeholder={FORM_FIELD_CONFIG.link.placeholder}
            type={FORM_FIELD_CONFIG.link.type}
            required
          />

          <DialogFormField
            id="notes"
            label={FORM_FIELD_CONFIG.notes.label}
            value={formData.notes}
            onChange={(value) => updateField("notes", value)}
            placeholder={FORM_FIELD_CONFIG.notes.placeholder}
            type={FORM_FIELD_CONFIG.notes.type}
            rows={FORM_FIELD_CONFIG.notes.rows}
          />

          <DialogActions onCancel={() => onOpenChange(false)} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
