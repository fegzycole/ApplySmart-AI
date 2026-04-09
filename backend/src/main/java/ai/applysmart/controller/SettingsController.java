package ai.applysmart.controller;

import ai.applysmart.dto.common.ApiResponse;
import ai.applysmart.dto.settings.*;
import ai.applysmart.entity.User;
import ai.applysmart.service.SettingsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/settings")
@RequiredArgsConstructor
@Tag(name = "Settings", description = "User settings and account management endpoints")
public class SettingsController {

    private final SettingsService settingsService;

    @GetMapping("/profile")
    @Operation(summary = "Get user profile")
    public ResponseEntity<ProfileDto> getProfile(@AuthenticationPrincipal User user) {
        log.info("Get profile request from user: {}", user.getId());
        ProfileDto profile = settingsService.getProfile(user);
        return ResponseEntity.ok(profile);
    }

    @PatchMapping("/profile")
    @Operation(summary = "Update user profile")
    public ResponseEntity<ProfileDto> updateProfile(
            @Valid @RequestBody UpdateProfileRequest request,
            @AuthenticationPrincipal User user) {
        log.info("Update profile request from user: {}", user.getId());
        ProfileDto profile = settingsService.updateProfile(request, user);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/billing/plan")
    @Operation(summary = "Get billing plan information")
    public ResponseEntity<BillingDto> getBillingInfo(@AuthenticationPrincipal User user) {
        log.info("Get billing info request from user: {}", user.getId());
        BillingDto billing = settingsService.getBillingInfo(user);
        return ResponseEntity.ok(billing);
    }

    @GetMapping("/billing/payment-method")
    @Operation(summary = "Get payment method (placeholder)")
    public ResponseEntity<ApiResponse<Void>> getPaymentMethod(@AuthenticationPrincipal User user) {
        log.info("Get payment method request from user: {}", user.getId());
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Payment method endpoint - to be implemented with Stripe")
                        .build()
        );
    }

    @PatchMapping("/billing/payment-method")
    @Operation(summary = "Update payment method (placeholder)")
    public ResponseEntity<ApiResponse<Void>> updatePaymentMethod(@AuthenticationPrincipal User user) {
        log.info("Update payment method request from user: {}", user.getId());
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Payment method update - to be implemented with Stripe")
                        .build()
        );
    }

    @GetMapping("/billing/invoices")
    @Operation(summary = "Get invoice history (placeholder)")
    public ResponseEntity<List<Object>> getInvoices(@AuthenticationPrincipal User user) {
        log.info("Get invoices request from user: {}", user.getId());
        return ResponseEntity.ok(List.of());
    }

    @PostMapping("/billing/subscription/cancel")
    @Operation(summary = "Cancel subscription (placeholder)")
    public ResponseEntity<ApiResponse<Void>> cancelSubscription(@AuthenticationPrincipal User user) {
        log.info("Cancel subscription request from user: {}", user.getId());
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Subscription cancellation - to be implemented with Stripe")
                        .build()
        );
    }

    @GetMapping("/security")
    @Operation(summary = "Get security settings")
    public ResponseEntity<SecuritySettingsDto> getSecuritySettings(@AuthenticationPrincipal User user) {
        log.info("Get security settings request from user: {}", user.getId());
        SecuritySettingsDto settings = settingsService.getSecuritySettings(user);
        return ResponseEntity.ok(settings);
    }

    @GetMapping("/security/sessions")
    @Operation(summary = "Get active sessions")
    public ResponseEntity<List<SessionDto>> getActiveSessions(@AuthenticationPrincipal User user) {
        log.info("Get active sessions request from user: {}", user.getId());
        List<SessionDto> sessions = settingsService.getActiveSessions(user);
        return ResponseEntity.ok(sessions);
    }

    @DeleteMapping("/security/sessions/{deviceName}")
    @Operation(summary = "Revoke session (placeholder)")
    public ResponseEntity<ApiResponse<Void>> revokeSession(
            @PathVariable String deviceName,
            @AuthenticationPrincipal User user) {
        log.info("Revoke session request from user: {}", user.getId());
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Session revocation - to be implemented with session tracking")
                        .build()
        );
    }

    @PostMapping("/security/password")
    @Operation(summary = "Change password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @Valid @RequestBody ChangePasswordRequest request,
            @AuthenticationPrincipal User user) {
        log.info("Change password request from user: {}", user.getId());
        settingsService.changePassword(request, user);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Password changed successfully")
                        .build()
        );
    }

    @PostMapping("/security/2fa/enable")
    @Operation(summary = "Enable two-factor authentication")
    public ResponseEntity<ApiResponse<Void>> enableTwoFactor(@AuthenticationPrincipal User user) {
        log.info("Enable 2FA request from user: {}", user.getId());
        settingsService.enableTwoFactor(user);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Two-factor authentication enabled")
                        .build()
        );
    }

    @PostMapping("/security/2fa/disable")
    @Operation(summary = "Disable two-factor authentication")
    public ResponseEntity<ApiResponse<Void>> disableTwoFactor(@AuthenticationPrincipal User user) {
        log.info("Disable 2FA request from user: {}", user.getId());
        settingsService.disableTwoFactor(user);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Two-factor authentication disabled")
                        .build()
        );
    }

    @GetMapping("/notifications")
    @Operation(summary = "Get notification preferences")
    public ResponseEntity<List<NotificationPreferenceDto>> getNotificationPreferences(@AuthenticationPrincipal User user) {
        log.info("Get notification preferences request from user: {}", user.getId());
        List<NotificationPreferenceDto> preferences = settingsService.getNotificationPreferences(user);
        return ResponseEntity.ok(preferences);
    }

    @PatchMapping("/notifications/{settingId}")
    @Operation(summary = "Update notification preference")
    public ResponseEntity<NotificationPreferenceDto> updateNotificationPreference(
            @PathVariable String settingId,
            @RequestParam Boolean enabled,
            @AuthenticationPrincipal User user) {
        log.info("Update notification preference {} request from user: {}", settingId, user.getId());
        NotificationPreferenceDto preference = settingsService.updateNotificationPreference(settingId, enabled, user);
        return ResponseEntity.ok(preference);
    }

    @DeleteMapping("/account/delete")
    @Operation(summary = "Delete user account")
    public ResponseEntity<ApiResponse<Void>> deleteAccount(@AuthenticationPrincipal User user) {
        log.info("Delete account request from user: {}", user.getId());
        settingsService.deleteAccount(user);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Account deleted successfully")
                        .build()
        );
    }

    @PostMapping("/account/export")
    @Operation(summary = "Export user data (placeholder)")
    public ResponseEntity<ApiResponse<Void>> exportData(@AuthenticationPrincipal User user) {
        log.info("Export data request from user: {}", user.getId());
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Data export - to be implemented")
                        .build()
        );
    }
}
