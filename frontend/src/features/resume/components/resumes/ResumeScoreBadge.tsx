interface ResumeScoreBadgeProps {
  score: number;
  showLabel?: boolean;
}

export function ResumeScoreBadge({ score, showLabel = false }: ResumeScoreBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
      <span>{score}</span>
      {showLabel ? (
        <span className="text-xs">Score</span>
      ) : null}
    </div>
  );
}
