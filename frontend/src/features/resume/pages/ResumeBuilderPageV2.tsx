import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { ResumeBuilderWorkspace } from "../components/builder";
import { ResumeBuilderProvider } from "../contexts/ResumeBuilderContext";
import { useResume } from "../hooks/useResumeQueries";
import { contentToResumeData } from "../utils/resume-builder-payload";
import { ResumesPageSkeleton } from "../components/skeletons";

function ResumeBuilderWithData({ resumeId }: { resumeId: number }) {
  const { data: resume, isLoading } = useResume(resumeId);

  const initialData = useMemo(() => {
    if (!resume?.content) return undefined;
    return contentToResumeData(resume.content) ?? undefined;
  }, [resume]);

  if (isLoading) return <ResumesPageSkeleton />;

  return (
    <ResumeBuilderProvider initialData={initialData}>
      <ResumeBuilderWorkspace />
    </ResumeBuilderProvider>
  );
}

export function ResumeBuilderPageV2() {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");
  const resumeId = idParam ? Number(idParam) : null;

  if (resumeId) {
    return <ResumeBuilderWithData resumeId={resumeId} />;
  }

  return (
    <ResumeBuilderProvider>
      <ResumeBuilderWorkspace />
    </ResumeBuilderProvider>
  );
}
