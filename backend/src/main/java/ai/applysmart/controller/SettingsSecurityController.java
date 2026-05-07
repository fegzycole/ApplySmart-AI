package ai.applysmart.controller;

import ai.applysmart.dto.common.ApiResponse;
import ai.applysmart.dto.settings.ChangePasswordRequest;
import ai.applysmart.dto.settings.EnableTwoFactorRequest;
import ai.applysmart.dto.settings.SecuritySettingsDto;
import ai.applysmart.dto.settings.TwoFactorSetupDto;
import ai.applysmart.entity.User;
import ai.applysmart.service.settings.SettingsService;
import ai.applysmart.util.ControllerUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/settings")
@RequiredArgsConstructor
@Tag(name = "Settings", description = "User settings and account management endpoints")
public class SettingsSecurityController {

    private final SettingsService settingsService;

    @GetMapping("/security")
    @Operation(summary = "Get security settings")
    public ResponseEntity<SecuritySettingsDto> getSecuritySettings(@AuthenticationPrincipal User user) {
        log.info("Get security settings request from user: {}", user.getId());
        SecuritySettingsDto settings = settingsService.getSecuritySettings(user);
        return ResponseEntity.ok(settings);
    }

    @PostMapping("/security/password")
    @Operation(summary = "Change password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @Valid @RequestBody ChangePasswordRequest request,
            @AuthenticationPrincipal User user) {
        log.info("Change password request from user: {}", user.getId());
        settingsService.changePassword(request, user);
        return ResponseEntity.ok(ControllerUtils.successResponse("Password changed successfully"));
    }

    @PostMapping("/security/2fa/setup")
    @Operation(summary = "Prepare authenticator app setup")
    public ResponseEntity<TwoFactorSetupDto> setupTwoFactor(@AuthenticationPrincipal User user) {
        log.info("Prepare 2FA setup request from user: {}", user.getId());
        TwoFactorSetupDto setup = settingsService.setupTwoFactor(user);
        return ResponseEntity.ok(setup);
    }

    @PostMapping("/security/2fa/enable")
    @Operation(summary = "Enable two-factor authentication")
    public ResponseEntity<ApiResponse<Void>> enableTwoFactor(
            @Valid @RequestBody EnableTwoFactorRequest request,
            @AuthenticationPrincipal User user) {
        log.info("Enable 2FA request from user: {}", user.getId());
        settingsService.enableTwoFactor(request, user);
        return ResponseEntity.ok(ControllerUtils.successResponse("Two-factor authentication enabled"));
    }

    @PostMapping("/security/2fa/disable")
    @Operation(summary = "Disable two-factor authentication")
    public ResponseEntity<ApiResponse<Void>> disableTwoFactor(@AuthenticationPrincipal User user) {
        log.info("Disable 2FA request from user: {}", user.getId());
        settingsService.disableTwoFactor(user);
        return ResponseEntity.ok(ControllerUtils.successResponse("Two-factor authentication disabled"));
    }
}
