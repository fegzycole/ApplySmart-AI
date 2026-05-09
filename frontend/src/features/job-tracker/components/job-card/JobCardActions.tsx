import { Button } from "@/shared/components/ui/button";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";

interface JobCardActionsProps {
  link: string | null;
  onEdit: () => void;
  onDelete: () => void;
}

export function JobCardActions({ link, onEdit, onDelete }: JobCardActionsProps) {
  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div className="flex items-center justify-between w-full" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center gap-2">
        {link ? (
          <a
            href={link.startsWith('http') ? link : `https://${link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-10 rounded-xl bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/20 px-4 text-[11px] font-black uppercase tracking-widest transition-all active:scale-95"
            >
              <ExternalLink className="mr-2 size-3.5" />
              Visit
            </Button>
          </a>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl bg-zinc-900/5 dark:bg-white/5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all active:scale-90"
          onClick={(e) => handleAction(e, onEdit)}
        >
          <Pencil className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl bg-zinc-900/5 dark:bg-white/5 text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 transition-all active:scale-90"
          onClick={(e) => handleAction(e, onDelete)}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
