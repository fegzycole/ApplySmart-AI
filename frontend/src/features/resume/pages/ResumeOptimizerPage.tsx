import { OptimizerHeader } from "../components/optimizer/OptimizerHeader";
import { OptimizerWorkspace } from "../components/optimizer/OptimizerWorkspace";
import { useResumeOptimizer } from "../hooks/useResumeOptimizer";

export function ResumeOptimizerPage() {
  const { optimize, optimizing, result, startOver, view } = useResumeOptimizer();

  return (
    <div className="p-4 lg:p-8">
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
