package ai.applysmart.dto.resume;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.Valid;
import ai.applysmart.validation.ValidJobDescription;
import lombok.Data;

@Data
public class OptimizeResumeRequest {

    @NotBlank(message = "Job description is required")
    @ValidJobDescription
    private String jobDescription;

    private ResumeTemplate template;

    @Valid
    private OptimizeCoverLetterRequest coverLetter;
}
