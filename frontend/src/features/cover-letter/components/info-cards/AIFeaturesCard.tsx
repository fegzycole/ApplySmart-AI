import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Wand2 } from "lucide-react";
import { AI_FEATURES_STYLES, AI_FEATURES_DATA } from "../../constants/cover-letter.constants";

export function AIFeaturesCard() {
  return (
    <Card className={AI_FEATURES_STYLES.card}>
      <CardHeader>
        <div className={AI_FEATURES_STYLES.header.container}>
          <Wand2 className={AI_FEATURES_STYLES.header.icon} />
          <CardTitle className={AI_FEATURES_STYLES.header.title}>AI Features</CardTitle>
        </div>
      </CardHeader>
      <CardContent className={AI_FEATURES_STYLES.content}>
        {AI_FEATURES_DATA.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div key={i} className={AI_FEATURES_STYLES.feature.container}>
              <div className={`${AI_FEATURES_STYLES.feature.icon.wrapper} bg-gradient-to-br ${feature.gradient}`}>
                <Icon className={AI_FEATURES_STYLES.feature.icon.icon} />
              </div>
              <p className={AI_FEATURES_STYLES.feature.text}>{feature.text}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
