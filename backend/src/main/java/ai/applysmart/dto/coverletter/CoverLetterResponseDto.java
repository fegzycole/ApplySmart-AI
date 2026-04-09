package ai.applysmart.dto.coverletter;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CoverLetterResponseDto {
    private Long id;
    private String company;
    private String position;
    private String content;
    private String tone;
    private Integer wordCount;
    private Long linkedResumeId;
    private String pdfUrl;
    private LocalDateTime createdAt;
    private LocalDateTime lastModified;
}
