package ai.applysmart.service.settings;

import ai.applysmart.dto.settings.BillingDto;
import ai.applysmart.dto.settings.ProfileDto;
import ai.applysmart.dto.settings.SecuritySettingsDto;
import ai.applysmart.entity.Subscription;
import ai.applysmart.entity.User;
import ai.applysmart.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SettingsDtoMapper {

    private final SubscriptionRepository subscriptionRepository;

    public ProfileDto toProfileDto(User user) {
        return ProfileDto.builder()
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .imageUrl(user.getImageUrl())
                .emailVerified(user.getEmailVerified())
                .authProvider(user.getAuthProvider().name())
                .build();
    }

    public BillingDto toBillingDto(User user) {
        Subscription subscription = subscriptionRepository.findByUser(user).orElse(null);

        return BillingDto.builder()
                .plan(subscription != null ? subscription.getPlan().name() : Subscription.Plan.FREE.name())
                .status(subscription != null ? subscription.getStatus().name() : Subscription.SubscriptionStatus.ACTIVE.name())
                .expiresAt(subscription != null ? subscription.getExpiresAt() : null)
                .hasPaymentMethod(subscription != null && subscription.getStripeCustomerId() != null)
                .paymentMethodLast4(null)
                .build();
    }

    public SecuritySettingsDto toSecuritySettingsDto(User user) {
        return SecuritySettingsDto.builder()
                .twoFactorEnabled(user.getTwoFactorEnabled())
                .hasPassword(user.getPassword() != null && !user.getPassword().isEmpty())
                .activeSessions(null)
                .build();
    }
}
