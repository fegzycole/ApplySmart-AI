package ai.applysmart.service.ratelimit;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class RateLimitKeyResolver {

    public String resolve(HttpServletRequest request) {
        String clientIp = extractClientIp(request);
        String path = request.getRequestURI();

        if (path.contains("/login")) {
            return "login:" + clientIp;
        }

        if (path.contains("/signup")) {
            return "signup:" + clientIp;
        }

        if (path.contains("/reset-password") || path.contains("/request-password-reset")) {
            return "password-reset:" + clientIp;
        }

        return "auth:" + clientIp;
    }

    private String extractClientIp(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (StringUtils.hasText(forwardedFor)) {
            return forwardedFor.split(",")[0].trim();
        }

        String realIp = request.getHeader("X-Real-IP");
        if (StringUtils.hasText(realIp)) {
            return realIp;
        }

        return request.getRemoteAddr();
    }
}
