import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
}

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  gradient,
}: QuickActionCardProps) {
  return (
    <Link to={href} className="group block">
      <div className={`p-4 rounded-xl bg-gradient-to-br ${gradient} border border-violet-200 dark:border-violet-800 hover:shadow-lg transition-all duration-300`}>
        <div className="flex items-start gap-3">
          <div className="size-10 rounded-lg bg-white/90 dark:bg-zinc-900/90 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <Icon className="size-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              {title}
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
