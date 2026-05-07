package ai.applysmart.dto.resume;

import lombok.Data;

@Data
public class OptimizeCoverLetterRequest {
    private boolean enabled;
    private String tone;
    private String highlights;
}
