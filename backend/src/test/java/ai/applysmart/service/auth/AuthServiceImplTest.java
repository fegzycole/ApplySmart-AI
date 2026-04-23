package ai.applysmart.service.auth;

import ai.applysmart.dto.auth.AuthResponse;
import ai.applysmart.entity.User;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.service.auth.AuthResponseFactory;
import ai.applysmart.service.auth.AuthTokenManager;
import ai.applysmart.service.auth.AuthTokens;
import ai.applysmart.service.auth.EmailVerificationWorkflow;
import ai.applysmart.service.auth.OAuth2LoginCodeService;
import ai.applysmart.service.auth.PasswordResetWorkflow;
import ai.applysmart.service.auth.UserDtoMapper;
import ai.applysmart.service.auth.UserRegistrationWorkflow;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserRegistrationWorkflow userRegistrationWorkflow;

    @Mock
    private AuthTokenManager authTokenManager;

    @Mock
    private PasswordResetWorkflow passwordResetWorkflow;

    @Mock
    private EmailVerificationWorkflow emailVerificationWorkflow;

    @Mock
    private OAuth2LoginCodeService oAuth2LoginCodeService;

    @Mock
    private UserDtoMapper userDtoMapper;

    @Mock
    private AuthResponseFactory authResponseFactory;

    @Test
    void exchangeOAuthCodeIssuesAuthenticatedSessionForConsumedCode() {
        AuthServiceImpl service = new AuthServiceImpl(
                userRepository,
                userRegistrationWorkflow,
                authTokenManager,
                passwordResetWorkflow,
                emailVerificationWorkflow,
                oAuth2LoginCodeService,
                userDtoMapper,
                authResponseFactory
        );

        User user = new User();
        user.setId(42L);
        user.setEmail("user@example.com");
        AuthTokens tokens = new AuthTokens("access-token", "refresh-token", user);
        AuthResponse response = AuthResponse.builder().token("access-token").refreshToken("refresh-token").build();

        when(oAuth2LoginCodeService.consumeUserId("exchange-code")).thenReturn(42L);
        when(userRepository.findById(42L)).thenReturn(Optional.of(user));
        when(authTokenManager.issueForUser(user)).thenReturn(tokens);
        when(authResponseFactory.authenticated("access-token", "refresh-token", user)).thenReturn(response);

        AuthResponse result = service.exchangeOAuthCode("exchange-code");

        assertSame(response, result);
        verify(oAuth2LoginCodeService).consumeUserId("exchange-code");
        verify(authTokenManager).issueForUser(user);
    }
}
