interface ActiveSessionProps {
  device: string;
  location: string;
  status: string;
  isCurrent?: boolean;
}

export function ActiveSession({ device, location, status, isCurrent = false }: ActiveSessionProps) {
  return (
    <div className="p-4 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-zinc-900 dark:text-white">
            {device} - {location}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{status}</p>
        </div>
        {isCurrent && (
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full">
            Active
          </span>
        )}
      </div>
    </div>
  );
}
