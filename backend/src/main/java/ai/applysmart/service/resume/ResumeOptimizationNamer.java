package ai.applysmart.service.resume;

import ai.applysmart.entity.User;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ResumeOptimizationNamer {

    private final ResumeOptimizationJobDescriptionParser jobDescriptionParser;

    public ResumeOptimizationNamer(ResumeOptimizationJobDescriptionParser jobDescriptionParser) {
        this.jobDescriptionParser = jobDescriptionParser;
    }

    public String buildOptimizedResumeName(User user, String jobDescription) {
        String applicantName = user.getFullName().trim();
        return extractCompanyName(jobDescription)
                .map(company -> "%s - %s Optimized Resume".formatted(applicantName, company))
                .orElse("%s - Optimized Resume".formatted(applicantName));
    }

    public String buildOptimizedPdfFilename(User user, String jobDescription) {
        String sanitized = buildOptimizedResumeName(user, jobDescription)
                .trim()
                .toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("-{2,}", "-")
                .replaceAll("(^-|-$)", "");

        return (sanitized.isBlank() ? "optimized-resume" : sanitized) + ".pdf";
    }

    Optional<String> extractCompanyName(String jobDescription) {
        return jobDescriptionParser.extractCompanyName(jobDescription);
    }
}
