import type { LucideIcon } from "lucide-react";

export type ToneOption = "professional" | "enthusiastic" | "formal" | "friendly";

export interface CoverLetterFormData {
  company: string;
  position: string;
  tone: ToneOption;
  jobDescription: string;
  highlights: string;
}

export interface HowItWorksStep {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface AIFeature {
  icon: LucideIcon;
  text: string;
  gradient: string;
}

export interface ToneSelectOption {
  value: ToneOption;
  label: string;
}
