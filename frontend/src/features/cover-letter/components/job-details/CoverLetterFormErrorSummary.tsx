interface CoverLetterFormErrorSummaryProps {
  messages: string[];
}

export function CoverLetterFormErrorSummary({ messages }: CoverLetterFormErrorSummaryProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div
      className="rounded-[2.5rem] border-2 border-rose-100 bg-rose-50/30 p-8 dark:border-rose-900/20 dark:bg-rose-950/10 backdrop-blur-xl"
      aria-live="polite"
    >
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400 mb-4">
        Synthesis Interrupted: Recalibrate Details
      </p>
      <ul className="space-y-3">
        {messages.map((message) => (
          <li key={message} className="flex items-center gap-3 text-sm font-bold text-rose-700 dark:text-rose-300">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-300 dark:bg-rose-700" />
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}
