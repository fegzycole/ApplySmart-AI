package ai.applysmart.service.ratelimit;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RateLimitKeyResolverTest {

    private final RateLimitKeyResolver resolver = new RateLimitKeyResolver();

    @Test
    void resolveUsesForwardedHeaderAndLoginBucket() {
        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/api/v1/auth/login");
        request.addHeader("X-Forwarded-For", "203.0.113.10, 10.0.0.1");

        assertEquals("login:203.0.113.10", resolver.resolve(request));
    }

    @Test
    void resolveUsesPasswordResetBucketForResetRoutes() {
        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/api/v1/auth/request-password-reset");
        request.setRemoteAddr("127.0.0.1");

        assertEquals("password-reset:127.0.0.1", resolver.resolve(request));
    }
}
