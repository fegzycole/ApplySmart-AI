import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { HOW_IT_WORKS_STYLES, HOW_IT_WORKS_STEPS } from "../../constants/cover-letter.constants";

export function HowItWorksCard() {
  return (
    <Card className={HOW_IT_WORKS_STYLES.card}>
      <CardHeader>
        <CardTitle className={HOW_IT_WORKS_STYLES.title}>How It Works</CardTitle>
      </CardHeader>
      <CardContent className={HOW_IT_WORKS_STYLES.content}>
        {HOW_IT_WORKS_STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className={HOW_IT_WORKS_STYLES.step.container}>
              <div className={HOW_IT_WORKS_STYLES.step.icon.wrapper}>
                <Icon className={HOW_IT_WORKS_STYLES.step.icon.icon} />
              </div>
              <div>
                <p className={HOW_IT_WORKS_STYLES.step.title}>{step.title}</p>
                <p className={HOW_IT_WORKS_STYLES.step.description}>{step.desc}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
