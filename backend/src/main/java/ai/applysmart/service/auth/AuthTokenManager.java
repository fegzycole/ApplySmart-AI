package ai.applysmart.service.auth;

import ai.applysmart.dto.auth.LoginRequest;
import ai.applysmart.entity.User;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.exception.UnauthorizedException;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.service.token.TokenService;
import ai.applysmart.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthTokenManager {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final TokenService tokenService;

    public AuthTokens authenticate(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();
        return issue(authentication, user);
    }

    public AuthTokens refresh(String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new UnauthorizedException("Invalid or expired refresh token");
        }

        if (!tokenProvider.isRefreshToken(refreshToken)) {
            throw new UnauthorizedException("Refresh token is required");
        }

        Long userId = tokenProvider.getUserIdFromToken(refreshToken);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        revoke(refreshToken, user);
        return issueForUser(user);
    }

    public AuthTokens issueForUser(User user) {
        return new AuthTokens(
                tokenProvider.generateTokenFromUser(user),
                tokenProvider.generateRefreshToken(user),
                user
        );
    }

    public void revoke(String token, User user) {
        String jti = tokenProvider.getJtiFromToken(token);
        if (jti == null) {
            log.warn("Could not extract JTI from token for user {}", user.getId());
            return;
        }

        Date expiration = tokenProvider.getExpirationFromToken(token);
        if (expiration == null) {
            log.warn("Could not extract expiration from token for user {}", user.getId());
            return;
        }

        Duration remainingTTL = Duration.between(Instant.now(), expiration.toInstant());
        if (remainingTTL.isNegative()) {
            log.debug("Token already expired for user {}, skipping revocation", user.getId());
            return;
        }

        tokenService.revokeToken(jti, remainingTTL);
        log.info("Token revoked for user {}, JTI: {}", user.getId(), jti);
    }

    private AuthTokens issue(Authentication authentication, User user) {
        return new AuthTokens(
                tokenProvider.generateToken(authentication),
                tokenProvider.generateRefreshToken(user),
                user
        );
    }
}
