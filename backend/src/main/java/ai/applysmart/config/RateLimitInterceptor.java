package ai.applysmart.config;

import ai.applysmart.dto.common.ErrorResponse;
import ai.applysmart.service.RateLimitService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.LocalDateTime;

/**
 * Interceptor that applies rate limiting to authentication endpoints.
 * Prevents brute force attacks by limiting request frequency.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class RateLimitInterceptor implements HandlerInterceptor {

    private final RateLimitService rateLimitService;
    private final ObjectMapper objectMapper;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {

        String key = getRateLimitKey(request);

        if (!rateLimitService.isAllowed(key)) {
            long secondsUntilReset = rateLimitService.getSecondsUntilReset(key);

            log.warn("Rate limit exceeded for key: {}, retry after: {} seconds",
                    key, secondsUntilReset);

            ErrorResponse errorResponse = ErrorResponse.builder()
                    .timestamp(LocalDateTime.now())
                    .status(HttpStatus.TOO_MANY_REQUESTS.value())
                    .error("Too Many Requests")
                    .message(String.format("Rate limit exceeded. Please try again in %d seconds.",
                            secondsUntilReset))
                    .path(request.getRequestURI())
                    .build();

            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setHeader("X-RateLimit-Retry-After-Seconds", String.valueOf(secondsUntilReset));
            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));

            return false;
        }

        // Add rate limit headers to response
        long remaining = rateLimitService.getRemainingRequests(key);
        response.setHeader("X-RateLimit-Remaining", String.valueOf(remaining));

        return true;
    }

    /**
     * Generate rate limit key based on request.
     * Uses email from body for login/signup, IP address for other requests.
     *
     * @param request HTTP request
     * @return rate limit key
     */
    private String getRateLimitKey(HttpServletRequest request) {
        // For authentication endpoints, we'll use IP address
        // In production, you might want to use email from request body or a combination
        String clientIp = getClientIp(request);
        String path = request.getRequestURI();

        // Different rate limit buckets for different endpoints
        if (path.contains("/login")) {
            return "login:" + clientIp;
        } else if (path.contains("/signup")) {
            return "signup:" + clientIp;
        } else if (path.contains("/reset-password") || path.contains("/request-password-reset")) {
            return "password-reset:" + clientIp;
        } else {
            return "auth:" + clientIp;
        }
    }

    /**
     * Extract client IP address from request.
     * Handles X-Forwarded-For header for proxied requests.
     *
     * @param request HTTP request
     * @return client IP address
     */
    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            // Get first IP in X-Forwarded-For chain (original client)
            return xForwardedFor.split(",")[0].trim();
        }

        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }

        return request.getRemoteAddr();
    }
}
