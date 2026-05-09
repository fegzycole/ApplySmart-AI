import { Target, Award, Brain, Search, Gauge, TrendingUp, BarChart3, Shield, Cpu, Zap, Microscope } from "lucide-react";

export const HOW_IT_WORKS_STEPS = [
  { icon: Microscope, title: "Initialize Specimen", desc: "Inject your current professional artifact" },
  { icon: Target, title: "Define Blueprint", desc: "Scan target role parameters" },
  { icon: Cpu, title: "Neural Synthesis", desc: "AI-driven alignment calibration" },
  { icon: Zap, title: "verified Output", desc: "Deploy ATS-optimized artifact" }
];

export const AI_ANALYSIS_FEATURES = [
  {
    icon: Brain,
    gradient: "from-sky-500 to-indigo-600",
    text: "Neural comparison to role blueprint"
  },
  {
    icon: Search,
    gradient: "from-amber-500 to-orange-600",
    text: "Heuristic gap detection & indexing"
  },
  {
    icon: Gauge,
    gradient: "from-emerald-500 to-teal-600",
    text: "Quantum ATS compatibility indexing"
  },
  {
    icon: TrendingUp,
    gradient: "from-rose-500 to-pink-600",
    text: "Surgical achievement calibration"
  }
];

export const SCORE_METRICS = [
  { icon: BarChart3, value: "87%", label: "Alignment Index" },
  { icon: Target, value: "92%", label: "Keyword Density" },
  { icon: Shield, value: "95%", label: "ATS Verification" },
  { icon: Award, value: "A+", label: "Caliber Grade" }
];

export const OPTIMIZER_RESULT_STYLES = {
  container: "w-full min-h-screen pb-20 bg-[#fafafa] dark:bg-zinc-950",
  wrapper: "mx-auto max-w-[1700px] space-y-6 px-3 pt-6 sm:space-y-10 sm:px-6 sm:pt-8 lg:px-8 lg:pt-12 lg:space-y-12",
  bentoGrid: "grid grid-cols-1 gap-6 sm:gap-8 xl:grid-cols-12 xl:gap-12",
  heroSection: "col-span-12",
  mainStage: "col-span-12 space-y-6 sm:space-y-8 xl:col-span-7 xl:space-y-12",
  sideStage: "col-span-12 space-y-6 sm:space-y-8 xl:col-span-5 xl:space-y-12",
} as const;

export const OPTIMIZER_STYLES = {
  cardClassName: "canvas-card rounded-[2rem] border-2 border-white/60 bg-white/40 p-5 shadow-2xl shadow-zinc-200/50 backdrop-blur-3xl dark:border-zinc-800/40 dark:bg-zinc-900/40 dark:shadow-none sm:rounded-[3rem] sm:p-8",
  gradientCardClassName: "border-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-2xl shadow-zinc-900/20 dark:from-sky-600 dark:to-indigo-700 text-white"
};
