import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CoverLetterFormData, ToneOption } from "../types/cover-letter.types";
import {
  useGenerateCoverLetter,
  useGenerateCoverLetterFromFile,
} from "./useCoverLetterQueries";
import { getCoverLetterServerFeedback } from "../utils/cover-letter.errors";
import {
  getCoverLetterErrorSummary,
  validateCoverLetterForm,
} from "../utils/cover-letter.validation";

const INITIAL_VALUES: CoverLetterFormData = {
  company: "",
  position: "",
  tone: "professional",
  jobDescription: "",
  highlights: "",
};

export function useCoverLetterGenerator() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [values, setValues] = useState<CoverLetterFormData>(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof CoverLetterFormData, string>>>({});
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const generateMutation = useGenerateCoverLetter();
  const generateFromFileMutation = useGenerateCoverLetterFromFile();

  const updateField = <T extends keyof CoverLetterFormData>(field: T, value: CoverLetterFormData[T]) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setFieldErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
    setFormErrors([]);
  };

  const handleGenerate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateCoverLetterForm(values);
    if (validation) {
      setFieldErrors(validation.fieldErrors);
      setFormErrors(getCoverLetterErrorSummary(validation));
      return;
    }

    const payload = {
      company: values.company.trim(),
      position: values.position.trim(),
      jobDescription: values.jobDescription.trim(),
      tone: values.tone,
      highlights: values.highlights.trim() || undefined,
    };

    try {
      if (uploadedFile) {
        await generateFromFileMutation.mutateAsync({
          ...payload,
          resumeFile: uploadedFile,
        });
      } else {
        await generateMutation.mutateAsync(payload);
      }

      setFieldErrors({});
      setFormErrors([]);
    } catch (error) {
      const serverFeedback = getCoverLetterServerFeedback(error);
      setFieldErrors(serverFeedback.fieldErrors);
      setFormErrors(serverFeedback.formErrors);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleFileDrop = (file: File) => {
    setUploadedFile(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleNewLetter = () => {
    generateMutation.reset();
    generateFromFileMutation.reset();
    setUploadedFile(null);
    setValues(INITIAL_VALUES);
    setFieldErrors({});
    setFormErrors([]);
  };

  return {
    generated: generateMutation.isSuccess || generateFromFileMutation.isSuccess,
    generating: generateMutation.isPending || generateFromFileMutation.isPending,
    generatedLetter: generateMutation.data ?? generateFromFileMutation.data,
    uploadedFile,
    fieldErrors,
    formErrors,
    tone: values.tone,
    company: values.company,
    position: values.position,
    jobDescription: values.jobDescription,
    highlights: values.highlights,
    setTone: (value: ToneOption) => updateField("tone", value),
    setCompany: (value: string) => updateField("company", value),
    setPosition: (value: string) => updateField("position", value),
    setJobDescription: (value: string) => updateField("jobDescription", value),
    setHighlights: (value: string) => updateField("highlights", value),
    handleGenerate,
    handleFileUpload,
    handleFileDrop,
    removeFile,
    handleNewLetter,
  };
}
