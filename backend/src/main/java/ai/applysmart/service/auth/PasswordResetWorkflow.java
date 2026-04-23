package ai.applysmart.service.auth;

import ai.applysmart.dto.auth.PasswordResetRequest;
import ai.applysmart.dto.auth.ResetPasswordRequest;
import ai.applysmart.entity.User;
import ai.applysmart.entity.VerificationCode;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.service.email.EmailService;
import ai.applysmart.service.token.TokenService;
import ai.applysmart.service.verification.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PasswordResetWorkflow {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationService verificationService;
    private final EmailService emailService;
    private final TokenService tokenService;

    public void requestReset(PasswordResetRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        String code = verificationService.generateAndSaveCode(
                user.getEmail(),
                VerificationCode.CodeType.PASSWORD_RESET
        );
        emailService.sendPasswordResetEmail(user.getEmail(), user.getFullName(), code);
    }

    public void resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!verificationService.verifyCode(
                request.getEmail(),
                request.getCode(),
                VerificationCode.CodeType.PASSWORD_RESET
        )) {
            throw new BadRequestException("Invalid or expired reset code");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        tokenService.revokeAllUserTokens(user.getId());
    }
}
