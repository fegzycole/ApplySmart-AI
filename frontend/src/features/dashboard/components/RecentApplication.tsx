import { Building2, Calendar } from "lucide-react";

interface Application {
  id: string;
  company: string;
  role: string;
  status: string;
  date: string;
  statusColor: string;
}

interface RecentApplicationProps {
  application: Application;
}

export function RecentApplication({ application }: RecentApplicationProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-violet-50/50 dark:hover:bg-violet-950/20 transition-colors group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="size-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg flex-shrink-0">
          <Building2 className="size-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
            {application.role}
          </h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
            {application.company}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${application.statusColor}`}>
          {application.status}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500">
          <Calendar className="size-3" />
          <span className="hidden sm:inline">{application.date}</span>
        </div>
      </div>
    </div>
  );
}
