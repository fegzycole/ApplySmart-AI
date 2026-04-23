package ai.applysmart.service.settings;

import ai.applysmart.dto.settings.BillingDto;
import ai.applysmart.dto.settings.ChangePasswordRequest;
import ai.applysmart.dto.settings.NotificationPreferenceDto;
import ai.applysmart.dto.settings.ProfileDto;
import ai.applysmart.dto.settings.SecuritySettingsDto;
import ai.applysmart.dto.settings.SessionDto;
import ai.applysmart.dto.settings.UpdateProfileRequest;
import ai.applysmart.entity.User;
import ai.applysmart.exception.UnsupportedFeatureException;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.service.settings.SettingsService;
import ai.applysmart.service.settings.AccountSecurityManager;
import ai.applysmart.service.settings.NotificationPreferenceProvider;
import ai.applysmart.service.settings.SettingsDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SettingsServiceImpl implements SettingsService {

    private final UserRepository userRepository;
    private final SettingsDtoMapper settingsDtoMapper;
    private final AccountSecurityManager accountSecurityManager;
    private final NotificationPreferenceProvider notificationPreferenceProvider;

    @Override
    public ProfileDto getProfile(User user) {
        log.info("Fetching profile for user: {}", user.getId());

        return settingsDtoMapper.toProfileDto(user);
    }

    @Override
    @Transactional
    public ProfileDto updateProfile(UpdateProfileRequest request, User user) {
        log.info("Updating profile for user: {}", user.getId());

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        userRepository.save(user);

        return settingsDtoMapper.toProfileDto(user);
    }

    @Override
    public BillingDto getBillingInfo(User user) {
        log.info("Fetching billing info for user: {}", user.getId());

        return settingsDtoMapper.toBillingDto(user);
    }

    @Override
    public SecuritySettingsDto getSecuritySettings(User user) {
        log.info("Fetching security settings for user: {}", user.getId());

        return settingsDtoMapper.toSecuritySettingsDto(user);
    }

    @Override
    public List<SessionDto> getActiveSessions(User user) {
        log.info("Fetching active sessions for user: {}", user.getId());

        throw new UnsupportedFeatureException("Session tracking requires persisted session records");
    }

    @Override
    @Transactional
    public void changePassword(ChangePasswordRequest request, User user) {
        log.info("Changing password for user: {}", user.getId());

        accountSecurityManager.changePassword(request, user);
        log.info("Password changed successfully for user: {}", user.getId());
    }

    @Override
    @Transactional
    public void enableTwoFactor(User user) {
        log.info("Enabling two-factor authentication for user: {}", user.getId());

        accountSecurityManager.enableTwoFactor(user);
        log.info("Two-factor authentication enabled for user: {}", user.getId());
    }

    @Override
    @Transactional
    public void disableTwoFactor(User user) {
        log.info("Disabling two-factor authentication for user: {}", user.getId());

        accountSecurityManager.disableTwoFactor(user);
        log.info("Two-factor authentication disabled for user: {}", user.getId());
    }

    @Override
    public List<NotificationPreferenceDto> getNotificationPreferences(User user) {
        log.info("Fetching notification preferences for user: {}", user.getId());

        return notificationPreferenceProvider.getDefaults();
    }

    @Override
    @Transactional
    public void deleteAccount(User user) {
        log.info("Deleting account for user: {}", user.getId());

        userRepository.delete(user);

        log.info("Account deleted for user: {}", user.getId());
    }
}
