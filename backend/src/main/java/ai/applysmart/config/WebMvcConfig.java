package ai.applysmart.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web MVC configuration.
 * Registers interceptors for cross-cutting concerns like rate limiting.
 */
@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    private final RateLimitInterceptor rateLimitInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Apply rate limiting to authentication endpoints
        registry.addInterceptor(rateLimitInterceptor)
                .addPathPatterns(
                        "/api/v1/auth/login",
                        "/api/v1/auth/signup",
                        "/api/v1/auth/refresh",
                        "/api/v1/auth/request-password-reset",
                        "/api/v1/auth/reset-password",
                        "/api/v1/auth/verify-email",
                        "/api/v1/auth/resend-verification"
                );
    }
}
