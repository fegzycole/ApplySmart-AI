import type { ReactNode } from "react";
import type { PersonalInfo } from "../../../types/resume-builder.types";
import { getContactItems } from "./preview-utils";

interface ContactDetailsProps {
  personalInfo: PersonalInfo;
  className: string;
  itemClassName?: string;
  separator?: string;
  direction?: "inline" | "stacked";
}

export function ContactDetails({
  personalInfo,
  className,
  itemClassName,
  separator = "•",
  direction = "inline",
}: ContactDetailsProps) {
  const items = getContactItems(personalInfo);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {items.map((item, index) => {
        const content = direction === "inline" && index > 0 ? `${separator} ${item}` : item;
        const Item = direction === "inline" ? "span" : "p";

        return (
          <Item key={item} className={itemClassName}>
            {content}
          </Item>
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
