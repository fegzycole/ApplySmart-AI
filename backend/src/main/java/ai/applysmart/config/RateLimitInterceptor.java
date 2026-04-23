package ai.applysmart.config;

import ai.applysmart.dto.common.ErrorResponse;
import ai.applysmart.service.ratelimit.RateLimitKeyResolver;
import ai.applysmart.service.ratelimit.RateLimitService;
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

@Slf4j
@Component
@RequiredArgsConstructor
public class RateLimitInterceptor implements HandlerInterceptor {

    private final RateLimitService rateLimitService;
    private final RateLimitKeyResolver rateLimitKeyResolver;
    private final ObjectMapper objectMapper;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {

        String key = rateLimitKeyResolver.resolve(request);

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

        long remaining = rateLimitService.getRemainingRequests(key);
        response.setHeader("X-RateLimit-Remaining", String.valueOf(remaining));

        return true;
    }
}
