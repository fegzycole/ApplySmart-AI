import { Upload, Target, Sparkles, Award, Brain, Search, Gauge, TrendingUp, BarChart3, Shield } from "lucide-react";

export const HOW_IT_WORKS_STEPS = [
  { icon: Upload, title: "Upload Resume", desc: "Share your current resume" },
  { icon: Target, title: "Paste Job Description", desc: "Add the target job posting" },
  { icon: Sparkles, title: "AI Analysis", desc: "Our AI analyzes the match" },
  { icon: Award, title: "Get Results", desc: "Receive optimization tips" }
];

export const AI_ANALYSIS_FEATURES = [
  {
    icon: Brain,
    gradient: "from-violet-500 to-fuchsia-500",
    text: "Compares resume to job requirements"
  },
  {
    icon: Search,
    gradient: "from-cyan-500 to-teal-500",
    text: "Identifies missing keywords & skills"
  },
  {
    icon: Gauge,
    gradient: "from-amber-500 to-orange-500",
    text: "Calculates ATS compatibility score"
  },
  {
    icon: TrendingUp,
    gradient: "from-emerald-500 to-green-500",
    text: "Suggests specific improvements"
  }
];

export const SCORE_METRICS = [
  { icon: BarChart3, value: "87%", label: "Overall Match" },
  { icon: Target, value: "92%", label: "Keywords" },
  { icon: Shield, value: "95%", label: "ATS Score" },
  { icon: Award, value: "A+", label: "Grade" }
];

export const STRENGTHS = [
  {
    title: "Keyword Match: 92%",
    desc: "Excellent coverage of required skills and technologies",
    score: 92
  },
  {
    title: "ATS-Friendly Format",
    desc: "Clean structure compatible with all tracking systems",
    score: 95
  },
  {
    title: "Strong Action Verbs",
    desc: "Effective use of impactful language throughout",
    score: 88
  }
];

export const IMPROVEMENTS = [
  {
    title: "Missing Keywords",
    desc: "Add: \"cloud infrastructure\", \"CI/CD\", \"microservices\"",
    priority: "High" as const
  },
  {
    title: "Quantify Achievements",
    desc: "Include metrics like \"increased performance by 40%\"",
    priority: "Medium" as const
  },
  {
    title: "Technical Depth",
    desc: "Expand on specific technologies and frameworks used",
    priority: "Medium" as const
  }
];

export const MATCHED_KEYWORDS = [
  "React", "Node.js", "AWS", "Docker", "Python", "Agile", "Git", "REST API"
];

export const MISSING_KEYWORDS = [
  "Kubernetes", "CI/CD", "Microservices"
];

export const OPTIMIZER_STYLES = {
  cardClassName: "border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300",
  gradientCardClassName: "border-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-600 shadow-2xl shadow-violet-500/50 dark:shadow-violet-900/50"
};
