import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { TERMS_CHECKBOX_STYLES } from "../../constants/authentication.constants";

export function TermsCheckbox() {
  return (
    <div className={TERMS_CHECKBOX_STYLES.wrapper}>
      <Checkbox id="terms" className={TERMS_CHECKBOX_STYLES.checkbox} />
      <Label htmlFor="terms" className={TERMS_CHECKBOX_STYLES.label}>
        I agree to the{" "}
        <a href="#" className={TERMS_CHECKBOX_STYLES.link}>
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className={TERMS_CHECKBOX_STYLES.link}>
          Privacy Policy
        </a>
      </Label>
    </div>
  );
}
