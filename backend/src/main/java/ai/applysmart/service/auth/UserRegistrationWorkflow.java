package ai.applysmart.service.auth;

import ai.applysmart.dto.auth.SignupRequest;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserRegistrationWorkflow {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailVerificationWorkflow emailVerificationWorkflow;

    public User register(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email address already in use");
        }

        User user = userRepository.save(User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(User.Role.USER)
                .enabled(true)
                .emailVerified(false)
                .twoFactorEnabled(false)
                .authProvider(User.AuthProvider.LOCAL)
                .build());

        emailVerificationWorkflow.sendVerificationCode(user);
        return user;
    }
}
