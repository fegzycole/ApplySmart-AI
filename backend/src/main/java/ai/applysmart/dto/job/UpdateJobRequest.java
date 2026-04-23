package ai.applysmart.dto.job;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateJobRequest {
    private String company;
    private String role;

    @Pattern(regexp = "^(https?://)?([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})(:[0-9]{1,5})?(/.*)?$",
             message = "Invalid URL format")
    private String link;

    private String status;
    private String notes;
    private String salary;
    private String location;
    private LocalDateTime applicationDeadline;
}
