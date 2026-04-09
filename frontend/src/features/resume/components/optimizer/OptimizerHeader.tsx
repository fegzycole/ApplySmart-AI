import { Sparkles } from "lucide-react";

export function OptimizerHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs sm:text-sm mb-4">
            <Sparkles className="size-4" />
            <span className="font-medium">AI-Powered Optimization</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
              Resume Optimizer
            </span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base lg:text-lg">
            Beat ATS systems and land more interviews with AI-powered optimization
          </p>
        </div>
      </div>
    </div>
  );
}
