package ai.applysmart.service.settings;

import ai.applysmart.dto.settings.BillingDto;
import ai.applysmart.dto.settings.ChangePasswordRequest;
import ai.applysmart.dto.settings.NotificationPreferenceDto;
import ai.applysmart.dto.settings.ProfileDto;
import ai.applysmart.dto.settings.SecuritySettingsDto;
import ai.applysmart.dto.settings.SessionDto;
import ai.applysmart.dto.settings.UpdateProfileRequest;
import ai.applysmart.entity.User;

import java.util.List;

public interface SettingsService {
    ProfileDto getProfile(User user);
    ProfileDto updateProfile(UpdateProfileRequest request, User user);
    BillingDto getBillingInfo(User user);
    SecuritySettingsDto getSecuritySettings(User user);
    List<SessionDto> getActiveSessions(User user);
    void changePassword(ChangePasswordRequest request, User user);
    void enableTwoFactor(User user);
    void disableTwoFactor(User user);
    List<NotificationPreferenceDto> getNotificationPreferences(User user);
    void deleteAccount(User user);
}
