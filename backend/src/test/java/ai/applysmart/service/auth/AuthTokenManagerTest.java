package ai.applysmart.service.auth;

import ai.applysmart.entity.User;
import ai.applysmart.exception.UnauthorizedException;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.service.token.TokenService;
import ai.applysmart.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;

import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthTokenManagerTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider tokenProvider;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TokenService tokenService;

    @Test
    void refreshRejectsAccessTokens() {
        AuthTokenManager authTokenManager = new AuthTokenManager(
                authenticationManager,
                tokenProvider,
                userRepository,
                tokenService
        );

        when(tokenProvider.validateToken("access-token")).thenReturn(true);
        when(tokenProvider.isRefreshToken("access-token")).thenReturn(false);

        assertThrows(UnauthorizedException.class, () -> authTokenManager.refresh("access-token"));
    }

    @Test
    void refreshRotatesRefreshTokensBeforeIssuingNewPair() {
        AuthTokenManager authTokenManager = new AuthTokenManager(
                authenticationManager,
                tokenProvider,
                userRepository,
                tokenService
        );

        User user = new User();
        user.setId(5L);
        user.setEmail("user@example.com");
        user.setRole(User.Role.USER);

        when(tokenProvider.validateToken("refresh-token")).thenReturn(true);
        when(tokenProvider.isRefreshToken("refresh-token")).thenReturn(true);
        when(tokenProvider.getUserIdFromToken("refresh-token")).thenReturn(5L);
        when(userRepository.findById(5L)).thenReturn(Optional.of(user));
        when(tokenProvider.getJtiFromToken("refresh-token")).thenReturn("old-jti");
        when(tokenProvider.getExpirationFromToken("refresh-token"))
                .thenReturn(new Date(System.currentTimeMillis() + 60_000));
        when(tokenProvider.generateTokenFromUser(user)).thenReturn("new-access-token");
        when(tokenProvider.generateRefreshToken(user)).thenReturn("new-refresh-token");

        AuthTokens tokens = authTokenManager.refresh("refresh-token");

        assertEquals("new-access-token", tokens.accessToken());
        assertEquals("new-refresh-token", tokens.refreshToken());
        verify(tokenService).revokeToken(any(), any());
    }
}
