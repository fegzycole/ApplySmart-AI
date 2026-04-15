package ai.applysmart.service.impl;

import ai.applysmart.dto.dashboard.*;
import ai.applysmart.entity.Job;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
import ai.applysmart.repository.CoverLetterRepository;
import ai.applysmart.repository.JobRepository;
import ai.applysmart.repository.ResumeRepository;
import ai.applysmart.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final JobRepository jobRepository;
    private final ResumeRepository resumeRepository;
    private final CoverLetterRepository coverLetterRepository;

    @Override
    public DashboardDataDto getDashboardData(User user) {
        log.info("Fetching dashboard data for user: {}", user.getId());

        return DashboardDataDto.builder()
                .stats(getStats(user))
                .recentApplications(getRecentApplications(user))
                .funnel(getFunnelData(user))
                .metrics(getMetrics(user))
                .build();
    }

    @Override
    public List<StatCardDto> getStats(User user) {
        log.info("Calculating stats for user: {}", user.getId());

        List<Job> allJobs = jobRepository.findByUserOrderByUpdatedAtDesc(user);
        List<Resume> allResumes = resumeRepository.findByUserOrderByUpdatedAtDesc(user);

        long totalApplications = allJobs.size();
        long activeApplications = allJobs.stream()
                .filter(job -> job.getStatus() == Job.Status.APPLIED || job.getStatus() == Job.Status.INTERVIEW)
                .count();
        long interviews = allJobs.stream()
                .filter(job -> job.getStatus() == Job.Status.INTERVIEW)
                .count();
        long offers = allJobs.stream()
                .filter(job -> job.getStatus() == Job.Status.OFFER)
                .count();

        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minus(30, ChronoUnit.DAYS);
        long recentApplications = allJobs.stream()
                .filter(job -> job.getCreatedAt().isAfter(thirtyDaysAgo))
                .count();

        List<StatCardDto> stats = new ArrayList<>();

        stats.add(StatCardDto.builder()
                .title("Total Applications")
                .value(String.valueOf(totalApplications))
                .change(recentApplications > 0 ? "+" + recentApplications + " this month" : "No change")
                .trend(recentApplications > 0 ? "up" : "neutral")
                .icon("briefcase")
                .build());

        stats.add(StatCardDto.builder()
                .title("Active Applications")
                .value(String.valueOf(activeApplications))
                .change(String.format("%.0f%% of total", totalApplications > 0 ? (activeApplications * 100.0 / totalApplications) : 0))
                .trend("neutral")
                .icon("clock")
                .build());

        stats.add(StatCardDto.builder()
                .title("Interviews")
                .value(String.valueOf(interviews))
                .change(String.format("%.0f%% interview rate", totalApplications > 0 ? (interviews * 100.0 / totalApplications) : 0))
                .trend(interviews > 0 ? "up" : "neutral")
                .icon("users")
                .build());

        stats.add(StatCardDto.builder()
                .title("Offers")
                .value(String.valueOf(offers))
                .change(String.format("%.0f%% offer rate", totalApplications > 0 ? (offers * 100.0 / totalApplications) : 0))
                .trend(offers > 0 ? "up" : "neutral")
                .icon("check-circle")
                .build());

        return stats;
    }

    @Override
    public List<RecentApplicationDto> getRecentApplications(User user) {
        log.info("Fetching recent applications for user: {}", user.getId());

        return jobRepository.findByUserOrderByUpdatedAtDesc(user).stream()
                .limit(5)
                .map(job -> RecentApplicationDto.builder()
                        .id(job.getId())
                        .company(job.getCompany())
                        .role(job.getRole())
                        .status(job.getStatus().name())
                        .appliedAt(job.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<FunnelStageDto> getFunnelData(User user) {
        log.info("Calculating funnel data for user: {}", user.getId());

        List<Job> allJobs = jobRepository.findByUserOrderByUpdatedAtDesc(user);
        int totalJobs = allJobs.size();

        if (totalJobs == 0) {
            return List.of(
                    createFunnelStage("Saved", 0, 0.0),
                    createFunnelStage("Applied", 0, 0.0),
                    createFunnelStage("Interview", 0, 0.0),
                    createFunnelStage("Offer", 0, 0.0)
            );
        }

        Map<Job.Status, Long> statusCounts = allJobs.stream()
                .collect(Collectors.groupingBy(Job::getStatus, Collectors.counting()));

        List<FunnelStageDto> funnel = new ArrayList<>();
        funnel.add(createFunnelStage("Saved",
                statusCounts.getOrDefault(Job.Status.SAVED, 0L).intValue(),
                statusCounts.getOrDefault(Job.Status.SAVED, 0L) * 100.0 / totalJobs));
        funnel.add(createFunnelStage("Applied",
                statusCounts.getOrDefault(Job.Status.APPLIED, 0L).intValue(),
                statusCounts.getOrDefault(Job.Status.APPLIED, 0L) * 100.0 / totalJobs));
        funnel.add(createFunnelStage("Interview",
                statusCounts.getOrDefault(Job.Status.INTERVIEW, 0L).intValue(),
                statusCounts.getOrDefault(Job.Status.INTERVIEW, 0L) * 100.0 / totalJobs));
        funnel.add(createFunnelStage("Offer",
                statusCounts.getOrDefault(Job.Status.OFFER, 0L).intValue(),
                statusCounts.getOrDefault(Job.Status.OFFER, 0L) * 100.0 / totalJobs));

        return funnel;
    }

    @Override
    public List<ConversionMetricDto> getMetrics(User user) {
        log.info("Calculating conversion metrics for user: {}", user.getId());

        List<Job> allJobs = jobRepository.findByUserOrderByUpdatedAtDesc(user);
        int totalJobs = allJobs.size();

        if (totalJobs == 0) {
            return List.of(
                    createMetric("Application to Interview", 0.0, "percentage"),
                    createMetric("Interview to Offer", 0.0, "percentage"),
                    createMetric("Overall Success Rate", 0.0, "percentage")
            );
        }

        long applied = allJobs.stream()
                .filter(job -> job.getStatus() != Job.Status.SAVED)
                .count();
        long interviews = allJobs.stream()
                .filter(job -> job.getStatus() == Job.Status.INTERVIEW || job.getStatus() == Job.Status.OFFER)
                .count();
        long offers = allJobs.stream()
                .filter(job -> job.getStatus() == Job.Status.OFFER)
                .count();

        double appToInterview = applied > 0 ? (interviews * 100.0 / applied) : 0.0;
        double interviewToOffer = interviews > 0 ? (offers * 100.0 / interviews) : 0.0;
        double overallSuccess = applied > 0 ? (offers * 100.0 / applied) : 0.0;

        return List.of(
                createMetric("Application to Interview", appToInterview, "percentage"),
                createMetric("Interview to Offer", interviewToOffer, "percentage"),
                createMetric("Overall Success Rate", overallSuccess, "percentage")
        );
    }

    private FunnelStageDto createFunnelStage(String stage, Integer count, Double percentage) {
        return FunnelStageDto.builder()
                .stage(stage)
                .count(count)
                .percentage(percentage)
                .build();
    }

    private ConversionMetricDto createMetric(String metric, Double value, String unit) {
        return ConversionMetricDto.builder()
                .metric(metric)
                .value(value)
                .unit(unit)
                .build();
    }
}
