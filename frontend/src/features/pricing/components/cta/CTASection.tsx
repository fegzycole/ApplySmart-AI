import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { CTA_STYLES, CTA_CONTENT } from "../../constants/pricing.constants";

export function CTASection() {
  return (
    <section className={CTA_STYLES.section}>
      <div className={CTA_STYLES.wrapper}>
        <h2 className={CTA_STYLES.title}>
          {CTA_CONTENT.title}
        </h2>
        <p className={CTA_STYLES.description}>
          {CTA_CONTENT.description}
        </p>
        <Link to="/signup">
          <Button size="lg" className={CTA_STYLES.button}>
            {CTA_CONTENT.buttonText}
          </Button>
        </Link>
      </div>
    </section>
  );
}
