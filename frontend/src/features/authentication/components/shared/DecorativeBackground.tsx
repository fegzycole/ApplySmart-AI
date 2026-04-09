import { DECORATIVE_BG_STYLES } from "../../constants/authentication.constants";

export function DecorativeBackground() {
  return (
    <div className={DECORATIVE_BG_STYLES.wrapper}>
      <div className={DECORATIVE_BG_STYLES.topRight} />
      <div className={DECORATIVE_BG_STYLES.bottomLeft} />
    </div>
  );
}
