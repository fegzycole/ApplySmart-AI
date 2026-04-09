import { ActiveSession } from "./ActiveSession";
import { ACTIVE_SESSIONS } from "../../constants/security.constants";

export function ActiveSessionsList() {
  return (
    <>
      {ACTIVE_SESSIONS.map((session, index) => (
        <ActiveSession key={index} {...session} />
      ))}
    </>
  );
}
