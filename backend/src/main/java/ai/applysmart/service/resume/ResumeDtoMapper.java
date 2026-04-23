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
                .status(resume.getStatus().name().toLowerCase())
                .wordCount(resume.getWordCount())
                .atsScore(resume.getAtsScore())
                .lastModified(resume.getUpdatedAt())
                .createdAt(resume.getCreatedAt())
                .build();
    }
}
