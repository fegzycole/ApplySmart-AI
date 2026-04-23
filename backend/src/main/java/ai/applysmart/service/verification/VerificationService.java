package ai.applysmart.service.verification;

import ai.applysmart.entity.VerificationCode;

public interface VerificationService {
    String generateAndSaveCode(String email, VerificationCode.CodeType type);
    boolean verifyCode(String email, String code, VerificationCode.CodeType type);
    void cleanupExpiredCodes();
}
