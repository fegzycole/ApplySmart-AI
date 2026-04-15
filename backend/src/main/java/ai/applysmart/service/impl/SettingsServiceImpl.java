package ai.applysmart.service.impl;

import ai.applysmart.dto.settings.*;
import ai.applysmart.entity.Subscription;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.repository.SubscriptionRepository;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.service.SettingsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SettingsServiceImpl implements SettingsService {

    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ProfileDto getProfile(User user) {
        log.info("Fetching profile for user: {}", user.getId());

        return ProfileDto.builder()
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .imageUrl(user.getImageUrl())
                .emailVerified(user.getEmailVerified())
                .authProvider(user.getAuthProvider().name())
                .build();
    }

    @Override
    @Transactional
    public ProfileDto updateProfile(UpdateProfileRequest request, User user) {
        log.info("Updating profile for user: {}", user.getId());

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        userRepository.save(user);

        return getProfile(user);
    }

    @Override
    public BillingDto getBillingInfo(User user) {
        log.info("Fetching billing info for user: {}", user.getId());

        Subscription subscription = subscriptionRepository.findByUser(user)
                .orElseGet(() -> createDefaultSubscription(user));

        return BillingDto.builder()
                .plan(subscription.getPlan().name())
                .status(subscription.getStatus().name())
                .expiresAt(subscription.getExpiresAt())
                .hasPaymentMethod(subscription.getStripeCustomerId() != null)
                .paymentMethodLast4(null) // TODO: Implement Stripe integration to get last 4 digits
                .build();
    }

    @Override
    public SecuritySettingsDto getSecuritySettings(User user) {
        log.info("Fetching security settings for user: {}", user.getId());

        return SecuritySettingsDto.builder()
                .twoFactorEnabled(user.getTwoFactorEnabled())
                .hasPassword(user.getPassword() != null && !user.getPassword().isEmpty())
                .activeSessions(1) // TODO: Implement session tracking
                .build();
    }

    @Override
    public List<SessionDto> getActiveSessions(User user) {
        log.info("Fetching active sessions for user: {}", user.getId());

        // TODO: Implement proper session tracking with Redis or database
        // For now, return a mock current session
        return List.of(
                SessionDto.builder()
                        .deviceName("Current Device")
                        .browser("Unknown")
                        .location("Unknown")
                        .lastActive(LocalDateTime.now())
                        .current(true)
                        .build()
        );
    }

    @Override
    @Transactional
    public void changePassword(ChangePasswordRequest request, User user) {
        log.info("Changing password for user: {}", user.getId());

        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new BadRequestException("Cannot change password for OAuth users");
        }

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new BadRequestException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        log.info("Password changed successfully for user: {}", user.getId());
    }

    @Override
    @Transactional
    public void enableTwoFactor(User user) {
        log.info("Enabling two-factor authentication for user: {}", user.getId());

        // TODO: Generate TOTP secret and return QR code
        user.setTwoFactorEnabled(true);
        // user.setTwoFactorSecret(generateTOTPSecret());
        userRepository.save(user);

        log.info("Two-factor authentication enabled for user: {}", user.getId());
    }

    @Override
    @Transactional
    public void disableTwoFactor(User user) {
        log.info("Disabling two-factor authentication for user: {}", user.getId());

        user.setTwoFactorEnabled(false);
        user.setTwoFactorSecret(null);
        userRepository.save(user);

        log.info("Two-factor authentication disabled for user: {}", user.getId());
    }

    @Override
    public List<NotificationPreferenceDto> getNotificationPreferences(User user) {
        log.info("Fetching notification preferences for user: {}", user.getId());

        // TODO: Store preferences in database
        // For now, return default preferences
        List<NotificationPreferenceDto> preferences = new ArrayList<>();

        preferences.add(NotificationPreferenceDto.builder()
                .id("email-applications")
                .label("Application Updates")
                .description("Receive email notifications about your job applications")
                .enabled(true)
                .build());

        preferences.add(NotificationPreferenceDto.builder()
                .id("email-interviews")
                .label("Interview Reminders")
                .description("Get reminders before scheduled interviews")
                .enabled(true)
                .build());

        preferences.add(NotificationPreferenceDto.builder()
                .id("email-tips")
                .label("Career Tips")
                .description("Receive tips and advice for your job search")
                .enabled(false)
                .build());

        preferences.add(NotificationPreferenceDto.builder()
                .id("email-marketing")
                .label("Marketing Emails")
                .description("Product updates and promotional offers")
                .enabled(false)
                .build());

        return preferences;
    }

    @Override
    @Transactional
    public NotificationPreferenceDto updateNotificationPreference(String settingId, Boolean enabled, User user) {
        log.info("Updating notification preference {} for user: {}", settingId, user.getId());

        // TODO: Store preferences in database
        // For now, just return the updated preference
        return NotificationPreferenceDto.builder()
                .id(settingId)
                .label("Updated Preference")
                .description("This preference has been updated")
                .enabled(enabled)
                .build();
    }

    @Override
    @Transactional
    public void deleteAccount(User user) {
        log.info("Deleting account for user: {}", user.getId());

        userRepository.delete(user);

        log.info("Account deleted for user: {}", user.getId());
    }

    private Subscription createDefaultSubscription(User user) {
        Subscription subscription = Subscription.builder()
                .user(user)
                .plan(Subscription.Plan.FREE)
                .status(Subscription.SubscriptionStatus.ACTIVE)
                .build();

        return subscriptionRepository.save(subscription);
    }
}
