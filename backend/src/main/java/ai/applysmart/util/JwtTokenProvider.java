package ai.applysmart.util;

import ai.applysmart.entity.User;
import ai.applysmart.service.TokenService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

/**
 * Utility class for JWT token generation and validation.
 * Includes token revocation support via TokenService.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final TokenService tokenService;

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration-ms:86400000}") // Default: 24 hours
    private long jwtExpirationMs;

    @Value("${app.jwt.refresh-expiration-ms:604800000}") // Default: 7 days
    private long refreshTokenExpirationMs;

    /**
     * Generate JWT token from authentication.
     *
     * @param authentication the authentication object
     * @return generated JWT token
     */
    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return generateTokenFromUser(user);
    }

    /**
     * Generate JWT token from user.
     * Includes JTI (JWT ID) for token revocation support.
     *
     * @param user the user entity
     * @return generated JWT token
     */
    public String generateTokenFromUser(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);
        String jti = UUID.randomUUID().toString();

        String token = Jwts.builder()
                .subject(Long.toString(user.getId()))
                .claim("email", user.getEmail())
                .claim("role", user.getRole().name())
                .claim("jti", jti)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();

        // Store token in Redis for revocation tracking
        tokenService.storeActiveToken(jti, user.getId(), expiryDate);

        log.debug("Generated access token for user {} with JTI: {}", user.getId(), jti);
        return token;
    }

    /**
     * Generate refresh token from user.
     * Includes JTI (JWT ID) for token revocation support.
     *
     * @param user the user entity
     * @return generated refresh token
     */
    public String generateRefreshToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + refreshTokenExpirationMs);
        String jti = UUID.randomUUID().toString();

        String token = Jwts.builder()
                .subject(Long.toString(user.getId()))
                .claim("jti", jti)
                .claim("type", "refresh")
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();

        // Store refresh token in Redis for revocation tracking
        tokenService.storeActiveToken(jti, user.getId(), expiryDate);

        log.debug("Generated refresh token for user {} with JTI: {}", user.getId(), jti);
        return token;
    }

    /**
     * Get user ID from JWT token.
     *
     * @param token the JWT token
     * @return user ID
     */
    public Long getUserIdFromToken(String token) {
        Claims claims = getClaims(token);
        return Long.parseLong(claims.getSubject());
    }

    /**
     * Get JTI (JWT ID) from token for revocation checking.
     *
     * @param token the JWT token
     * @return JTI or null if not present
     */
    public String getJtiFromToken(String token) {
        try {
            Claims claims = getClaims(token);
            return claims.get("jti", String.class);
        } catch (Exception e) {
            log.error("Failed to extract JTI from token", e);
            return null;
        }
    }

    /**
     * Get expiration date from JWT token.
     *
     * @param token the JWT token
     * @return expiration date or null if not present
     */
    public Date getExpirationFromToken(String token) {
        try {
            Claims claims = getClaims(token);
            return claims.getExpiration();
        } catch (Exception e) {
            log.error("Failed to extract expiration from token", e);
            return null;
        }
    }

    /**
     * Extract all claims from JWT token.
     *
     * @param token the JWT token
     * @return JWT claims
     */
    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Validate JWT token.
     * Checks signature, expiration, and revocation status.
     *
     * @param authToken the JWT token
     * @return true if valid, false otherwise
     * @throws SignatureException if JWT signature validation fails
     * @throws MalformedJwtException if JWT is malformed
     * @throws ExpiredJwtException if JWT is expired
     * @throws UnsupportedJwtException if JWT format is unsupported
     * @throws IllegalArgumentException if JWT is empty or null
     */
    public boolean validateToken(String authToken) {
        try {
            // Validate signature and expiration
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(authToken);

            // Check if token has been revoked
            String jti = getJtiFromToken(authToken);
            if (jti != null && tokenService.isTokenRevoked(jti)) {
                log.warn("Token has been revoked: {}", jti);
                throw new IllegalArgumentException("Token has been revoked");
            }

            return true;
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature: {}", ex.getMessage());
            throw new SignatureException("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token: {}", ex.getMessage());
            throw new MalformedJwtException("Malformed JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token: {}", ex.getMessage());
            throw new ExpiredJwtException(ex.getHeader(), ex.getClaims(), "JWT token has expired");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token: {}", ex.getMessage());
            throw new UnsupportedJwtException("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT validation failed: {}", ex.getMessage());
            throw new IllegalArgumentException(ex.getMessage());
        }
    }

    /**
     * Get signing key for JWT.
     *
     * @return SecretKey for signing
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
