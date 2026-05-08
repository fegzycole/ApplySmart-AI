package ai.applysmart.dto.coverletter;

import jakarta.validation.constraints.NotBlank;
import ai.applysmart.validation.ValidJobDescription;
import lombok.Data;

@Data
public class CoverLetterRequest {
    @NotBlank(message = "Company is required")
    private String company;

    @NotBlank(message = "Position is required")
    private String position;

    @NotBlank(message = "Job description is required")
    @ValidJobDescription
    private String jobDescription;

    private String tone;

    private String highlights;

    private Long resumeId;
}
