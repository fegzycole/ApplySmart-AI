interface SettingsFormErrorSummaryProps {
  messages: string[];
}

export function SettingsFormErrorSummary({ messages }: SettingsFormErrorSummaryProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div
      className="rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 dark:border-red-950 dark:bg-red-950/20"
      aria-live="polite"
    >
      <p className="text-sm font-medium text-red-900 dark:text-red-200">
        Please fix the following:
      </p>
      <ul className="mt-2 space-y-1 text-sm text-red-700 dark:text-red-300">
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
