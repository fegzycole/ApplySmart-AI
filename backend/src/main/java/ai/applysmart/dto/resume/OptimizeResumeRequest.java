package ai.applysmart.dto.resume;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OptimizeResumeRequest {

    @NotBlank(message = "Job description is required")
    private String jobDescription;
}
