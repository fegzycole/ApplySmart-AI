package ai.applysmart.dto.resume;

import ai.applysmart.dto.coverletter.CoverLetterResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ResumeOptimizationDto {
    private Integer originalScore;
    private Integer optimizedScore;
    private List<String> changes;
    private String content;
    private String fileUrl;
    private ResumeAnalysisDto analysis;
    private CoverLetterResponseDto coverLetter;
}
