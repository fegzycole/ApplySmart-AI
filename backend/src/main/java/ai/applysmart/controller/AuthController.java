package ai.applysmart.controller;

import ai.applysmart.dto.auth.*;
import ai.applysmart.dto.common.ApiResponse;
import ai.applysmart.entity.User;
import ai.applysmart.service.auth.AuthService;
import ai.applysmart.util.ControllerUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication and authorization endpoints")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    @Operation(summary = "Register a new user")
    public ResponseEntity<SignupResponse> signup(@Valid @RequestBody SignupRequest signupRequest) {
        log.info("Signup request received for email: {}", signupRequest.getEmail());
        SignupResponse response = authService.signup(signupRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user with email and password")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        log.info("Login request received for email: {}", loginRequest.getEmail());
        AuthResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh access token using refresh token")
    public ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        log.info("Token refresh request received");
        AuthResponse response = authService.refreshToken(request.getRefreshToken());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/oauth2/exchange")
    @Operation(summary = "Exchange OAuth login code for access and refresh tokens")
    public ResponseEntity<AuthResponse> exchangeOAuthCode(@Valid @RequestBody OAuthCodeExchangeRequest request) {
        log.info("OAuth code exchange request received");
        AuthResponse response = authService.exchangeOAuthCode(request.getCode());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/request-password-reset")
    @Operation(summary = "Request password reset code")
    public ResponseEntity<ApiResponse<Void>> requestPasswordReset(@Valid @RequestBody PasswordResetRequest request) {
        log.info("Password reset request received for email: {}", request.getEmail());
        authService.requestPasswordReset(request);
        return ResponseEntity.ok(ControllerUtils.successResponse("Password reset code sent to your email"));
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Reset password with verification code")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        log.info("Reset password request received for email: {}", request.getEmail());
        authService.resetPassword(request);
        return ResponseEntity.ok(ControllerUtils.successResponse("Password reset successfully"));
    }

    @PostMapping("/verify-email")
    @Operation(summary = "Verify email with verification code")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@Valid @RequestBody VerifyEmailRequest request) {
        log.info("Email verification request received for: {}", request.getEmail());
        authService.verifyEmail(request);
        return ResponseEntity.ok(ControllerUtils.successResponse("Email verified successfully"));
    }

    @PostMapping("/resend-verification")
    @Operation(summary = "Resend email verification code")
    public ResponseEntity<ApiResponse<Void>> resendVerification(@Valid @RequestBody PasswordResetRequest request) {
        log.info("Resend verification request received for: {}", request.getEmail());
        authService.resendVerificationCode(request.getEmail());
        return ResponseEntity.ok(ControllerUtils.successResponse("Verification code sent to your email"));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal User user) {
        log.info("Get current user request for user ID: {}", user.getId());
        UserDto userDto = authService.getCurrentUser(user.getId());
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout user and revoke current token")
    public ResponseEntity<ApiResponse<Void>> logout(
            @RequestHeader("Authorization") String authHeader,
            @AuthenticationPrincipal User user) {
        log.info("Logout request received for user ID: {}", user.getId());

        String token = ControllerUtils.extractBearerToken(authHeader);
        authService.logout(token, user);

        return ResponseEntity.ok(ControllerUtils.successResponse("Logged out successfully"));
    }
}
