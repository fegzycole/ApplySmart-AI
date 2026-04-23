package ai.applysmart.controller;

import ai.applysmart.dto.settings.NotificationPreferenceDto;
import ai.applysmart.entity.User;
import ai.applysmart.exception.UnsupportedFeatureException;
import ai.applysmart.service.settings.SettingsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/settings")
@RequiredArgsConstructor
@Tag(name = "Settings", description = "User settings and account management endpoints")
public class SettingsNotificationController {

    private final SettingsService settingsService;

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
        throw new UnsupportedFeatureException("Notification preference persistence is not enabled");
    }
}
