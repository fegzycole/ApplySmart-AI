interface StepHeaderProps {
  title: string;
  description: string;
}

export function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <div className="mb-8 space-y-3 text-center">
      <h2 className="text-xl font-bold tracking-[-0.03em] text-zinc-900 dark:text-white sm:text-3xl">
        {title}
      </h2>
      <p className="mx-auto max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}
