package ai.applysmart.service.coverletter;

import ai.applysmart.dto.coverletter.CoverLetterResponseDto;
import ai.applysmart.entity.CoverLetter;
import org.springframework.stereotype.Component;

@Component
public class CoverLetterDtoMapper {

    public CoverLetterResponseDto toResponseDto(CoverLetter coverLetter, String pdfUrl) {
        return CoverLetterResponseDto.builder()
                .id(coverLetter.getId())
                .company(coverLetter.getCompany())
                .position(coverLetter.getPosition())
                .content(coverLetter.getContent())
                .tone(coverLetter.getTone())
                .wordCount(coverLetter.getWordCount())
                .linkedResumeId(coverLetter.getLinkedResumeId())
                .pdfUrl(pdfUrl)
                .createdAt(coverLetter.getCreatedAt())
                .lastModified(coverLetter.getUpdatedAt())
                .build();
    }

    public ai.applysmart.dto.resume.CoverLetterDto toGeneratedDto(String content) {
        return ai.applysmart.dto.resume.CoverLetterDto.builder()
                .content(content)
                .pdfUrl(null)
                .build();
    }
}
