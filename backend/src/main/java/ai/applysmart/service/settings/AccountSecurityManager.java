package ai.applysmart.service.settings;

import ai.applysmart.dto.settings.ChangePasswordRequest;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AccountSecurityManager {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void changePassword(ChangePasswordRequest request, User user) {
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new BadRequestException("Cannot change password for OAuth users");
        }

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new BadRequestException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public void enableTwoFactor(User user) {
        user.setTwoFactorEnabled(true);
        userRepository.save(user);
    }

    public void disableTwoFactor(User user) {
        user.setTwoFactorEnabled(false);
        user.setTwoFactorSecret(null);
        userRepository.save(user);
    }
}
