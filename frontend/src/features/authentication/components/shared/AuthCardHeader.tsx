import { Sparkles } from "lucide-react";
import { AUTH_CARD_STYLES } from "../../constants/authentication.constants";

interface AuthCardHeaderProps {
  title: string;
  description: string;
}

export function AuthCardHeader({ title, description }: AuthCardHeaderProps) {
  return (
    <div className={AUTH_CARD_STYLES.header.container + " group"}>
      <div className={AUTH_CARD_STYLES.header.icon.wrapper}>
        <Sparkles className={AUTH_CARD_STYLES.header.icon.icon} />
      </div>
      <h2 className={AUTH_CARD_STYLES.header.title}>{title}</h2>
      <p className={AUTH_CARD_STYLES.header.description}>{description}</p>
    </div>
  );
}
