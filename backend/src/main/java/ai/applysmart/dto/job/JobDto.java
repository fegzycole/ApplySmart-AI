package ai.applysmart.dto.job;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class JobDto {
    private Long id;
    private String company;
    private String role;
    private String link;
    private String status;
    private String notes;
    private String salary;
    private String location;
    private LocalDateTime applicationDeadline;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
