import { OptimizerHeader } from "../components/optimizer/OptimizerHeader";
import { OptimizerWorkspace } from "../components/optimizer/OptimizerWorkspace";
import { useResumeOptimizer } from "../hooks/useResumeOptimizer";

export function ResumeOptimizerPage() {
  const { optimize, optimizing, result, startOver, view } = useResumeOptimizer();

  return (
    <div className="min-w-0 overflow-x-hidden px-3 py-4 sm:px-4 sm:py-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <OptimizerHeader />
        <OptimizerWorkspace
          onOptimize={optimize}
          onStartOver={startOver}
          optimizing={optimizing}
          result={result}
          view={view}
        />
      </div>
    </div>
  );
}
