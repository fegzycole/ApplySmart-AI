import { Sparkles } from "lucide-react";
import { ResumeBuilderProvider } from "../contexts/ResumeBuilderContext";
import { ThemeSelector } from "../components/builder/ThemeSelector";
import { PersonalInfoSection } from "../components/builder/PersonalInfoSection";
import { SummarySection } from "../components/builder/SummarySection";
import { WorkExperienceSection } from "../components/builder/WorkExperienceSection";
import { EducationSection } from "../components/builder/EducationSection";
import { SkillsSection } from "../components/builder/SkillsSection";
import { LiveResumePreview } from "../components/builder/LiveResumePreview";

function ResumeBuilderContent() {
  return (
    <div className="p-4 lg:p-8 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-violet-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-violet-950/20">
      <div className="max-w-[1800px] mx-auto">
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

        <div className="mb-8">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800">
            <ThemeSelector />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800">
              <PersonalInfoSection />
            </div>

            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800">
              <SummarySection />
            </div>

            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800">
              <WorkExperienceSection />
            </div>

            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800">
              <EducationSection />
            </div>

            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800">
              <SkillsSection />
            </div>
          </div>

          <div>
            <LiveResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResumeBuilderPageV2() {
  return (
    <ResumeBuilderProvider>
      <ResumeBuilderContent />
    </ResumeBuilderProvider>
  );
}
