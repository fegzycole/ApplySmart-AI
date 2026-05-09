interface JobFormErrorSummaryProps {
  messages: string[];
}

export function JobFormErrorSummary({ messages }: JobFormErrorSummaryProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div
      className="rounded-[2rem] border-2 border-rose-100 bg-rose-50/30 p-8 dark:border-rose-900/20 dark:bg-rose-950/10"
      aria-live="polite"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-4">
        Just a few more details to fix:
      </p>
      <ul className="space-y-2.5">
        {messages.map((message) => (
          <li key={message} className="flex items-center gap-3 text-[15px] font-semibold text-rose-700 dark:text-rose-300">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-300 dark:bg-rose-700" />
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}

