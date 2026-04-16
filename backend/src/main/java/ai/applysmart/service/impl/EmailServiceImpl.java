package ai.applysmart.service.impl;

import ai.applysmart.exception.EmailSendingException;
import ai.applysmart.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.from:support@applysmart-ai.org}")
    private String fromEmail;

    @Override
    public void sendVerificationEmail(String to, String name, String code) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("name", name);
        variables.put("code", code);

        sendTemplatedEmail(to, "Verify Your Email - ApplySmart AI", "email-verification", variables);
    }

    @Override
    public void sendPasswordResetEmail(String to, String name, String code) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("name", name);
        variables.put("code", code);

        sendTemplatedEmail(to, "Reset Your Password - ApplySmart AI", "password-reset", variables);
    }

    private void sendTemplatedEmail(String to, String subject, String templateName, Map<String, Object> variables) {
        try {
            Context context = new Context();
            context.setVariables(variables);

            String htmlContent = templateEngine.process(templateName, context);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            ClassPathResource logo = new ClassPathResource("static/logo.svg");
            if (logo.exists()) {
                helper.addInline("logo", logo, "image/svg+xml");
            }

            mailSender.send(message);
            log.info("Email sent successfully to: {}", to);

        } catch (MessagingException e) {
            log.error("Failed to send email to: {}", to, e);
            throw new EmailSendingException("Failed to send email", e);
        }
    }
}
