import type { ReactNode } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Globe, type LucideIcon } from "lucide-react";
import type { PersonalInfo } from "../../../types/resume-builder.types";
import { getContactEntries, type ContactField } from "./preview-utils";

const CONTACT_ICONS: Record<ContactField, LucideIcon> = {
  email: Mail,
  phone: Phone,
  location: MapPin,
  linkedin: Linkedin,
  github: Github,
  website: Globe,
};

interface ContactDetailsProps {
  personalInfo: PersonalInfo;
  className: string;
  itemClassName?: string;
}

export function ContactDetails({ personalInfo, className, itemClassName }: ContactDetailsProps) {
  const entries = getContactEntries(personalInfo);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {entries.map(({ field, value }) => {
        const Icon = CONTACT_ICONS[field];
        return (
          <span key={field} className={`${itemClassName ?? ""} inline-flex items-center gap-[0.3em] whitespace-nowrap`.trim()}>
            <Icon size={11} strokeWidth={1.75} />
            {value}
          </span>
        );
      })}
    </div>
  );
}

interface PreviewSectionProps {
  title: string;
  children: ReactNode;
  className: string;
  titleClassName: string;
}

export function PreviewSection({
  title,
  children,
  className,
  titleClassName,
}: PreviewSectionProps) {
  return (
    <section className={className}>
      <h2 className={titleClassName}>{title}</h2>
      {children}
    </section>
  );
}

interface ResponsibilitiesListProps {
  responsibilities: string[];
  className: string;
  itemClassName?: string;
}

export function ResponsibilitiesList({
  responsibilities,
  className,
  itemClassName,
}: ResponsibilitiesListProps) {
  if (responsibilities.length === 0) {
    return null;
  }

  return (
    <ul className={className}>
      {responsibilities.map((responsibility) => (
        <li key={responsibility} className={itemClassName}>
          {responsibility}
        </li>
      ))}
    </ul>
  );
}

interface SkillTagsProps {
  skills: string[];
  className: string;
  itemClassName: string;
}

export function SkillTags({ skills, className, itemClassName }: SkillTagsProps) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {skills.map((skill) => (
        <span key={skill} className={itemClassName}>
          {skill}
        </span>
      ))}
    </div>
  );
}

export function EmptyResumeState() {
  return (
    <div className="flex items-center justify-center h-64 text-center">
      <div>
        <p className="text-2xl text-zinc-300 mb-2">Start building your resume</p>
        <p className="text-zinc-400">Your changes will appear here instantly</p>
      </div>
    </div>
  );
}
