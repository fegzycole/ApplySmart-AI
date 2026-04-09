import { CardDescription, CardTitle } from "@/shared/components/ui/card";
import { Sparkles } from "lucide-react";
import { AUTH_CARD_STYLES } from "../../constants/authentication.constants";

interface AuthCardHeaderProps {
  title: string;
  description: string;
}

export function AuthCardHeader({ title, description }: AuthCardHeaderProps) {
  return (
    <div className={AUTH_CARD_STYLES.header.container}>
      <div className={AUTH_CARD_STYLES.header.icon.wrapper}>
        <Sparkles className={AUTH_CARD_STYLES.header.icon.icon} />
      </div>
      <CardTitle className={AUTH_CARD_STYLES.header.title}>{title}</CardTitle>
      <CardDescription className={AUTH_CARD_STYLES.header.description}>{description}</CardDescription>
    </div>
  );
}
