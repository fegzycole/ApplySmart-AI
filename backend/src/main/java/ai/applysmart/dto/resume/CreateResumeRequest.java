package ai.applysmart.dto.resume;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateResumeRequest {

    @NotBlank(message = "Resume name is required")
    @Size(max = 255, message = "Name must not exceed 255 characters")
    private String name;

    private String content;
}
