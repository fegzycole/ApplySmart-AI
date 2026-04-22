interface StepHeaderProps {
  title: string;
  description: string;
}

export function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <div className="text-center space-y-3 mb-8">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
        {title}
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}
