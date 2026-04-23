package ai.applysmart.service.auth;

import ai.applysmart.dto.auth.VerifyEmailRequest;
import ai.applysmart.entity.User;
import ai.applysmart.entity.VerificationCode;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.service.email.EmailService;
import ai.applysmart.service.verification.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailVerificationWorkflow {

    private final UserRepository userRepository;
    private final VerificationService verificationService;
    private final EmailService emailService;

    public void sendVerificationCode(User user) {
        String code = verificationService.generateAndSaveCode(
                user.getEmail(),
                VerificationCode.CodeType.EMAIL_VERIFICATION
        );
        emailService.sendVerificationEmail(user.getEmail(), user.getFullName(), code);
    }

    public void verify(VerifyEmailRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getEmailVerified()) {
            throw new BadRequestException("Email already verified");
        }

        if (!verificationService.verifyCode(
                request.getEmail(),
                request.getCode(),
                VerificationCode.CodeType.EMAIL_VERIFICATION
        )) {
            throw new BadRequestException("Invalid or expired verification code");
        }

        user.setEmailVerified(true);
        userRepository.save(user);
    }

    public void resend(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getEmailVerified()) {
            throw new BadRequestException("Email already verified");
        }

        if (user.getAuthProvider() != User.AuthProvider.LOCAL) {
            throw new BadRequestException("OAuth users don't need email verification");
        }

        sendVerificationCode(user);
    }
}
