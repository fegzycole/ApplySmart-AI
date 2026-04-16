interface EmptyStateProps {
  message: string;
  height?: string;
}

export function EmptyState({ message, height = "h-32" }: EmptyStateProps) {
  return (
    <div className={`flex items-center justify-center ${height} text-zinc-500`}>
      {message}
    </div>
  );
}
