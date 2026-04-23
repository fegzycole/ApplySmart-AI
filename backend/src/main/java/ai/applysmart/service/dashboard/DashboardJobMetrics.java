package ai.applysmart.service.dashboard;

import ai.applysmart.entity.Job;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

public final class DashboardJobMetrics {

    private DashboardJobMetrics() {
    }

    public static long countActiveApplications(List<Job> jobs) {
        return jobs.stream()
                .filter(job -> job.getStatus() == Job.Status.APPLIED || job.getStatus() == Job.Status.INTERVIEW)
                .count();
    }

    public static long countInterviews(List<Job> jobs) {
        return jobs.stream()
                .filter(job -> job.getStatus() == Job.Status.INTERVIEW)
                .count();
    }

    public static long countOffers(List<Job> jobs) {
        return jobs.stream()
                .filter(job -> job.getStatus() == Job.Status.OFFER)
                .count();
    }

    public static long countRecentApplications(List<Job> jobs, int daysAgo) {
        LocalDateTime cutoffDate = LocalDateTime.now().minus(daysAgo, ChronoUnit.DAYS);
        return jobs.stream()
                .filter(job -> job.getCreatedAt().isAfter(cutoffDate))
                .count();
    }

    public static long countAppliedJobs(List<Job> jobs) {
        return jobs.stream()
                .filter(job -> job.getStatus() != Job.Status.SAVED)
                .count();
    }

    public static long countInterviewsAndOffers(List<Job> jobs) {
        return jobs.stream()
                .filter(job -> job.getStatus() == Job.Status.INTERVIEW || job.getStatus() == Job.Status.OFFER)
                .count();
    }

    public static List<Job> filterByCreatedAt(List<Job> jobs, LocalDateTime start, LocalDateTime end) {
        return jobs.stream()
                .filter(job -> !job.getCreatedAt().isBefore(start) && !job.getCreatedAt().isAfter(end))
                .toList();
    }

    public static long countCreatedBeforeEnd(List<Job> jobs, LocalDateTime start, LocalDateTime end) {
        return jobs.stream()
                .filter(job -> !job.getCreatedAt().isBefore(start) && job.getCreatedAt().isBefore(end))
                .count();
    }
}
