import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gauge, Sparkles, Scale } from "lucide-react";
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
    if (score >= 90) return { label: "Exceptional Match", color: "text-emerald-500" };
    if (score >= 80) return { label: "Strong Alignment", color: "text-sky-500" };
    if (score >= 70) return { label: "Good Potential", color: "text-amber-500" };
    return { label: "Calibration Required", color: "text-rose-500" };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid gap-4 sm:gap-6 md:grid-cols-3"
    >
      <ScoreCard
        label="Specimen Base Score"
        score={animatedOriginal}
        rating={getScoreRating(originalScore)}
        icon={<Gauge className="size-5" />}
      />

      <ScoreCard
        label="Synthesis Magnitude"
        score={improvement}
        rating={{ label: "Neural points gained", color: "text-amber-500" }}
        icon={<Sparkles className="size-5" />}
        variant="highlight"
        prefix="+"
      />

      <ScoreCard
        label="Final Calibration Score"
        score={animatedOptimized}
        rating={getScoreRating(optimizedScore)}
        icon={<Scale className="size-5" />}
      />
    </motion.div>
  );
}

