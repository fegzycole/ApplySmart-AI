package ai.applysmart.controller;

import ai.applysmart.dto.common.ApiResponse;
import ai.applysmart.entity.User;
import ai.applysmart.exception.UnsupportedFeatureException;
import ai.applysmart.service.settings.SettingsService;
import ai.applysmart.util.ControllerUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/settings")
@RequiredArgsConstructor
@Tag(name = "Settings", description = "User settings and account management endpoints")
public class SettingsAccountController {

    private final SettingsService settingsService;

    @DeleteMapping("/account/delete")
    @Operation(summary = "Delete user account")
    public ResponseEntity<ApiResponse<Void>> deleteAccount(@AuthenticationPrincipal User user) {
        log.info("Delete account request from user: {}", user.getId());
        settingsService.deleteAccount(user);
        return ResponseEntity.ok(ControllerUtils.successResponse("Account deleted successfully"));
    }

    @PostMapping("/account/export")
    @Operation(summary = "Export user data")
    public ResponseEntity<ApiResponse<Void>> exportData(@AuthenticationPrincipal User user) {
        log.info("Export data request from user: {}", user.getId());
        throw new UnsupportedFeatureException("Data export is not implemented yet");
    }
}
