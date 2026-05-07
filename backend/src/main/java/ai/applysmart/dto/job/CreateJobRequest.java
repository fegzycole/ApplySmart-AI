package ai.applysmart.dto.job;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class CreateJobRequest {
    @NotBlank(message = "Company is required")
    private String company;

    @NotBlank(message = "Role is required")
    private String role;

    @NotBlank(message = "Job posting URL is required")
    @Pattern(regexp = "^(https?://)?([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})(:[0-9]{1,5})?(/.*)?$",
             message = "Invalid URL format")
    private String link;

    private String status;
    private String notes;
    private String salary;
    private String location;
    private String applicationDeadline;
}
