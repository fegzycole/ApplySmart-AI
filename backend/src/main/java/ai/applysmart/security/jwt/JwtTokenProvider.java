package ai.applysmart.security.jwt;

import ai.applysmart.config.JwtProperties;
import ai.applysmart.entity.User;
import ai.applysmart.service.token.TokenService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final JwtProperties jwtProperties;
    private final TokenService tokenService;

    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return generateTokenFromUser(user);
    }

    public String generateTokenFromUser(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtProperties.getExpirationMs());
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

        tokenService.storeActiveToken(jti, user.getId(), expiryDate);

        log.debug("Generated access token for user {} with JTI: {}", user.getId(), jti);
        return token;
    }

    public String generateRefreshToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtProperties.getRefreshExpirationMs());
        String jti = UUID.randomUUID().toString();

        String token = Jwts.builder()
                .subject(Long.toString(user.getId()))
                .claim("jti", jti)
                .claim("type", "refresh")
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();

        tokenService.storeActiveToken(jti, user.getId(), expiryDate);

        log.debug("Generated refresh token for user {} with JTI: {}", user.getId(), jti);
        return token;
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = getClaims(token);
        return Long.parseLong(claims.getSubject());
    }

    public String getJtiFromToken(String token) {
        try {
            Claims claims = getClaims(token);
            return claims.get("jti", String.class);
        } catch (Exception e) {
            log.error("Failed to extract JTI from token", e);
            return null;
        }
    }

    public Date getExpirationFromToken(String token) {
        try {
            Claims claims = getClaims(token);
            return claims.getExpiration();
        } catch (Exception e) {
            log.error("Failed to extract expiration from token", e);
            return null;
        }
    }

    public boolean isRefreshToken(String token) {
        try {
            Claims claims = getClaims(token);
            return "refresh".equals(claims.get("type", String.class));
        } catch (Exception e) {
            log.error("Failed to determine token type", e);
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(authToken);

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

    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
