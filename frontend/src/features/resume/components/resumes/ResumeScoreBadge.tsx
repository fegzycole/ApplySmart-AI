interface ResumeScoreBadgeProps {
  score: number;
  showLabel?: boolean;
}

export function ResumeScoreBadge({ score, showLabel = false }: ResumeScoreBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="size-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
        <span className="text-white font-bold text-sm">{score}</span>
      </div>
      {showLabel ? (
        <span className="text-sm text-zinc-600 dark:text-zinc-400">Score</span>
      ) : null}
    </div>
  );
}
