import { ResumeBuilderWorkspace } from "../components/builder";
import { ResumeBuilderProvider } from "../contexts/ResumeBuilderContext";

export function ResumeBuilderPageV2() {
  return (
    <ResumeBuilderProvider>
      <ResumeBuilderWorkspace />
    </ResumeBuilderProvider>
  );
}
