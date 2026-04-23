package ai.applysmart.controller;

import ai.applysmart.dto.settings.ProfileDto;
import ai.applysmart.dto.settings.UpdateProfileRequest;
import ai.applysmart.entity.User;
import ai.applysmart.service.settings.SettingsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/settings")
@RequiredArgsConstructor
@Tag(name = "Settings", description = "User settings and account management endpoints")
public class SettingsProfileController {

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
}
