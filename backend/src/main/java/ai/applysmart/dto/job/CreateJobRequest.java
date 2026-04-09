package ai.applysmart.dto.job;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateJobRequest {
    @NotBlank(message = "Company is required")
    private String company;

    @NotBlank(message = "Role is required")
    private String role;

    private String link;
    private String status; // SAVED, APPLIED, INTERVIEW, OFFER, REJECTED
    private String notes;
    private String salary;
    private String location;
    private LocalDateTime applicationDeadline;
}
