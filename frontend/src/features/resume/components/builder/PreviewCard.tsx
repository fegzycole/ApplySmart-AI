import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Eye } from "lucide-react";
import { ResumePreview } from "./ResumePreview";
import { PreviewActions } from "./PreviewActions";

export function PreviewCard() {
  return (
    <Card className="border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl sticky top-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
              <Eye className="size-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Live Preview</CardTitle>
              <CardDescription className="text-sm">See your resume in real-time</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResumePreview />
        <PreviewActions />
      </CardContent>
    </Card>
  );
}
