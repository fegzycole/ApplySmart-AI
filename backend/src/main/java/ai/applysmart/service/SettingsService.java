package ai.applysmart.service;

import ai.applysmart.dto.settings.*;
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
    NotificationPreferenceDto updateNotificationPreference(String settingId, Boolean enabled, User user);
    void deleteAccount(User user);
}
