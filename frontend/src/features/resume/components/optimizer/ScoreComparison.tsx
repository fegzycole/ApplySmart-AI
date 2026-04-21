import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { ScoreCard } from "./ScoreCard";

interface ScoreComparisonProps {
  originalScore: number;
  optimizedScore: number;
}

export function ScoreComparison({
  originalScore,
  optimizedScore,
}: ScoreComparisonProps) {
  const [animatedOriginal, setAnimatedOriginal] = useState(0);
  const [animatedOptimized, setAnimatedOptimized] = useState(0);
  const improvement = optimizedScore - originalScore;

  useEffect(() => {
    const originalDuration = 1000;
    const originalSteps = 60;
    const originalIncrement = originalScore / originalSteps;
    let originalStep = 0;

    const originalTimer = setInterval(() => {
      originalStep++;
      setAnimatedOriginal(
        Math.min(Math.round(originalIncrement * originalStep), originalScore)
      );
      if (originalStep >= originalSteps) clearInterval(originalTimer);
    }, originalDuration / originalSteps);

    setTimeout(() => {
      const optimizedDuration = 1200;
      const optimizedSteps = 60;
      const optimizedIncrement = optimizedScore / optimizedSteps;
      let optimizedStep = 0;

      const optimizedTimer = setInterval(() => {
        optimizedStep++;
        setAnimatedOptimized(
          Math.min(Math.round(optimizedIncrement * optimizedStep), optimizedScore)
        );
        if (optimizedStep >= optimizedSteps) clearInterval(optimizedTimer);
      }, optimizedDuration / optimizedSteps);
    }, 500);
  }, [originalScore, optimizedScore]);

  const getScoreRating = (score: number) => {
    if (score >= 90) return { label: "Excellent", color: "text-emerald-600" };
    if (score >= 80) return { label: "Very Good", color: "text-green-600" };
    if (score >= 70) return { label: "Good", color: "text-blue-600" };
    return { label: "Needs Work", color: "text-amber-600" };
  };

  const originalRating = getScoreRating(originalScore);
  const optimizedRating = getScoreRating(optimizedScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid md:grid-cols-3 gap-6"
    >
      <ScoreCard
        label="Before"
        score={animatedOriginal}
        rating={originalRating}
      />

      <ScoreCard
        label="Improvement"
        score={improvement}
        rating={{ label: "Points gained", color: "text-violet-700 dark:text-violet-400" }}
        icon={<TrendingUp className="size-4" />}
        variant="highlight"
        prefix="+"
      />

      <ScoreCard
        label="After"
        score={animatedOptimized}
        rating={optimizedRating}
      />
    </motion.div>
  );
}
