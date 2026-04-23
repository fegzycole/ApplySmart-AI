import { Sparkles } from "lucide-react";

export function ResumeBuilderPageHeader() {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs sm:text-sm mb-4">
        <Sparkles className="size-4" />
        <span className="font-medium">Live Preview Builder</span>
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
        <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
          Create Your Perfect Resume
        </span>
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base lg:text-lg">
        Choose a template, fill in your details, and watch your resume come to life instantly
      </p>
    </div>
  );
}
