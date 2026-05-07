package ai.applysmart.service.settings;

import ai.applysmart.dto.settings.BillingDto;
import ai.applysmart.dto.settings.ChangePasswordRequest;
import ai.applysmart.dto.settings.DeleteAccountRequest;
import ai.applysmart.dto.settings.EnableTwoFactorRequest;
import ai.applysmart.dto.settings.ProfileDto;
import ai.applysmart.dto.settings.SecuritySettingsDto;
import ai.applysmart.dto.settings.TwoFactorSetupDto;
import ai.applysmart.dto.settings.UpdateProfileRequest;
import ai.applysmart.entity.User;
import ai.applysmart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SettingsServiceImpl implements SettingsService {

    private final UserRepository userRepository;
    private final SettingsDtoMapper settingsDtoMapper;
    private final ProfileImageManager profileImageManager;
    private final AccountSecurityManager accountSecurityManager;
    private final AccountDeletionManager accountDeletionManager;

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
    @Transactional
    public ProfileDto updateProfileImage(MultipartFile file, User user) {
        log.info("Updating profile image for user: {}", user.getId());

        User updatedUser = profileImageManager.updateProfileImage(file, user);
        return settingsDtoMapper.toProfileDto(updatedUser);
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
    @Transactional
    public void changePassword(ChangePasswordRequest request, User user) {
        log.info("Changing password for user: {}", user.getId());

        accountSecurityManager.changePassword(request, user);
        log.info("Password changed successfully for user: {}", user.getId());
    }

    @Override
    @Transactional
    public TwoFactorSetupDto setupTwoFactor(User user) {
        log.info("Preparing two-factor authenticator setup for user: {}", user.getId());

        return accountSecurityManager.setupTwoFactor(user);
    }

    @Override
    @Transactional
    public void enableTwoFactor(EnableTwoFactorRequest request, User user) {
        log.info("Enabling two-factor authentication for user: {}", user.getId());

        accountSecurityManager.enableTwoFactor(request, user);
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
    @Transactional
    public void deleteAccount(DeleteAccountRequest request, User user) {
        log.info("Deleting account for user: {}", user.getId());

        accountDeletionManager.deleteAccount(request, user);

        log.info("Account deleted for user: {}", user.getId());
    }
}
