interface StepHeaderProps {
  title: string;
  description: string;
}

export function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6 text-center px-4">
      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-zinc-900 text-white dark:bg-sky-600 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em]">
         System Directive
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none">
        {title}
      </h2>
      <p className="mx-auto max-w-2xl text-base sm:text-lg font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}
