import { User, Briefcase, GraduationCap, Code } from "lucide-react";

export const BUILDER_TABS = [
  { id: "personal", label: "Personal", icon: User },
  { id: "experience", label: "Work", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code }
];

export const PERSONAL_INFO_FIELDS = [
  { id: "fullName", label: "Full Name", placeholder: "John Doe", required: true },
  { id: "title", label: "Professional Title", placeholder: "e.g., Senior Software Engineer", required: true },
];

export const CONTACT_FIELDS = [
  { id: "email", label: "Email", type: "email", placeholder: "john@example.com" },
  { id: "phone", label: "Phone", type: "tel", placeholder: "(555) 123-4567" }
];

export const EXPERIENCE_FIELDS = [
  { id: "jobTitle", label: "Job Title", placeholder: "e.g., Senior Software Engineer" },
  { id: "company", label: "Company", placeholder: "e.g., Tech Company Inc." }
];

export const EXPERIENCE_DATE_FIELDS = [
  { id: "startDate", label: "Start Date", type: "month" },
  { id: "endDate", label: "End Date", type: "month", placeholder: "Present" }
];

export const EDUCATION_FIELDS = [
  { id: "degree", label: "Degree", placeholder: "e.g., Bachelor of Science in Computer Science" },
  { id: "institution", label: "Institution", placeholder: "e.g., University of California, Berkeley" }
];

export const EDUCATION_DETAIL_FIELDS = [
  { id: "graduationYear", label: "Graduation Year", type: "number", placeholder: "2020" },
  { id: "gpa", label: "GPA (Optional)", placeholder: "3.8" }
];

export const PROJECT_FIELDS = [
  { id: "projectName", label: "Project Name", placeholder: "e.g., E-commerce Platform" }
];

export const SECTION_CONFIGS = {
  contactInfo: {
    title: "Contact Information",
    icon: User,
    gradient: "from-violet-50/50 to-fuchsia-50/50 dark:from-violet-950/20 dark:to-fuchsia-950/20",
    border: "border-violet-100 dark:border-violet-900",
    focusColors: "violet"
  },
  summary: {
    title: "Professional Summary",
    icon: "Sparkles",
    gradient: "from-cyan-50/50 to-teal-50/50 dark:from-cyan-950/20 dark:to-teal-950/20",
    border: "border-cyan-100 dark:border-cyan-900",
    focusColors: "cyan"
  },
  experience: {
    title: "Work Experience",
    icon: Briefcase,
    gradient: "from-violet-50/50 to-fuchsia-50/50 dark:from-violet-950/20 dark:to-fuchsia-950/20",
    border: "border-violet-100 dark:border-violet-900",
    focusColors: "violet"
  },
  education: {
    title: "Education",
    icon: GraduationCap,
    gradient: "from-cyan-50/50 to-teal-50/50 dark:from-cyan-950/20 dark:to-teal-950/20",
    border: "border-cyan-100 dark:border-cyan-900",
    focusColors: "cyan"
  },
  skills: {
    title: "Technical Skills",
    icon: Code,
    gradient: "from-fuchsia-50/50 to-pink-50/50 dark:from-fuchsia-950/20 dark:to-pink-950/20",
    border: "border-fuchsia-100 dark:border-fuchsia-900",
    focusColors: "fuchsia"
  },
  projects: {
    title: "Projects",
    icon: "Rocket",
    gradient: "from-violet-50/50 to-fuchsia-50/50 dark:from-violet-950/20 dark:to-fuchsia-950/20",
    border: "border-violet-100 dark:border-violet-900",
    focusColors: "violet"
  }
};

export const BUILDER_STYLES = {
  tabTrigger: "flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900 data-[state=active]:shadow-lg rounded-lg transition-all duration-300",
  addButton: "w-full h-12 border-2 border-dashed hover:bg-opacity-30 rounded-xl transition-all duration-300"
};
