import { LoginForm } from "../components/login";
import { AuthPageShell } from "../components/shared";
import { AUTH_CONTENT } from "../constants";
import { useLoginFlow } from "../hooks/useLoginFlow";

export function LoginPage() {
  const loginFlow = useLoginFlow();
  const isTwoFactorStage = loginFlow.stage === "twoFactor";
  const title = isTwoFactorStage
    ? AUTH_CONTENT.loginTwoFactor.title
    : AUTH_CONTENT.login.title;
  const description = isTwoFactorStage
    ? loginFlow.challengeEmail
      ? `${AUTH_CONTENT.loginTwoFactor.description} (${loginFlow.challengeEmail})`
      : AUTH_CONTENT.loginTwoFactor.description
    : AUTH_CONTENT.login.description;

  return (
    <AuthPageShell
      title={title}
      description={description}
      footerText={isTwoFactorStage ? undefined : AUTH_CONTENT.login.footer}
      footerLinkText={isTwoFactorStage ? undefined : AUTH_CONTENT.login.footerLink}
      footerLinkPath={isTwoFactorStage ? undefined : AUTH_CONTENT.login.footerLinkPath}
      showOAuth={!isTwoFactorStage}
    >
      <LoginForm
        stage={loginFlow.stage}
        challengeEmail={loginFlow.challengeEmail}
        credentialValues={loginFlow.credentialValues}
        credentialErrors={loginFlow.credentialErrors}
        twoFactorCode={loginFlow.twoFactorCode}
        twoFactorErrors={loginFlow.twoFactorErrors}
        formErrors={loginFlow.formErrors}
        isSubmittingCredentials={loginFlow.isSubmittingCredentials}
        isSubmittingTwoFactor={loginFlow.isSubmittingTwoFactor}
        onCredentialChange={loginFlow.handleCredentialChange}
        onTwoFactorCodeChange={loginFlow.handleTwoFactorCodeChange}
        onSubmitCredentials={(event) => {
          event.preventDefault();
          void loginFlow.submitCredentials();
        }}
        onSubmitTwoFactor={(event) => {
          event.preventDefault();
          void loginFlow.submitTwoFactorChallenge();
        }}
        onBackFromTwoFactor={loginFlow.resetTwoFactorChallenge}
      />
    </AuthPageShell>
  );
}
