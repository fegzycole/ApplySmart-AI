package ai.applysmart.service.impl;

import ai.applysmart.config.FeatureFlags;
import ai.applysmart.dto.admin.AnalyticsDto;
import ai.applysmart.dto.admin.UserAdminDto;
import ai.applysmart.entity.User;
import ai.applysmart.repository.*;
import ai.applysmart.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final ResumeRepository resumeRepository;
    private final CoverLetterRepository coverLetterRepository;
    private final JobRepository jobRepository;

    @Override
    @Transactional(readOnly = true)
    public List<UserAdminDto> getAllUsers() {
        log.info("Fetching all users for admin");
        return userRepository.findAll().stream()
                .map(this::convertToAdminDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserAdminDto> getAllUsers(Pageable pageable) {
        log.info("Fetching paginated users for admin - page: {}, size: {}",
                 pageable.getPageNumber(), pageable.getPageSize());
        return userRepository.findAll(pageable)
                .map(this::convertToAdminDto);
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyticsDto getAnalytics() {
        log.info("Generating admin analytics");

        // Overview Stats
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByEnabledTrue();
        long totalResumes = resumeRepository.count();
        long totalCoverLetters = coverLetterRepository.count();
        long totalJobs = jobRepository.count();

        AnalyticsDto.OverviewStats overviewStats = AnalyticsDto.OverviewStats.builder()
                .totalUsers(totalUsers)
                .activeUsers(activeUsers)
                .totalRevenue(0L) // Placeholder - integrate with Stripe later
                .totalResumes(totalResumes)
                .totalCoverLetters(totalCoverLetters)
                .totalJobs(totalJobs)
                .build();

        // User Growth Data (last 12 months)
        AnalyticsDto.UserGrowthData userGrowthData = generateUserGrowthData();

        // Subscription Data - hide when feature is disabled
        AnalyticsDto.SubscriptionData subscriptionData;
        if (FeatureFlags.ADMIN_SUBSCRIPTION_ANALYTICS) {
            long freeUsers = subscriptionRepository.countByPlan(ai.applysmart.entity.Subscription.Plan.FREE);
            long starterUsers = subscriptionRepository.countByPlan(ai.applysmart.entity.Subscription.Plan.STARTER);
            long proUsers = subscriptionRepository.countByPlan(ai.applysmart.entity.Subscription.Plan.PRO);
            long careerBoostUsers = subscriptionRepository.countByPlan(ai.applysmart.entity.Subscription.Plan.CAREER_BOOST);

            subscriptionData = AnalyticsDto.SubscriptionData.builder()
                    .freeUsers(freeUsers)
                    .proUsers(proUsers + starterUsers + careerBoostUsers) // Combine paid plans
                    .enterpriseUsers(0L) // No enterprise plan yet
                    .build();
        } else {
            // Return empty subscription data when feature is disabled
            subscriptionData = AnalyticsDto.SubscriptionData.builder()
                    .freeUsers(0L)
                    .proUsers(0L)
                    .enterpriseUsers(0L)
                    .build();
        }

        // AI Usage Data (placeholder - would need usage tracking table)
        AnalyticsDto.AIUsageData aiUsageData = AnalyticsDto.AIUsageData.builder()
                .resumeAnalyses(0L)
                .resumeOptimizations(0L)
                .coverLettersGenerated(totalCoverLetters)
                .build();

        // Revenue Data (placeholder - integrate with Stripe)
        AnalyticsDto.RevenueData revenueData = AnalyticsDto.RevenueData.builder()
                .labels(List.of("Jan", "Feb", "Mar", "Apr", "May", "Jun"))
                .data(List.of(0L, 0L, 0L, 0L, 0L, 0L))
                .build();

        return AnalyticsDto.builder()
                .overviewStats(overviewStats)
                .userGrowthData(userGrowthData)
                .subscriptionData(subscriptionData)
                .aiUsageData(aiUsageData)
                .revenueData(revenueData)
                .build();
    }

    private AnalyticsDto.UserGrowthData generateUserGrowthData() {
        // Get user counts by month for the last 12 months
        LocalDateTime twelveMonthsAgo = LocalDateTime.now().minusMonths(12);
        List<String> labels = new ArrayList<>();
        List<Long> data = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM");

        for (int i = 11; i >= 0; i--) {
            LocalDateTime monthStart = LocalDateTime.now().minusMonths(i).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime monthEnd = monthStart.plusMonths(1);

            labels.add(monthStart.format(formatter));
            long count = userRepository.countByCreatedAtBetween(monthStart, monthEnd);
            data.add(count);
        }

        return AnalyticsDto.UserGrowthData.builder()
                .labels(labels)
                .data(data)
                .build();
    }

    private UserAdminDto convertToAdminDto(User user) {
        // Get counts for this user
        long resumeCount = resumeRepository.countByUser(user);
        long coverLetterCount = coverLetterRepository.countByUser(user);
        long jobCount = jobRepository.countByUser(user);

        // Get user's subscription plan - hide when feature is disabled
        String plan;
        if (FeatureFlags.ADMIN_SUBSCRIPTION_ANALYTICS) {
            plan = subscriptionRepository.findByUser(user)
                    .map(subscription -> subscription.getPlan().name())
                    .orElse("FREE");
        } else {
            plan = "N/A";
        }

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
                .plan(plan)
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .resumeCount(resumeCount)
                .coverLetterCount(coverLetterCount)
                .jobCount(jobCount)
                .build();
    }
}
