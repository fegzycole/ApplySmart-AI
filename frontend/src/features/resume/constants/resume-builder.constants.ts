import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, LucideIcon } from "lucide-react";
import type { PersonalInfo, ResumeTemplate } from "../types/resume-builder.types";

export interface PersonalInfoField {
  key: keyof PersonalInfo;
  label: string;
  icon: LucideIcon;
  placeholder: string;
  type?: string;
}

export const PERSONAL_INFO_FIELDS: PersonalInfoField[] = [
  { key: "name", label: "Full Name", icon: User, placeholder: "John Doe" },
  { key: "email", label: "Email", icon: Mail, placeholder: "john@example.com", type: "email" },
  { key: "phone", label: "Phone", icon: Phone, placeholder: "+1 (555) 123-4567", type: "tel" },
  { key: "location", label: "Location", icon: MapPin, placeholder: "New York, NY" },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "linkedin.com/in/johndoe" },
  { key: "github", label: "GitHub", icon: Github, placeholder: "github.com/johndoe" },
  { key: "website", label: "Website", icon: Globe, placeholder: "johndoe.com" },
];

export const EDUCATION_CREDENTIAL_SUGGESTIONS = [
  "High School Diploma",
  "Associate of Arts (AA)",
  "Associate of Science (AS)",
  "Associate of Applied Science (AAS)",
  "Bachelor of Arts (BA)",
  "Bachelor of Science (BS)",
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Engineering (BEng)",
  "Bachelor of Fine Arts (BFA)",
  "Master of Arts (MA)",
  "Master of Science (MS)",
  "Master of Business Administration (MBA)",
  "Master of Engineering (MEng)",
  "Master of Education (MEd)",
  "Master of Fine Arts (MFA)",
  "Master of Public Health (MPH)",
  "Master of Social Work (MSW)",
  "Doctor of Philosophy (PhD)",
  "Doctor of Medicine (MD)",
  "Doctor of Dental Surgery (DDS)",
  "Doctor of Pharmacy (PharmD)",
  "Juris Doctor (JD)",
  "Doctor of Education (EdD)",
  "Certificate",
  "Professional Certificate",
  "Diploma",
  "Bootcamp",
  "Program",
  "Nanodegree",
  "Fellowship",
] as const;

export const TEMPLATES: Array<{ id: ResumeTemplate; name: string; description: string; color: string; gradient: string }> = [
  { id: "MODERN", name: "Modern", description: "Clean and contemporary", color: "from-primary to-primary/60", gradient: "bg-gradient-to-br from-primary/20 to-primary/10" },
  { id: "PROFESSIONAL", name: "Professional", description: "Traditional corporate", color: "from-slate-600 to-slate-800", gradient: "bg-gradient-to-br from-slate-500/20 to-slate-600/20" },
  { id: "CLASSIC", name: "Classic", description: "Timeless and elegant", color: "from-zinc-500 to-zinc-700", gradient: "bg-gradient-to-br from-zinc-500/20 to-zinc-600/20" },
  { id: "CREATIVE", name: "Creative", description: "Bold and artistic", color: "from-sky-500 to-cyan-600", gradient: "bg-gradient-to-br from-sky-500/20 to-cyan-600/20" },
];

export const BUILDER_LAYOUT_STYLES = {
  container: "w-full min-h-screen pb-20",
  wrapper: "mx-auto max-w-[1700px] space-y-10 px-3 sm:space-y-12 sm:px-6 lg:px-8",
  bentoGrid: "grid grid-cols-1 gap-8 xl:grid-cols-12 xl:gap-10",
  heroSection: "col-span-12",
  mainStage: "col-span-12 space-y-8 xl:col-span-6 xl:space-y-10",
  sideStage: "col-span-12 space-y-8 xl:col-span-6 xl:space-y-10",
} as const;
