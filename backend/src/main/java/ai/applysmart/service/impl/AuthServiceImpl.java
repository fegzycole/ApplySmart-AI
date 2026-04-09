package ai.applysmart.service.impl;

import ai.applysmart.dto.auth.*;
import ai.applysmart.entity.User;
import ai.applysmart.entity.VerificationCode;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.exception.UnauthorizedException;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.service.AuthService;
import ai.applysmart.service.EmailService;
import ai.applysmart.service.VerificationService;
import ai.applysmart.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final VerificationService verificationService;

    @Override
    @Transactional
    public AuthResponse signup(SignupRequest signupRequest) {
        log.info("Attempting to register new user with email: {}", signupRequest.getEmail());

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new BadRequestException("Email address already in use");
        }

        User user = User.builder()
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .firstName(signupRequest.getFirstName())
                .lastName(signupRequest.getLastName())
                .role(User.Role.USER)
                .enabled(true)
                .emailVerified(false)
                .twoFactorEnabled(false)
                .authProvider(User.AuthProvider.LOCAL)
                .build();

        user = userRepository.save(user);
        log.info("Successfully registered user with ID: {}", user.getId());

        // Send verification email for LOCAL users
        String code = verificationService.generateAndSaveCode(user.getEmail(), VerificationCode.CodeType.EMAIL_VERIFICATION);
        emailService.sendVerificationEmail(user.getEmail(), user.getFullName(), code);

        String accessToken = tokenProvider.generateTokenFromUser(user);
        String refreshToken = tokenProvider.generateRefreshToken(user);

        return AuthResponse.builder()
                .token(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .user(convertToDto(user))
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        log.info("Attempting to authenticate user: {}", loginRequest.getEmail());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();
        log.info("Successfully authenticated user with ID: {}", user.getId());

        String accessToken = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(user);

        return AuthResponse.builder()
                .token(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .user(convertToDto(user))
                .build();
    }

    @Override
    public AuthResponse refreshToken(String refreshToken) {
        log.info("Attempting to refresh access token");

        if (!tokenProvider.validateToken(refreshToken)) {
            throw new UnauthorizedException("Invalid or expired refresh token");
        }

        Long userId = tokenProvider.getUserIdFromToken(refreshToken);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        String newAccessToken = tokenProvider.generateTokenFromUser(user);
        String newRefreshToken = tokenProvider.generateRefreshToken(user);

        log.info("Successfully refreshed tokens for user ID: {}", userId);

        return AuthResponse.builder()
                .token(newAccessToken)
                .refreshToken(newRefreshToken)
                .tokenType("Bearer")
                .user(convertToDto(user))
                .build();
    }

    @Override
    @Transactional
    public void requestPasswordReset(PasswordResetRequest request) {
        log.info("Password reset requested for email: {}", request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        String code = verificationService.generateAndSaveCode(user.getEmail(), VerificationCode.CodeType.PASSWORD_RESET);
        emailService.sendPasswordResetEmail(user.getEmail(), user.getFullName(), code);

        log.info("Password reset email sent to: {}", request.getEmail());
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        log.info("Resetting password for email: {}", request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!verificationService.verifyCode(request.getEmail(), request.getCode(), VerificationCode.CodeType.PASSWORD_RESET)) {
            throw new BadRequestException("Invalid or expired reset code");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        log.info("Password successfully reset for email: {}", request.getEmail());
    }

    @Override
    @Transactional
    public void verifyEmail(VerifyEmailRequest request) {
        log.info("Verifying email for: {}", request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getEmailVerified()) {
            throw new BadRequestException("Email already verified");
        }

        if (!verificationService.verifyCode(request.getEmail(), request.getCode(), VerificationCode.CodeType.EMAIL_VERIFICATION)) {
            throw new BadRequestException("Invalid or expired verification code");
        }

        user.setEmailVerified(true);
        userRepository.save(user);

        log.info("Email successfully verified for: {}", request.getEmail());
    }

    @Override
    @Transactional
    public void resendVerificationCode(String email) {
        log.info("Resending verification code for email: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getEmailVerified()) {
            throw new BadRequestException("Email already verified");
        }

        if (user.getAuthProvider() != User.AuthProvider.LOCAL) {
            throw new BadRequestException("OAuth users don't need email verification");
        }

        String code = verificationService.generateAndSaveCode(email, VerificationCode.CodeType.EMAIL_VERIFICATION);
        emailService.sendVerificationEmail(email, user.getFullName(), code);

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
        UserDto.SubscriptionDto subscriptionDto = null;
        if (user.getSubscription() != null) {
            subscriptionDto = UserDto.SubscriptionDto.builder()
                    .plan(user.getSubscription().getPlan().name())
                    .status(user.getSubscription().getStatus().name())
                    .expiresAt(user.getSubscription().getExpiresAt())
                    .build();
        }

        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .emailVerified(user.getEmailVerified())
                .twoFactorEnabled(user.getTwoFactorEnabled())
                .createdAt(user.getCreatedAt())
                .subscription(subscriptionDto)
                .build();
    }
}
