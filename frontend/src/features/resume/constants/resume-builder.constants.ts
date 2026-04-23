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

export const TEMPLATES: Array<{ id: ResumeTemplate; name: string; description: string; color: string; gradient: string }> = [
  { id: "MODERN", name: "Modern", description: "Clean and contemporary", color: "from-violet-500 to-purple-600", gradient: "bg-gradient-to-br from-violet-500/20 to-purple-600/20" },
  { id: "PROFESSIONAL", name: "Professional", description: "Traditional corporate", color: "from-blue-500 to-cyan-600", gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-600/20" },
  { id: "CLASSIC", name: "Classic", description: "Timeless and elegant", color: "from-slate-500 to-gray-600", gradient: "bg-gradient-to-br from-slate-500/20 to-gray-600/20" },
  { id: "CREATIVE", name: "Creative", description: "Bold and artistic", color: "from-fuchsia-500 to-pink-600", gradient: "bg-gradient-to-br from-fuchsia-500/20 to-pink-600/20" },
];
