package ai.applysmart.service.email;

public interface EmailService {
    void sendVerificationEmail(String to, String name, String code);
    void sendPasswordResetEmail(String to, String name, String code);
}
