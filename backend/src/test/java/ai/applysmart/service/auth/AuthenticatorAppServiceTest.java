package ai.applysmart.service.auth;

import ai.applysmart.entity.User;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AuthenticatorAppServiceTest {

    @Test
    void generatedSecretUsesBase32Alphabet() {
        AuthenticatorAppService service = new AuthenticatorAppService(Clock.systemUTC());

        String secret = service.generateSecret();

        assertTrue(secret.matches("^[A-Z2-7]+$"));
    }

    @Test
    void buildOtpAuthUriIncludesIssuerAndEmail() {
        AuthenticatorAppService service = new AuthenticatorAppService(Clock.systemUTC());
        User user = User.builder()
                .email("user@example.com")
                .firstName("Test")
                .lastName("User")
                .build();

        String uri = service.buildOtpAuthUri(user, "JBSWY3DPEHPK3PXP");

        assertTrue(uri.contains("issuer=ApplySmart+AI"));
        assertTrue(uri.contains("user%40example.com"));
    }

    @Test
    void verifyCodeAcceptsKnownTotpValue() {
        Clock fixedClock = Clock.fixed(Instant.ofEpochSecond(59L), ZoneOffset.UTC);
        AuthenticatorAppService service = new AuthenticatorAppService(fixedClock);

        assertTrue(service.verifyCode("GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ", "287082"));
    }

    @Test
    void verifyCodeRejectsInvalidValue() {
        Clock fixedClock = Clock.fixed(Instant.ofEpochSecond(59L), ZoneOffset.UTC);
        AuthenticatorAppService service = new AuthenticatorAppService(fixedClock);

        assertFalse(service.verifyCode("GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ", "000000"));
    }
}
