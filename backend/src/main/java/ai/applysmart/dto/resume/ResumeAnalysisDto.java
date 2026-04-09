package ai.applysmart.dto.resume;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ResumeAnalysisDto {
    private Integer score;
    private List<String> strengths;
    private List<String> improvements;
    private List<String> keywords;
    private Integer atsCompatibility;
}
