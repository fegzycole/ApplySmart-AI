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
import org.springframework.web.multipart.MultipartFile;

public interface SettingsService {
    ProfileDto getProfile(User user);
    ProfileDto updateProfile(UpdateProfileRequest request, User user);
    ProfileDto updateProfileImage(MultipartFile file, User user);
    BillingDto getBillingInfo(User user);
    SecuritySettingsDto getSecuritySettings(User user);
    void changePassword(ChangePasswordRequest request, User user);
    TwoFactorSetupDto setupTwoFactor(User user);
    void enableTwoFactor(EnableTwoFactorRequest request, User user);
    void disableTwoFactor(User user);
    void deleteAccount(DeleteAccountRequest request, User user);
}
