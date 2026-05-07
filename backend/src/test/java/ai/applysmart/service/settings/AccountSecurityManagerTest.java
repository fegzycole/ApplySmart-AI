package ai.applysmart.service.settings;

import ai.applysmart.dto.settings.ChangePasswordRequest;
import ai.applysmart.dto.settings.EnableTwoFactorRequest;
import ai.applysmart.dto.settings.TwoFactorSetupDto;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.service.auth.AuthenticatorAppService;
import ai.applysmart.service.token.TokenService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AccountSecurityManagerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private TokenService tokenService;

    @Mock
    private AuthenticatorAppService authenticatorAppService;

    @Test
    void changePasswordUpdatesPasswordAndRevokesUserTokens() {
        AccountSecurityManager manager = new AccountSecurityManager(
                userRepository,
                passwordEncoder,
                tokenService,
                authenticatorAppService
        );
        User user = User.builder()
                .email("user@example.com")
                .password("stored-password")
                .firstName("Test")
                .lastName("User")
                .build();
        user.setId(12L);

        ChangePasswordRequest request = new ChangePasswordRequest();
        request.setCurrentPassword("current-password");
        request.setNewPassword("new-password-123");

        when(passwordEncoder.matches("current-password", "stored-password")).thenReturn(true);
        when(passwordEncoder.encode("new-password-123")).thenReturn("encoded-password");

        manager.changePassword(request, user);

        assertEquals("encoded-password", user.getPassword());
        verify(userRepository).save(user);
        verify(tokenService).revokeAllUserTokens(12L);
    }

    @Test
    void changePasswordSetsPasswordForExternalSignInAccountsWithoutCurrentPassword() {
        AccountSecurityManager manager = new AccountSecurityManager(
                userRepository,
                passwordEncoder,
                tokenService,
                authenticatorAppService
        );
        User user = User.builder()
                .email("oauth@example.com")
                .password(null)
                .firstName("OAuth")
                .lastName("User")
                .build();
        user.setId(23L);

        ChangePasswordRequest request = new ChangePasswordRequest();
        request.setNewPassword("new-password-123");

        when(passwordEncoder.encode("new-password-123")).thenReturn("encoded-password");

        manager.changePassword(request, user);

        assertEquals("encoded-password", user.getPassword());
        verify(userRepository).save(user);
        verify(tokenService).revokeAllUserTokens(23L);
        verify(passwordEncoder).encode("new-password-123");
        verify(passwordEncoder, never()).matches("current-password", "stored-password");
    }

    @Test
    void changePasswordRequiresCurrentPasswordWhenAccountAlreadyHasOne() {
        AccountSecurityManager manager = new AccountSecurityManager(
                userRepository,
                passwordEncoder,
                tokenService,
                authenticatorAppService
        );
        User user = User.builder()
                .email("user@example.com")
                .password("stored-password")
                .firstName("Test")
                .lastName("User")
                .build();

        ChangePasswordRequest request = new ChangePasswordRequest();
        request.setCurrentPassword(" ");
        request.setNewPassword("new-password-123");

        BadRequestException exception = assertThrows(
                BadRequestException.class,
                () -> manager.changePassword(request, user)
        );

        assertEquals("Current password is required", exception.getMessage());
    }

    @Test
    void setupTwoFactorRejectsAccountsWithoutPassword() {
        AccountSecurityManager manager = new AccountSecurityManager(
                userRepository,
                passwordEncoder,
                tokenService,
                authenticatorAppService
        );
        User user = User.builder()
                .email("oauth@example.com")
                .password("")
                .firstName("OAuth")
                .lastName("User")
                .build();

        assertThrows(BadRequestException.class, () -> manager.setupTwoFactor(user));
    }

    @Test
    void setupTwoFactorGeneratesSecretAndOtpUri() {
        AccountSecurityManager manager = new AccountSecurityManager(
                userRepository,
                passwordEncoder,
                tokenService,
                authenticatorAppService
        );
        User user = User.builder()
                .email("user@example.com")
                .password("stored-password")
                .firstName("Test")
                .lastName("User")
                .build();

        when(authenticatorAppService.generateSecret()).thenReturn("SECRET123");
        when(authenticatorAppService.buildOtpAuthUri(user, "SECRET123")).thenReturn("otpauth://totp/example");
        when(authenticatorAppService.getIssuer()).thenReturn("ApplySmart AI");

        TwoFactorSetupDto setup = manager.setupTwoFactor(user);

        assertEquals("SECRET123", user.getTwoFactorSecret());
        assertEquals(false, user.getTwoFactorEnabled());
        assertEquals("SECRET123", setup.getSecret());
        assertEquals("otpauth://totp/example", setup.getOtpAuthUri());
        verify(userRepository).save(user);
    }

    @Test
    void enableTwoFactorRejectsInvalidAuthenticatorCode() {
        AccountSecurityManager manager = new AccountSecurityManager(
                userRepository,
                passwordEncoder,
                tokenService,
                authenticatorAppService
        );
        User user = User.builder()
                .email("user@example.com")
                .password("stored-password")
                .firstName("Test")
                .lastName("User")
                .twoFactorSecret("SECRET123")
                .build();
        EnableTwoFactorRequest request = new EnableTwoFactorRequest();
        request.setCode("123456");

        when(authenticatorAppService.verifyCode("SECRET123", "123456")).thenReturn(false);

        BadRequestException exception = assertThrows(
                BadRequestException.class,
                () -> manager.enableTwoFactor(request, user)
        );

        assertEquals("Invalid authenticator code", exception.getMessage());
    }

    @Test
    void disableTwoFactorClearsSecret() {
        AccountSecurityManager manager = new AccountSecurityManager(
                userRepository,
                passwordEncoder,
                tokenService,
                authenticatorAppService
        );
        User user = User.builder()
                .email("user@example.com")
                .password("stored-password")
                .firstName("Test")
                .lastName("User")
                .twoFactorEnabled(true)
                .build();
        user.setTwoFactorSecret("secret");

        manager.disableTwoFactor(user);

        assertEquals(false, user.getTwoFactorEnabled());
        assertEquals(null, user.getTwoFactorSecret());
        verify(userRepository).save(user);
    }
}
