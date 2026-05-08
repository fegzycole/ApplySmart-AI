package ai.applysmart.service.dashboard;

import ai.applysmart.entity.Job;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Locale;

public final class DashboardJobMetrics {

    private DashboardJobMetrics() {
    }

    public static long countActiveApplications(List<Job> jobs) {
        return jobs.stream()
                .filter(job -> job.getStatus() == Job.Status.APPLIED || job.getStatus() == Job.Status.INTERVIEW)
                .count();
    }

    public static long countInFlightApplications(List<Job> jobs) {
        return jobs.stream()
                .filter(DashboardJobMetrics::isInFlightStatus)
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

    public static long countByStatus(List<Job> jobs, Job.Status status) {
        return jobs.stream()
                .filter(job -> job.getStatus() == status)
                .count();
    }

    public static long countInterviewsAndOffers(List<Job> jobs) {
        return jobs.stream()
                .filter(job -> job.getStatus() == Job.Status.INTERVIEW || job.getStatus() == Job.Status.OFFER)
                .count();
    }

    public static long countRespondedApplications(List<Job> jobs) {
        return jobs.stream()
                .filter(job -> job.getStatus() == Job.Status.INTERVIEW
                        || job.getStatus() == Job.Status.OFFER
                        || job.getStatus() == Job.Status.REJECTED)
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

    public static long countStaleActiveApplications(List<Job> jobs, int staleAfterDays) {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(staleAfterDays);
        return jobs.stream()
                .filter(job -> job.getUpdatedAt() != null)
                .filter(DashboardJobMetrics::isInFlightStatus)
                .filter(job -> job.getUpdatedAt().isBefore(cutoffDate))
                .count();
    }

    public static long countUpcomingDeadlines(List<Job> jobs, int daysAhead) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime cutoffDate = now.plusDays(daysAhead);

        return jobs.stream()
                .filter(job -> job.getApplicationDeadline() != null)
                .filter(job -> !job.getApplicationDeadline().isBefore(now))
                .filter(job -> !job.getApplicationDeadline().isAfter(cutoffDate))
                .count();
    }

    public static long countUniqueCompanies(List<Job> jobs) {
        return jobs.stream()
                .map(Job::getCompany)
                .filter(company -> company != null && !company.isBlank())
                .map(company -> company.trim().toLowerCase(Locale.ROOT))
                .distinct()
                .count();
    }

    public static boolean isInFlightStatus(Job job) {
        return job.getStatus() == Job.Status.APPLIED
                || job.getStatus() == Job.Status.INTERVIEW
                || job.getStatus() == Job.Status.OFFER;
    }
}
