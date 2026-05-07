package ai.applysmart.service.settings;

import ai.applysmart.dto.settings.ChangePasswordRequest;
import ai.applysmart.dto.settings.EnableTwoFactorRequest;
import ai.applysmart.dto.settings.TwoFactorSetupDto;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.service.auth.AuthenticatorAppService;
import ai.applysmart.service.token.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AccountSecurityManager {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final AuthenticatorAppService authenticatorAppService;

    public void changePassword(ChangePasswordRequest request, User user) {
        if (hasPassword(user)) {
            validateCurrentPassword(request.getCurrentPassword(), user.getPassword());
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        tokenService.revokeAllUserTokens(user.getId());
    }

    public TwoFactorSetupDto setupTwoFactor(User user) {
        if (!hasPassword(user)) {
            throw new BadRequestException("Two-factor authentication currently supports password accounts only");
        }

        if (Boolean.TRUE.equals(user.getTwoFactorEnabled())) {
            throw new BadRequestException("Two-factor authentication is already enabled");
        }

        String secret = authenticatorAppService.generateSecret();
        user.setTwoFactorSecret(secret);
        user.setTwoFactorEnabled(false);
        userRepository.save(user);

        return TwoFactorSetupDto.builder()
                .secret(secret)
                .otpAuthUri(authenticatorAppService.buildOtpAuthUri(user, secret))
                .issuer(authenticatorAppService.getIssuer())
                .accountName(user.getEmail())
                .build();
    }

    public void enableTwoFactor(EnableTwoFactorRequest request, User user) {
        if (!hasPassword(user)) {
            throw new BadRequestException("Two-factor authentication currently supports password accounts only");
        }

        if (user.getTwoFactorSecret() == null || user.getTwoFactorSecret().isBlank()) {
            throw new BadRequestException("Start authenticator app setup before enabling two-factor authentication");
        }

        if (!authenticatorAppService.verifyCode(user.getTwoFactorSecret(), request.getCode())) {
            throw new BadRequestException("Invalid authenticator code");
        }

        user.setTwoFactorEnabled(true);
        userRepository.save(user);
    }

    public void disableTwoFactor(User user) {
        user.setTwoFactorEnabled(false);
        user.setTwoFactorSecret(null);
        userRepository.save(user);
    }

    private void validateCurrentPassword(String currentPassword, String storedPassword) {
        if (currentPassword == null || currentPassword.isBlank()) {
            throw new BadRequestException("Current password is required");
        }

        if (!passwordEncoder.matches(currentPassword, storedPassword)) {
            throw new BadRequestException("Current password is incorrect");
        }
    }

    private boolean hasPassword(User user) {
        return user.getPassword() != null && !user.getPassword().isBlank();
    }
}
