import { Button } from "@/shared/components/ui/button";
import { Sparkles } from "lucide-react";
import { GENERATE_BUTTON_STYLES } from "../../constants/cover-letter.constants";

interface GenerateButtonProps {
  generating: boolean;
  onGenerate: () => void;
}

export function GenerateButton({ generating, onGenerate }: GenerateButtonProps) {
  return (
    <Button
      className={GENERATE_BUTTON_STYLES.base}
      onClick={onGenerate}
      disabled={generating}
    >
      {generating ? (
        <>
          <div className={GENERATE_BUTTON_STYLES.spinner} />
          Generating Letter...
        </>
      ) : (
        <>
          <Sparkles className={GENERATE_BUTTON_STYLES.icon} />
          Generate Cover Letter
        </>
      )}
    </Button>
  );
}
