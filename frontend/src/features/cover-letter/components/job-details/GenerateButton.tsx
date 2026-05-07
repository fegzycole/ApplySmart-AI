import { Button } from "@/shared/components/ui/button";
import { Sparkles } from "lucide-react";
import { GENERATE_BUTTON_STYLES } from "../../constants/cover-letter.constants";

interface GenerateButtonProps {
  generating: boolean;
}

export function GenerateButton({ generating }: GenerateButtonProps) {
  return (
    <Button
      type="submit"
      className={GENERATE_BUTTON_STYLES.base}
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
