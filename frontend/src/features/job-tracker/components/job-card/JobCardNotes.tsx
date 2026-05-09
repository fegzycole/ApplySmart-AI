import { MessageSquareQuote } from "lucide-react";

interface JobCardNotesProps {
  notes: string | null;
}

export function JobCardNotes({ notes }: JobCardNotesProps) {
  if (!notes) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-950/5 dark:bg-white/5 p-4 border border-zinc-200/50 dark:border-zinc-700/30">
      <MessageSquareQuote className="absolute -right-1 -bottom-1 size-8 opacity-[0.05] dark:opacity-[0.1]" />
      <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium italic">
        {notes}
      </p>
    </div>
  );
}
