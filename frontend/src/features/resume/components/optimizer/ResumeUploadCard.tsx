import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Upload, FileText, X, Sparkles } from "lucide-react";
import { OPTIMIZER_STYLES } from "../../constants/optimizer.constants";

interface ResumeUploadCardProps {
  uploadedFile: string | null;
  analyzing: boolean;
  onFileSelect: () => void;
  onFileRemove: () => void;
  onOptimize: () => void;
}

export function ResumeUploadCard({
  uploadedFile,
  analyzing,
  onFileSelect,
  onFileRemove,
  onOptimize
}: ResumeUploadCardProps) {
  return (
    <Card className={OPTIMIZER_STYLES.cardClassName}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg">
            <Upload className="size-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Your Resume</CardTitle>
            <CardDescription className="text-sm">Upload your current resume for analysis</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!uploadedFile ? (
          <div
            className="relative border-2 border-dashed border-violet-300 dark:border-violet-700 rounded-2xl p-12 text-center hover:border-violet-500 dark:hover:border-violet-500 hover:bg-violet-50/50 dark:hover:bg-violet-950/30 transition-all duration-300 cursor-pointer group"
            onClick={onFileSelect}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/5 group-hover:to-fuchsia-500/5 transition-all duration-300" />
            <Upload className="size-12 text-violet-400 dark:text-violet-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <p className="text-base font-medium text-zinc-900 dark:text-white mb-2">
              Drop your resume here or click to browse
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Supports PDF, DOCX up to 10MB
            </p>
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30 border border-violet-200 dark:border-violet-800">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                <FileText className="size-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-zinc-900 dark:text-white">resume.pdf</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">2.4 MB • Uploaded successfully</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onFileRemove}
                className="hover:bg-red-100 dark:hover:bg-red-950/30"
              >
                <X className="size-4 text-red-500" />
              </Button>
            </div>
          </div>
        )}

        <Button
          className="w-full mt-6 h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/50 dark:shadow-violet-900/50 transform hover:scale-[1.02] transition-all duration-300"
          onClick={onOptimize}
          disabled={analyzing}
        >
          {analyzing ? (
            <>
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Analyzing Resume...
            </>
          ) : (
            <>
              <Sparkles className="size-5 mr-2" />
              Optimize with AI
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
