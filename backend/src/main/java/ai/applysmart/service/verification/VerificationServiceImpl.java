package ai.applysmart.service.verification;

import ai.applysmart.entity.VerificationCode;
import ai.applysmart.repository.VerificationCodeRepository;
import ai.applysmart.service.verification.VerificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class VerificationServiceImpl implements VerificationService {

    private final VerificationCodeRepository verificationCodeRepository;
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final int CODE_LENGTH = 6;
    private static final int EXPIRATION_MINUTES = 15;

    @Override
    @Transactional
    public String generateAndSaveCode(String email, VerificationCode.CodeType type) {
        verificationCodeRepository.deleteByEmailAndType(email, type);

        String code = String.format("%06d", RANDOM.nextInt(1000000));

        VerificationCode verificationCode = VerificationCode.builder()
                .email(email)
                .code(code)
                .type(type)
                .expiresAt(LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES))
                .used(false)
                .build();

        verificationCodeRepository.save(verificationCode);
        log.info("Generated {} code for email: {}", type, email);

        return code;
    }

    @Override
    @Transactional
    public boolean verifyCode(String email, String code, VerificationCode.CodeType type) {
        VerificationCode verificationCode = verificationCodeRepository
                .findByEmailAndCodeAndType(email, code, type)
                .orElse(null);

        if (verificationCode == null || !verificationCode.isValid()) {
            log.warn("Invalid or expired code for email: {}", email);
            return false;
        }

        verificationCode.setUsed(true);
        verificationCode.setUsedAt(LocalDateTime.now());
        verificationCodeRepository.save(verificationCode);

        log.info("Successfully verified {} code for email: {}", type, email);
        return true;
    }

    @Override
    @Transactional
    @Scheduled(cron = "0 0 * * * *")
    public void cleanupExpiredCodes() {
        verificationCodeRepository.deleteExpiredCodes(LocalDateTime.now());
        log.debug("Cleaned up expired verification codes");
    }
}
