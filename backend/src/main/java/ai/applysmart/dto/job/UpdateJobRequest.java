package ai.applysmart.dto.job;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateJobRequest {
    private String company;
    private String role;
    private String link;
    private String status; // SAVED, APPLIED, INTERVIEW, OFFER, REJECTED
    private String notes;
    private String salary;
    private String location;
    private LocalDateTime applicationDeadline;
}
