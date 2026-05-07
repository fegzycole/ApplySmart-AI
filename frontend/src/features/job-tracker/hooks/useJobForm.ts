import { useEffect, useState } from "react";
import type { Job, JobFormData } from "../types/job.types";
import { createJobFormData } from "../utils/job-tracker";

export function useJobForm(job: Job | null, open: boolean) {
  const [formData, setFormData] = useState<JobFormData>(createJobFormData());

  useEffect(() => {
    if (open) {
      setFormData(createJobFormData(job));
      return;
    }

    setFormData(createJobFormData());
  }, [job, open]);

  const updateField = <K extends keyof JobFormData>(field: K, value: JobFormData[K]) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  };

  return {
    formData,
    updateField,
  };
}
