import { Target, FileText, BarChart3, Zap, Shield, Users } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: Target,
    title: "Resume Optimizer",
    description: "Get past ATS systems with AI-optimized resumes tailored to each job description",
    gradient: {
      card: "from-white to-violet-50 dark:from-zinc-900 dark:to-violet-950/30",
      icon: "from-violet-500 to-purple-600",
      shadow: "shadow-violet-500/10 dark:shadow-violet-900/20"
    }
  },
  {
    icon: FileText,
    title: "Cover Letter Generator",
    description: "Create personalized, compelling cover letters in seconds with AI assistance",
    gradient: {
      card: "from-white to-fuchsia-50 dark:from-zinc-900 dark:to-fuchsia-950/30",
      icon: "from-fuchsia-500 to-pink-600",
      shadow: "shadow-fuchsia-500/10 dark:shadow-fuchsia-900/20"
    }
  },
  {
    icon: BarChart3,
    title: "Job Application Tracker",
    description: "Organize and track all your applications in one visual kanban board",
    gradient: {
      card: "from-white to-cyan-50 dark:from-zinc-900 dark:to-cyan-950/30",
      icon: "from-cyan-500 to-teal-600",
      shadow: "shadow-cyan-500/10 dark:shadow-cyan-900/20"
    }
  },
  {
    icon: Zap,
    title: "Performance Analytics",
    description: "Track your job search metrics and improve your success rate with insights",
    gradient: {
      card: "from-white to-amber-50 dark:from-zinc-900 dark:to-amber-950/30",
      icon: "from-amber-500 to-orange-600",
      shadow: "shadow-amber-500/10 dark:shadow-amber-900/20"
    }
  },
  {
    icon: Shield,
    title: "ATS Compatibility",
    description: "Ensure your resume passes through applicant tracking systems successfully",
    gradient: {
      card: "from-white to-rose-50 dark:from-zinc-900 dark:to-rose-950/30",
      icon: "from-rose-500 to-red-600",
      shadow: "shadow-rose-500/10 dark:shadow-rose-900/20"
    }
  },
  {
    icon: Users,
    title: "Expert Templates",
    description: "Access professionally designed resume templates for every industry",
    gradient: {
      card: "from-white to-emerald-50 dark:from-zinc-900 dark:to-emerald-950/30",
      icon: "from-emerald-500 to-green-600",
      shadow: "shadow-emerald-500/10 dark:shadow-emerald-900/20"
    }
  }
];

export function FeaturesSection() {
  return (
    <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="text-zinc-900 dark:text-white">to Land Your Dream Job</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto px-4">
            Powerful AI tools designed to supercharge your job search
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
