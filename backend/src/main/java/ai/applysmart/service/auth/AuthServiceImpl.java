package ai.applysmart.service.auth;

import ai.applysmart.dto.auth.AuthResponse;
import ai.applysmart.dto.auth.LoginRequest;
import ai.applysmart.dto.auth.PasswordResetRequest;
import ai.applysmart.dto.auth.ResetPasswordRequest;
import ai.applysmart.dto.auth.SignupRequest;
import ai.applysmart.dto.auth.SignupResponse;
import ai.applysmart.dto.auth.UserDto;
import ai.applysmart.dto.auth.VerifyEmailRequest;
import ai.applysmart.entity.User;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.service.auth.AuthService;
import ai.applysmart.service.auth.AuthResponseFactory;
import ai.applysmart.service.auth.AuthTokenManager;
import ai.applysmart.service.auth.AuthTokens;
import ai.applysmart.service.auth.EmailVerificationWorkflow;
import ai.applysmart.service.auth.OAuth2LoginCodeService;
import ai.applysmart.service.auth.PasswordResetWorkflow;
import ai.applysmart.service.auth.UserDtoMapper;
import ai.applysmart.service.auth.UserRegistrationWorkflow;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final UserRegistrationWorkflow userRegistrationWorkflow;
    private final AuthTokenManager authTokenManager;
    private final PasswordResetWorkflow passwordResetWorkflow;
    private final EmailVerificationWorkflow emailVerificationWorkflow;
    private final OAuth2LoginCodeService oAuth2LoginCodeService;
    private final UserDtoMapper userDtoMapper;
    private final AuthResponseFactory authResponseFactory;

    @Override
    @Transactional
    public SignupResponse signup(SignupRequest signupRequest) {
        log.info("Attempting to register new user with email: {}", signupRequest.getEmail());

        User user = userRegistrationWorkflow.register(signupRequest);
        log.info("Successfully registered user with ID: {}", user.getId());

        return authResponseFactory.signupSuccess(user);
    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        log.info("Attempting to authenticate user: {}", loginRequest.getEmail());

        AuthTokens tokens = authTokenManager.authenticate(loginRequest);
        log.info("Successfully authenticated user with ID: {}", tokens.user().getId());

        return authResponseFactory.authenticated(tokens.accessToken(), tokens.refreshToken(), tokens.user());
    }

    @Override
    public AuthResponse refreshToken(String refreshToken) {
        log.info("Attempting to refresh access token");

        AuthTokens tokens = authTokenManager.refresh(refreshToken);
        log.info("Successfully refreshed tokens for user ID: {}", tokens.user().getId());

        return authResponseFactory.authenticated(tokens.accessToken(), tokens.refreshToken(), tokens.user());
    }

    @Override
    public AuthResponse exchangeOAuthCode(String code) {
        log.info("Attempting to exchange OAuth code for authenticated session");

        Long userId = oAuth2LoginCodeService.consumeUserId(code);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        AuthTokens tokens = authTokenManager.issueForUser(user);

        log.info("Successfully exchanged OAuth code for user ID: {}", userId);
        return authResponseFactory.authenticated(tokens.accessToken(), tokens.refreshToken(), tokens.user());
    }

    @Override
    @Transactional
    public void requestPasswordReset(PasswordResetRequest request) {
        log.info("Password reset requested for email: {}", request.getEmail());

        passwordResetWorkflow.requestReset(request);
        log.info("Password reset email sent to: {}", request.getEmail());
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        log.info("Resetting password for email: {}", request.getEmail());

        passwordResetWorkflow.resetPassword(request);
        log.info("Password successfully reset for email: {}, all tokens revoked", request.getEmail());
    }

    @Override
    @Transactional
    public void verifyEmail(VerifyEmailRequest request) {
        log.info("Verifying email for: {}", request.getEmail());

        emailVerificationWorkflow.verify(request);
        log.info("Email successfully verified for: {}", request.getEmail());
    }

    @Override
    @Transactional
    public void resendVerificationCode(String email) {
        log.info("Resending verification code for email: {}", email);

        emailVerificationWorkflow.resend(email);
        log.info("Verification code resent to: {}", email);
    }

    @Override
    public UserDto getCurrentUser(Long userId) {
        log.info("Fetching current user with ID: {}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        return convertToDto(user);
    }

    @Override
    public UserDto convertToDto(User user) {
        return userDtoMapper.toDto(user);
    }

    @Override
    public void logout(String token, User user) {
        log.info("Logging out user with ID: {}", user.getId());

        authTokenManager.revoke(token, user);
    }
}
