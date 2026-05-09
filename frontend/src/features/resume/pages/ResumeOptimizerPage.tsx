import { OptimizerHeader } from "../components/optimizer/OptimizerHeader";
import { OptimizerWorkspace } from "../components/optimizer/OptimizerWorkspace";
import { useResumeOptimizer } from "../hooks/useResumeOptimizer";
import { OPTIMIZER_RESULT_STYLES } from "../constants/optimizer.constants";

export function ResumeOptimizerPage() {
  const { optimize, optimizing, result, errorMessage, startOver } = useResumeOptimizer();

  return (
    <div className={OPTIMIZER_RESULT_STYLES.container}>
      <div className={OPTIMIZER_RESULT_STYLES.wrapper}>
        <OptimizerHeader />
        <OptimizerWorkspace
          onOptimize={optimize}
          onStartOver={startOver}
          optimizing={optimizing}
          errorMessage={errorMessage}
          result={result}
        />
      </div>
    </div>
  );
}
