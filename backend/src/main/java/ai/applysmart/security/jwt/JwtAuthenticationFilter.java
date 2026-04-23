package ai.applysmart.security.jwt;

import ai.applysmart.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);

            if (StringUtils.hasText(jwt)) {
                tokenProvider.validateToken(jwt);

                Long userId = tokenProvider.getUserIdFromToken(jwt);

                UserDetails userDetails = userRepository.findById(userId).orElse(null);
                if (userDetails == null) {
                    log.warn("JWT references missing user ID: {}", userId);
                    request.setAttribute("jwtError", "User account no longer exists");
                    filterChain.doFilter(request, response);
                    return;
                }

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);

                log.debug("Set authentication for user: {}", userId);
            }
        } catch (ExpiredJwtException ex) {
            log.warn("JWT token expired for request: {}", request.getRequestURI());
            request.setAttribute("jwtError", "JWT token has expired");
        } catch (SignatureException ex) {
            log.warn("Invalid JWT signature for request: {}", request.getRequestURI());
            request.setAttribute("jwtError", "Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            log.warn("Malformed JWT token for request: {}", request.getRequestURI());
            request.setAttribute("jwtError", "Malformed JWT token");
        } catch (UnsupportedJwtException ex) {
            log.warn("Unsupported JWT token for request: {}", request.getRequestURI());
            request.setAttribute("jwtError", "Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.warn("JWT token is empty or invalid for request: {}", request.getRequestURI());
            request.setAttribute("jwtError", "JWT token is empty or invalid");
        } catch (Exception ex) {
            log.error("Could not set user authentication in security context", ex);
            request.setAttribute("jwtError", "Authentication failed");
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }
}
