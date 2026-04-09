package ai.applysmart.controller;

import ai.applysmart.dto.auth.*;
import ai.applysmart.dto.common.ApiResponse;
import ai.applysmart.entity.User;
import ai.applysmart.service.AuthService;
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
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest signupRequest) {
        log.info("Signup request received for email: {}", signupRequest.getEmail());
        AuthResponse response = authService.signup(signupRequest);
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

    @PostMapping("/request-password-reset")
    @Operation(summary = "Request password reset code")
    public ResponseEntity<ApiResponse<Void>> requestPasswordReset(@Valid @RequestBody PasswordResetRequest request) {
        log.info("Password reset request received for email: {}", request.getEmail());
        authService.requestPasswordReset(request);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Password reset code sent to your email")
                        .build()
        );
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Reset password with verification code")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        log.info("Reset password request received for email: {}", request.getEmail());
        authService.resetPassword(request);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Password reset successfully")
                        .build()
        );
    }

    @PostMapping("/verify-email")
    @Operation(summary = "Verify email with verification code")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@Valid @RequestBody VerifyEmailRequest request) {
        log.info("Email verification request received for: {}", request.getEmail());
        authService.verifyEmail(request);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Email verified successfully")
                        .build()
        );
    }

    @PostMapping("/resend-verification")
    @Operation(summary = "Resend email verification code")
    public ResponseEntity<ApiResponse<Void>> resendVerification(@Valid @RequestBody PasswordResetRequest request) {
        log.info("Resend verification request received for: {}", request.getEmail());
        authService.resendVerificationCode(request.getEmail());
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Verification code sent to your email")
                        .build()
        );
    }

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal User user) {
        log.info("Get current user request for user ID: {}", user.getId());
        UserDto userDto = authService.getCurrentUser(user.getId());
        return ResponseEntity.ok(userDto);
    }
}
