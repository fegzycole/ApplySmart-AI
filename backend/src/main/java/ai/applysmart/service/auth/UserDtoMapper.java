package ai.applysmart.service.auth;

import ai.applysmart.dto.auth.UserDto;
import ai.applysmart.entity.Subscription;
import ai.applysmart.entity.User;
import ai.applysmart.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserDtoMapper {

    private final SubscriptionRepository subscriptionRepository;

    public UserDto toDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .emailVerified(user.getEmailVerified())
                .twoFactorEnabled(user.getTwoFactorEnabled())
                .createdAt(user.getCreatedAt())
                .subscription(subscriptionRepository.findByUser(user)
                        .map(this::toSubscriptionDto)
                        .orElse(null))
                .build();
    }

    private UserDto.SubscriptionDto toSubscriptionDto(Subscription subscription) {
        return UserDto.SubscriptionDto.builder()
                .plan(subscription.getPlan().name())
                .status(subscription.getStatus().name())
                .expiresAt(subscription.getExpiresAt())
                .build();
    }
}
