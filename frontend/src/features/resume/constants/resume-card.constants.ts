import { Clock, Calendar, Download } from "lucide-react";

export const RESUME_CARD_STYLES = {
  cardClassName: "border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl",
  iconContainerClassName: "size-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg flex-shrink-0",
  dateInfoContainerClassName: "flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-800/50 border border-zinc-200 dark:border-zinc-800",
  editButtonClassName: "w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg",
  exportButtonClassName: "border-2 border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950/30",
  deleteButtonClassName: "w-full text-xs hover:bg-red-100 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400"
};

export const DATE_INFO_FIELDS = [
  {
    id: "lastModified",
    label: "Last Edit",
    icon: Clock,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "createdDate",
    label: "Created",
    icon: Calendar,
    gradient: "from-violet-500 to-fuchsia-500"
  }
];

export const EXPORT_OPTIONS = [
  { id: "pdf", label: "Export PDF", icon: Download },
  { id: "docx", label: "Export DOCX", icon: Download }
];
