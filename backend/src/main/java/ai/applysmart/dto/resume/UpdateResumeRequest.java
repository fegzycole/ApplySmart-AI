package ai.applysmart.dto.resume;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateResumeRequest {

    @Size(max = 255, message = "Name must not exceed 255 characters")
    private String name;

    private String content;

    private String status;
}
