package ai.applysmart.service.resume;

import ai.applysmart.dto.resume.ResumeDto;
import ai.applysmart.entity.Resume;
import org.springframework.stereotype.Component;

@Component
public class ResumeDtoMapper {

    public ResumeDto toDto(Resume resume) {
        return ResumeDto.builder()
                .id(resume.getId())
                .name(resume.getName())
                .content(resume.getContent())
                .fileUrl(resume.getFileUrl())
                .score(resume.getScore())
                .documentKind(toDocumentKind(resume))
                .wordCount(resume.getWordCount())
                .atsScore(resume.getAtsScore())
                .lastModified(resume.getUpdatedAt())
                .createdAt(resume.getCreatedAt())
                .build();
    }

    private String toDocumentKind(Resume resume) {
        if (resume.getStatus() == Resume.Status.OPTIMIZED) {
            return "optimized";
        }

        if (resume.getStatus() == Resume.Status.PUBLISHED
                || (resume.getStatus() == Resume.Status.DRAFT
                && resume.getContent() == null
                && resume.getFileUrl() != null)) {
            return "built";
        }

        return "original";
    }
}
