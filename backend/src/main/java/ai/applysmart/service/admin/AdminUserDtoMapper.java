package ai.applysmart.service.admin;

import ai.applysmart.dto.admin.UserAdminDto;
import ai.applysmart.entity.User;
import ai.applysmart.repository.CoverLetterRepository;
import ai.applysmart.repository.JobRepository;
import ai.applysmart.repository.ResumeRepository;
import ai.applysmart.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminUserDtoMapper {

    private static final String FREE_PLAN = "FREE";

    private final SubscriptionRepository subscriptionRepository;
    private final ResumeRepository resumeRepository;
    private final CoverLetterRepository coverLetterRepository;
    private final JobRepository jobRepository;

    public UserAdminDto toDto(User user) {
        return UserAdminDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .enabled(user.getEnabled())
                .emailVerified(user.getEmailVerified())
                .twoFactorEnabled(user.getTwoFactorEnabled())
                .authProvider(user.getAuthProvider().name())
                .plan(resolvePlan(user))
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .resumeCount(resumeRepository.countByUser(user))
                .coverLetterCount(coverLetterRepository.countByUser(user))
                .jobCount(jobRepository.countByUser(user))
                .build();
    }

    private String resolvePlan(User user) {
        return subscriptionRepository.findByUser(user)
                .map(subscription -> subscription.getPlan().name())
                .orElse(FREE_PLAN);
    }
}
