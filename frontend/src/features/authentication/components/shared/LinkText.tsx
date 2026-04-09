import { Link } from "react-router";
import { LINK_TEXT_STYLES } from "../../constants/authentication.constants";

interface LinkTextProps {
  text: string;
  linkText: string;
  linkPath: string;
}

export function LinkText({ text, linkText, linkPath }: LinkTextProps) {
  return (
    <p className={LINK_TEXT_STYLES.wrapper}>
      {text}{" "}
      <Link to={linkPath} className={LINK_TEXT_STYLES.link}>
        {linkText}
      </Link>
    </p>
  );
}
