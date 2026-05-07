import { OptimizerHeader } from "../components/optimizer/OptimizerHeader";
import { OptimizerWorkspace } from "../components/optimizer/OptimizerWorkspace";
import { useResumeOptimizer } from "../hooks/useResumeOptimizer";

export function ResumeOptimizerPage() {
  const { optimize, optimizing, result, errorMessage, startOver, view } = useResumeOptimizer();

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-gradient-to-br from-zinc-50 via-white to-violet-50/30 px-3 py-4 dark:from-zinc-950 dark:via-zinc-900 dark:to-violet-950/20 sm:px-4 sm:py-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <OptimizerHeader />
        <OptimizerWorkspace
          onOptimize={optimize}
          onStartOver={startOver}
          optimizing={optimizing}
          errorMessage={errorMessage}
          result={result}
          view={view}
        />
      </div>
    </div>
  );
}
