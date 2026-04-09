import { useState } from "react";

export interface JobFormData {
  company: string;
  role: string;
  link: string;
  notes: string;
}

const INITIAL_FORM_DATA: JobFormData = {
  company: "",
  role: "",
  link: "",
  notes: "",
};

export function useAddJobForm() {
  const [formData, setFormData] = useState<JobFormData>(INITIAL_FORM_DATA);

  const updateField = (field: keyof JobFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
  };

  const handleSubmit = (
    e: React.FormEvent,
    onAdd: (job: JobFormData) => void,
    onClose: () => void
  ) => {
    e.preventDefault();
    onAdd(formData);
    resetForm();
    onClose();
  };

  return {
    formData,
    updateField,
    resetForm,
    handleSubmit,
  };
}
