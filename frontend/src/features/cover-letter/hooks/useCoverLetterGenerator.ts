import { useState } from "react";
import type { ToneOption } from "../types/cover-letter.types";
import { useGenerateCoverLetter } from "./useCoverLetterQueries";

export function useCoverLetterGenerator() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [tone, setTone] = useState<ToneOption>("professional");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [highlights, setHighlights] = useState("");

  const generateMutation = useGenerateCoverLetter();

  const handleGenerate = async () => {
    if (!company || !position || !jobDescription) {
      return;
    }

    await generateMutation.mutateAsync({
      company,
      position,
      jobDescription,
      tone: tone as "professional" | "friendly" | "confident",
      highlights: highlights || undefined,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleNewLetter = () => {
    generateMutation.reset();
    setCompany("");
    setPosition("");
    setJobDescription("");
    setHighlights("");
  };

  return {
    generated: generateMutation.isSuccess,
    generating: generateMutation.isPending,
    generatedLetter: generateMutation.data,
    uploadedFile,
    tone,
    company,
    position,
    jobDescription,
    highlights,
    setTone,
    setCompany,
    setPosition,
    setJobDescription,
    setHighlights,
    handleGenerate,
    handleFileUpload,
    removeFile,
    handleNewLetter
  };
}
