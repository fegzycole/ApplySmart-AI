package ai.applysmart.service.dashboard;

import ai.applysmart.dto.dashboard.DashboardDocumentStatsDto;
import ai.applysmart.entity.CoverLetter;
import ai.applysmart.entity.Job;
import ai.applysmart.entity.Resume;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DashboardDocumentStatsCalculator {

    public DashboardDocumentStatsDto calculate(List<Resume> resumes, List<CoverLetter> coverLetters, List<Job> jobs) {
        long totalResumes = resumes.size();
        long optimizedResumes = resumes.stream()
                .filter(resume -> resume.getStatus() == Resume.Status.OPTIMIZED)
                .count();
        long builtResumes = resumes.stream()
                .filter(this::isBuiltResume)
                .count();
        long originalResumes = totalResumes - optimizedResumes - builtResumes;

        return DashboardDocumentStatsDto.builder()
                .totalResumes(totalResumes)
                .originalResumes(originalResumes)
                .optimizedResumes(optimizedResumes)
                .builtResumes(builtResumes)
                .coverLetters((long) coverLetters.size())
                .build();
    }

    private boolean isBuiltResume(Resume resume) {
        return resume.getStatus() == Resume.Status.PUBLISHED
                || (resume.getStatus() == Resume.Status.DRAFT
                && resume.getContent() == null
                && resume.getFileUrl() != null);
    }
}
