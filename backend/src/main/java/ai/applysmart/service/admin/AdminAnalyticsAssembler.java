package ai.applysmart.service.admin;

import ai.applysmart.dto.admin.AnalyticsDto;
import ai.applysmart.entity.Subscription;
import ai.applysmart.repository.CoverLetterRepository;
import ai.applysmart.repository.JobRepository;
import ai.applysmart.repository.ResumeRepository;
import ai.applysmart.repository.SubscriptionRepository;
import ai.applysmart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AdminAnalyticsAssembler {

    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final ResumeRepository resumeRepository;
    private final CoverLetterRepository coverLetterRepository;
    private final JobRepository jobRepository;
    private final UserGrowthMetrics userGrowthMetrics;

    public AnalyticsDto build() {
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByEnabledTrue();
        long totalResumes = resumeRepository.count();
        long totalCoverLetters = coverLetterRepository.count();
        long totalJobs = jobRepository.count();

        return AnalyticsDto.builder()
                .overviewStats(overview(totalUsers, activeUsers, totalResumes, totalCoverLetters, totalJobs))
                .userGrowthData(userGrowthMetrics.forLastTwelveMonths())
                .subscriptionData(subscriptionData())
                .aiUsageData(aiUsageData(totalCoverLetters))
                .revenueData(emptyRevenueData())
                .build();
    }

    private AnalyticsDto.OverviewStats overview(
            long totalUsers,
            long activeUsers,
            long totalResumes,
            long totalCoverLetters,
            long totalJobs
    ) {
        return AnalyticsDto.OverviewStats.builder()
                .totalUsers(totalUsers)
                .activeUsers(activeUsers)
                .totalRevenue(0L)
                .totalResumes(totalResumes)
                .totalCoverLetters(totalCoverLetters)
                .totalJobs(totalJobs)
                .build();
    }

    private AnalyticsDto.SubscriptionData subscriptionData() {
        long freeUsers = subscriptionRepository.countByPlan(Subscription.Plan.FREE);
        long starterUsers = subscriptionRepository.countByPlan(Subscription.Plan.STARTER);
        long proUsers = subscriptionRepository.countByPlan(Subscription.Plan.PRO);
        long careerBoostUsers = subscriptionRepository.countByPlan(Subscription.Plan.CAREER_BOOST);

        return AnalyticsDto.SubscriptionData.builder()
                .freeUsers(freeUsers)
                .proUsers(proUsers + starterUsers + careerBoostUsers)
                .enterpriseUsers(0L)
                .build();
    }

    private AnalyticsDto.AIUsageData aiUsageData(long totalCoverLetters) {
        return AnalyticsDto.AIUsageData.builder()
                .resumeAnalyses(0L)
                .resumeOptimizations(0L)
                .coverLettersGenerated(totalCoverLetters)
                .build();
    }

    private AnalyticsDto.RevenueData emptyRevenueData() {
        return AnalyticsDto.RevenueData.builder()
                .labels(List.of())
                .data(List.of())
                .build();
    }
}
