package ai.applysmart.service.dashboard;

import ai.applysmart.dto.dashboard.DashboardDocumentStatsDto;
import ai.applysmart.entity.CoverLetter;
import ai.applysmart.entity.Job;
import ai.applysmart.entity.Resume;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DashboardDocumentStatsCalculatorTest {

    private final DashboardDocumentStatsCalculator calculator = new DashboardDocumentStatsCalculator();

    @Test
    void classifiesResumeTypesAndCoverLetterCoverage() {
        List<Resume> resumes = List.of(
                createResume(Resume.Status.DRAFT, "content", null),
                createResume(Resume.Status.OPTIMIZED, "optimized", "https://cdn.example.com/optimized.pdf"),
                createResume(Resume.Status.PUBLISHED, null, "https://cdn.example.com/built.pdf")
        );
        List<CoverLetter> coverLetters = List.of(
                createCoverLetter("Acme"),
                createCoverLetter("Bravo")
        );
        List<Job> jobs = List.of(
                createJob("Acme", Job.Status.APPLIED),
                createJob("Bravo", Job.Status.INTERVIEW),
                createJob("Coda", Job.Status.OFFER),
                createJob("Delta", Job.Status.SAVED)
        );

        DashboardDocumentStatsDto stats = calculator.calculate(resumes, coverLetters, jobs);

        assertEquals(3L, stats.getTotalResumes());
        assertEquals(1L, stats.getOriginalResumes());
        assertEquals(1L, stats.getOptimizedResumes());
        assertEquals(1L, stats.getBuiltResumes());
        assertEquals(2L, stats.getCoverLetters());
    }

    private Resume createResume(Resume.Status status, String content, String fileUrl) {
        return Resume.builder()
                .name("Resume")
                .status(status)
                .content(content)
                .fileUrl(fileUrl)
                .build();
    }

    private CoverLetter createCoverLetter(String company) {
        return CoverLetter.builder()
                .company(company)
                .position("Engineer")
                .content("Sample")
                .build();
    }

    private Job createJob(String company, Job.Status status) {
        return Job.builder()
                .company(company)
                .role("Engineer")
                .status(status)
                .build();
    }
}
