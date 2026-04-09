package ai.applysmart.dto.resume;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ResumeDto {
    private Long id;
    private String name;
    private String content;
    private String fileUrl;
    private Integer score;
    private String status;
    private Integer wordCount;
    private Integer atsScore;
    private LocalDateTime lastModified;
    private LocalDateTime createdAt;
}
